import React from 'react';

import Nav from './nav';
import Footer from './footer'

const Layout = (props) => (
    <div class='h-screen -mb-32'>
        {props.children}
    </div>
);

export { Layout, Nav, Footer };