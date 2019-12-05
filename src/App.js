import React from 'react';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom' //router 

import Header from './components/Header'
import NavBar from './components/NavBar'
import Projects from './components/Projects'
import Home from './components/Home'

function App() {

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <div className="App">
        <Header />
        <NavBar />

          {/* home */}
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
          <Route exact path="/home" children={<Home />} />

          {/* portafolio */}
          <Route path="/portfolio/:project" scr component={Projects} />
          <Route path="/portfolio" component={Projects} />

          {/* blog */}
          <Route path="/blog">
          
          </Route>

          {/* contacto */}
          <Route path="/contact">
            
          </Route>

          {/* vacio */}
          <Route path="/empty">
            
          </Route>
      </div>
    </Router>
  );
}

export default App;
