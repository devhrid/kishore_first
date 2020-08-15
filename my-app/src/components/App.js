import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import User from '../pages/User'
import Dashboard from '../pages/Dashboard'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="container">
       
        <Switch>
            <Route path='/home' exact component={Home} />
            <Route path='/register' component={Register} />
            <Route path='/user' component={User} />
            <Route path='/dashboard' component={Dashboard} />
            <Route path='/' component={Login} />
           
        
        </Switch>
      </div>   
      </BrowserRouter>
    );
  }
}

export default App;
