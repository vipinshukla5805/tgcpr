import React, {Component} from 'react';
import './SearchWorkOrder.css';
import SearchPagination from './SearchPagination';

class SearchWorkOrder extends Component {

    render() {
        return (
            <div>
                <div className="jumbotron">
                    <h4 className="w3-bar w3-left">PCR Aliquot Services-Search Work Order</h4>
                </div>

                <div className="container">
                    <form >
                        <div className="row">
                            <div className="col-xl">
                                <label className="label">Location</label>
                                <select className="selectpicker">
                                    <option>Mustard</option>
                                    <option>Ketchup</option>
                                    <option>Relish</option>
                                </select>
                            </div>
                            <div className="col-xl">
                                <label className="label">Study</label>
                                <select className="selectpicker">
                                    <option>Mustard</option>
                                    <option>Ketchup</option>
                                    <option>Relish</option>
                                </select>
                            </div>
                            <div className="col-xl">
                                <label className="label">Work Order ID</label>
                                <select className="selectpicker">
                                    <option>Mustard</option>
                                    <option>Ketchup</option>
                                    <option>Relish</option>
                                </select>
                            </div>
                            <div className="col-xl">
                                <label className="label">Parent Barcode</label>
                                <input type="text"/>
                            </div>

                            <div className="col-xl">
                                <label className="label">Status</label>
                                <select className="selectpicker">
                                    <option>In Progress</option>
                                    <option>Ketchup</option>
                                    <option>Relish</option>
                                </select>

                            </div>

                        </div>
                    </form>
                </div>
                {/* <hr class="divider" text="react-native"/> */}
                <div className="container">
                    <SearchPagination/>
                </div>

                <div className="container" style={styles.fStyle}>
                    <div className="row justify-content-md-center">
                        <div className="col-sm-2">
                            <button className="btn btn-primary">Update</button>
                        </div>
                        <div className="col-sm-2">
                            <button className="btn btn-primary">Export</button>
                        </div>
                        <div className="col-sm-2">
                            <button className="btn btn-primary">QC Scan</button>
                        </div>
                        <div className="col-sm-2">
                            <button className="btn btn-primary">Create Aliquot</button>
                        </div>
                        <div className="col-sm-2">
                            <button className="btn btn-primary">Create Batch</button>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

const styles = ({
    //Bottom Container style
    fStyle: {
        marginTop: '35px'
    }
});

export default SearchWorkOrder;