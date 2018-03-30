import React, { Component } from 'react';
import CreateWorkOrder from './components/createWorkOrder/CreateWorkOrder';
import './App.css';
import HomePage from './components/homePage/HomePage'
import { Switch, Route } from "react-router-dom";
import SearchWorkOrder from "./components/searchWorkOrder/SearchWorkOrder";
import InputSearchCriteria from "./components/batchCreation/InputSearchCriteria";
import UpdateWorkOrder from "./components/updateWorkOrder/UpdateWorkOrder";
import BatchSearchResults from "./components/batchCreation/batchSearchResults/BatchSearchResults";
class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/createWorkOrder" component={CreateWorkOrder} />
          <Route path="/searchWorkOrder" component={SearchWorkOrder} />
          <Route path="/updateWorkOrder/:workOrderId/:status" component={UpdateWorkOrder} />
            <Route path="/batchCreation" component={InputSearchCriteria} />
            <Route path="/batchSearchResults" component={BatchSearchResults} />
        </Switch>
      </div>
    );
  }
}

export default App;
