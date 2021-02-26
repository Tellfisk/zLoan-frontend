import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import { Home, About, Contact } from './pages';
import { Nav, Footer } from './layout';

function App() {
  return (
    <Router>
      <Nav />

      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route exact path='/about'>
          <About />
        </Route>
        <Route exact path='/contact'>
          <Contact />
        </Route>
      </Switch>
      
      <Footer />
    </Router>
  );
}

export default App;
