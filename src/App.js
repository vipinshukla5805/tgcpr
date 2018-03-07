import React, { Component } from 'react';
import CreateWorkOrder from './WorkOrder/CreateWorkOrder';
import './App.css';
class App extends Component {
  render() {
    return (
      <div className="App">
        <CreateWorkOrder />
      </div>
    );
  }
}

export default App;
