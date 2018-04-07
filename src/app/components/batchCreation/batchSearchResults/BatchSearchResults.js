import React, {Component} from 'react';
import './BatchSearchResults.css';
import { connect } from 'react-redux';
import { getBatchResult, getresult , getResultSucess} from "../../../action/batch.action";

class BatchSearchResults extends Component {
    constructor(props) {     super(props);         
        this.props.location && this.props.location.query ? localStorage.setItem('req',this.props.location.query.request) : '';    
        const {result} = this.props;    
        this.state = {
            req : JSON.parse(localStorage.getItem('req')),
            result : result
        }
    }
    getData = (req) => {}

    render() {
        return (
            <div>
                {this.state.result}
                <div className="jumbotron main-container">
                    <h4 className="w3-bar w3-left">Batch Creation - Sample Search Results</h4>
                </div>
                <div className="row batch-search-row">
                    <div className="col-md-7">
                        <div class="panel panel-default panel-header">
                            <div class="panel-body Panel2">Query Run Parameter:
                                <table class="table table-bordered batch-search-table">
                                    <thead>
                                    <tr>
                                        <th scope="col">Search Field</th>
                                        <th scope="col">Value</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <th scope="row">Sponsor</th>
                                        <td colspan="6">Mark</td>

                                    </tr>
                                    <tr>
                                        <th scope="row">Studies</th>
                                        <td colspan="4">Jacob</td>

                                    </tr>
                                    <tr>
                                        <th scope="row">Test</th>
                                        <td colspan="4">Larry the Bird</td>

                                    </tr>
                                    <tr>
                                        <th scope="row">Recieved Date</th>
                                        <td colspan="4">Larry the Bird</td>

                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-5">
                        <div className="panel1">
                            <div className="panel-body Panel2">Assay Batch Size:</div>
                            <div className="col">
                                <button type="button" class="btn btn-primary btn-lg btn-block button-size">Select Maximum Batch Size</button>
                                <button type="button" class="btn btn-primary btn-lg btn-block button-size">Select Custom Batch Size</button>
                            </div>

                            <div className="row justify-content-center">
                                <div className="col-sm-3">
                                    <button type="button" className="btn btn-secondary ">Desellect All</button>
                                </div>
                                <div className="col-sm-3">
                                    <button type="button" className="btn btn-success">Create Batch</button>
                                </div>
                                <div className="col-sm-3">
                                    <button id='export-list' type="button" className="btn btn-primary">Export List</button>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
      result:getBatchResult(state)
    }
  }
   
  const mapDispatchToProps = (dispatch, props, state) => {
    return {
      getData: () => {
        dispatch(getBatchResult(state))
      }
    }
  }

export default connect(mapStateToProps,mapDispatchToProps) (BatchSearchResults);