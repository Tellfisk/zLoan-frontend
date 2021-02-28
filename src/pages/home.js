import React from 'react';

import { Layout } from '../layout';
import axios from 'axios';
import MyButton from '../components/MyButton';
import Chart from 'chart.js';

const url = "https://localhost:44390/loan";
var loanT = "housing";
var paybackS = "series";


const Home = () => (
    <Layout >
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
            <canvas class='object-fill' id="chart" 
            width={window.innerWidth * 0.93} height={window.innerHeight * 0.75}></canvas>
        </div>
    </Layout>
);

// Fetches input from inputfields and buttons
async function getInputs() {
    var loanAmount = +document.getElementById('loanAmountInput').value;
    var paybackPeriod = +document.getElementById('paybackPeriodInput').value;
    var loanType = loanT.toLowerCase();
    var paybackScheme = paybackS.toLowerCase();

    const data = {
        loanAmount: loanAmount,
        paybackPeriod: paybackPeriod,
        loanType: loanType,
        paybackScheme: paybackScheme
    };
    postData(data);
}

function showInputfields() {
    document.getElementById("inputElements").style.display = "block";
    document.getElementById("backDiv").style.display = "none";
}

function drawChart(months) {
    var monthlyPay = [];
    var monthlyInterest = [];
    var labels = [];

    for (var key in months) {
        labels.push(Number(key) + 1);
        monthlyPay.push(months[key][0]);
        monthlyInterest.push(months[key][1]);
    }

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
                yAxes: [

                    {
                        stacked: true,
                    }
                ],
                xAxes: [
                    {
                        stacked: true,
                    }
                ]
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
        console.error('There was an error!', error);
    })
}

export default Home;