import React from 'react';

import { Layout } from '../layout';
import axios from 'axios';
import MyButton from '../components/MyButton';



const url = "https://localhost:44390/loan";
var loanT = "housing";
var paybackS = "f";


const Home = () => (
    <Layout >
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
        
        <br/><br/>
        <MyButton buttonId='Go' whenPressed={ getInputs }/>
    </Layout>
);

// Fetches input from inputfields and buttons
async function getInputs() {
    var loanAmount = +document.getElementById('loanAmountInput').value;
    var paybackPeriod = +document.getElementById('paybackPeriodInput').value;
    var loanType = loanT.toLowerCase();
    var paybackScheme = paybackS.toLowerCase();
    console.log(loanAmount);
    console.log(paybackPeriod);
    console.log(loanType);
    console.log(paybackScheme);
    const data = {
        loanAmount: loanAmount,
        paybackPeriod: paybackPeriod,
        loanType: loanType,
        paybackScheme: paybackScheme
    };
    postData(data);
}

// Sends a POST request to the backend API
function postData(data) {
axios.post(url, data)
.then(response => {
    console.log('Response: ', response);
    return response;
})
.catch(error => {
    console.error('There was an error!', error);
})
}

export default Home;