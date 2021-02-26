import React from 'react';
import axios from 'axios';

import { Layout } from '../layout';

const url = "https://localhost:44390/loan/fis?loanModel=prump";

const Home = () => (
    <Layout >
        <h1 className='text-2xl'>This is the homepage!</h1>
        <p>Enter loan amount</p>
        <input type='text' id='loanAmountInput'></input>
        <p>Enter payback period</p>
        <input type='text' id='paybackPeriodInput'></input>
        <br/>
        <button type='button' onClick={getInputs}>Go</button>
    </Layout>
)

async function getInputs() {
    var loanAmount = 8000; //document.getElementById('loanAmountInput').value;
    var paybackPeriod = 2; //document.getElementById('paybackPeriodInput').value;
    var loanType = "housing";
    var paybackScheme = "series";
    const data = {
        loanAmount: loanAmount,
        paybackPeriod: paybackPeriod,
        loanType: loanType,
        paybackScheme: paybackScheme
    };
    axi(data);
}

function axi(data) {
    axios.post('https://localhost:44390/loan/fis', data)
    .then()
    .catch(error => {
        console.error('There was an error!', error);
    })
}

export default Home;