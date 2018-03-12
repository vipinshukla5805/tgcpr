import React, {Component} from 'react';
import './HomePage.css';
import { Link } from "react-router-dom";
// import {Label} from 'react';

class HomePage extends Component {
  render() {
    return (
      <div>
        <div className="jumbotron">
          <h4 className="w3-bar w3-left">Home - GPCR</h4>
        </div>

        <div className="panel">
          <div className="col-md-4 main-body">

            <Link className="btn btn-block list-group-item" to="/createWorkOrder">
              Create Work Order
            </Link>
            <Link className="btn btn-block list-group-item" to="/createWorkOrder">
              Search Work Order
            </Link>
            <Link className="btn btn-block list-group-item" to="/createWorkOrder">
              Update Work Order
            </Link>
            <Link className="btn btn-block list-group-item" to="/createWorkOrder">
              Process Batch
            </Link>

          </div>
        </div>
      </div>

    );
  }
}

export default HomePage;
