import React, {Component} from 'react';
import './HomePage.css';
// import {Label} from 'react';

class HomePage extends Component {
  render() {
    return (
      <div>
        <div className="jumbotron">
          <h4 className="w3-bar w3-left">Home - GPCR</h4>
        </div>

        <div className="panel panel-body">
          <div className="col-md-6">

            <button className="btn btn-block list-group-item">
              <label>Create Work Order</label>
            </button>
            <button className="btn btn-block list-group-item">
              <label>Search Work Order</label>
            </button>
            <button className="btn btn-block list-group-item">
              <label>Update Work Order</label>
            </button>
            <button className="btn btn-block list-group-item">
              <label>Process Batch</label>
            </button>
            <button className="btn btn-block list-group-item">
              <label>Process Batch</label>
            </button>

          </div>
        </div>
      </div>

    );
  }
}

export default HomePage;