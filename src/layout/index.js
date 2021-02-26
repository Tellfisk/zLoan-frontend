import React from 'react';

import Nav from './nav';
import Footer from './footer'

const Layout = (props) => (
    <div className='text-center p-80 h-screen -mb-32'>
        {props.children}
    </div>
);

export { Layout, Nav, Footer };