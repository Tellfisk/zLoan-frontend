import React from 'react';

import axios from 'axios';
import MyButton from '../components/MyButton';
import Chart from 'chart.js';

const url = "https://localhost:44390/loan";
var loanT = "housing";
var paybackS = "series";

const MyLoanForm = () => (
    <div>
        <div id='inputElements'>
            <h1 className='text-4xl'>Loan calculator</h1>
            <br/>

            <p className='text-xl'>Enter loan amount</p>
            <input type='number' id='loanAmountInput'></input>
            <br/><br/>

            <p className='text-xl'>Enter payback period</p>
            <input type='number' id='paybackPeriodInput'></input>
            <br/><br/>

            <p className='text-xl'>Loan type</p>
            <MyButton buttonId='Housing' whenPressed={ () => { loanT = "housing"; } }/>
            <br/><br/>

            <p className='text-xl'>Payback scheme</p>
            <MyButton buttonId='Series' whenPressed={ () => { paybackS = "series"; } }/>
            <br/><br/>
            
            <MyButton buttonId='Go' whenPressed={ getInputs } solid={true}/>
        </div>

        <div id='backDiv' style={{display:'none'}}>
            <MyButton buttonId='Back' whenPressed={ showInputfields } solid={true}/>
            <br/><br/>
            <div className='text-3xl h-10 w-80 bg-white rounded-md' id='totalCost'></div>

            <canvas id="chart" width={window.innerWidth * 0.93} height={window.innerHeight * 0.75}></canvas>
        </div>
    </div>
)

// Fetches input from inputfields and buttons
async function getInputs() {
    var loanAmount = +document.getElementById('loanAmountInput').value;
    var paybackPeriod = +document.getElementById('paybackPeriodInput').value;
    var loanType = loanT.toLowerCase();
    var paybackScheme = paybackS.toLowerCase();

    if (!validateInput(loanAmount, paybackPeriod))
        return;

    const data = {
        loanAmount: loanAmount,
        paybackPeriod: paybackPeriod,
        loanType: loanType,
        paybackScheme: paybackScheme
    };
    postData(data);
}

function validateInput(loanAmount, paybackPeriod) {
    if (loanAmount <= 0) {
        alert("Loan amount must be positive");
        return false;
    } else if (paybackPeriod <= 0) {
        alert("Payback period must be positive");
        return false;
    } else {
        return true;
    }
}

// Sends a POST request to the backend API
async function postData(data) {
    axios.post(url, data)
    .then(response => {
        console.log('Response: ', response);
        document.getElementById("inputElements").style.display = "none";
        document.getElementById("backDiv").style.display = "block";
        drawChart(response.data.paybackMonths)
    })
    .catch(error => {
        alert(error);
        console.error('There was an error!', error);
    })
}

function drawChart(months) {
    var monthlyPay = [];
    var monthlyInterest = [];
    var labels = [];
    var totalCost = 0;

    for (var key in months) {
        labels.push(Number(key) + 1);
        monthlyPay.push(months[key][0]);
        monthlyInterest.push(months[key][1]);
        totalCost += months[key][0] + months[key][1];
    }

    document.getElementById('totalCost').innerHTML = 
        "Total cost " + totalCost.toFixed(2).replace(/(?!^)(?=(?:\d{3})+(?:\.|$))/gm, ' '); // <- This ain't me

    if (window.bar !== undefined) 
        window.bar.destroy();

    window.bar = new Chart(document.getElementById("chart"), {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            {
              label: "Monthly pay",
              backgroundColor: 'rgba(120, 110, 255, 0.5)',
              data: monthlyPay,
            },
            {
                label: "Monthly interest",
                backgroundColor: 'rgba(255, 120, 110, 0.5)',
                data: monthlyInterest,
            }
          ]
        },
        options: {
            scales: {
                yAxes: [{stacked: true,}],
                xAxes: [{stacked: true,}]
            },
            legend: { display: true },
            responsive: false,
            title: {
                display: true,
                text: 'Payback Plan'
          }
        }
    });
}

function showInputfields() {
    document.getElementById("inputElements").style.display = "block";
    document.getElementById("backDiv").style.display = "none";
}

export default MyLoanForm;