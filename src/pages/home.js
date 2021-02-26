import React from 'react';

import { Layout } from '../layout';

const Home = () => (
    <Layout >
        <div class='text-center p-64'>
        <h1 className='text-2xl'>This is the homepage!</h1>
        <p>Enter loan amount</p>
        <input type='text'></input>
        <p>Enter payback period</p>
        <input type='text'></input>
        <button onClick='Switch site'></button>
        </div>
    </Layout>
)

export default Home;