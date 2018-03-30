import React, {Component} from 'react';
import './HomePage.css';
import CreateWorkOrderHeader from "../header/Header";
import { Link } from "react-router-dom";
// import {Label} from 'react';

class HomePage extends Component {
  render() {
    return (
      <div>
        <CreateWorkOrderHeader headerTitle="Home - GPCR"/>
        <div className="panel">
          <div className="col-md-4 main-body">

            <Link id='homepage' className="btn btn-block list-group-item" to="/createWorkOrder">
              Create Work Order
            </Link>
            <Link id='homepage' className="btn btn-block list-group-item" to="/searchWorkOrder">
              Search Work Order
            </Link>
            <Link id='homepage' className="btn btn-block list-group-item" to="/batchCreation">
              Batch Creation
            </Link>
              <Link id='homepage'className="btn btn-block list-group-item" to="/batchSearchResults">
                  Batch Search Results
              </Link>

          </div>
        </div>
      </div>

    );
  }
}

export default HomePage;
