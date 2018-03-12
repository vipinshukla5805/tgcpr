import React, { Component } from 'react';
import CreateWorkOrder from './Components/CreateWorkOrder/CreateWorkOrder';
import './App.css';
import HomePage from './HomePage/HomePage'
import { Switch, Route } from "react-router-dom";
class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/createWorkOrder" component={CreateWorkOrder} />
        </Switch>
      </div>
    );
  }
}

export default App;
