import React, {Component} from 'react';
import './SearchWorkOrder.css';
import SearchPagination from './SearchPagination';
import Header from "../header/Header";
import LiveSearch from "./LiveSearch";
import {Link} from "react-router-dom";


const liveLocationSearchData = ['Mustard', 'Ketchup', 'Relish'];
const liveStudySearchData = ["Mustard", "Ketchup", "Relish"];
const liveWorkOrderIdSearchData = ["Mustard", "Ketchup", "Relish"];
const liveSavedSearchData = ["Save1", "Save2", "Save3", "Save4"];
const liveStatusSearchData = ["Created", "In Progress", "Completed", "Cancelled"];
class SearchWorkOrder extends Component {

    render() {
        return (
            <div>
               <Header headerTitle="PCR Aliquot Services-Search Work Order"/>
                <div className="container">
                    <form >
                        <div className="row">

                                <LiveSearch liveSearchData={liveLocationSearchData} liveSearchDataTitle="Location"/>

                                <LiveSearch liveSearchData={liveStudySearchData} liveSearchDataTitle="Study"/>

                                <LiveSearch liveSearchData={liveWorkOrderIdSearchData} liveSearchDataTitle="Sponsor"/>

                            <div className="col-xl">
                                <label className="label">Parent Barcode</label>
                                <input type="text"/>
                            </div>

                            <LiveSearch liveSearchData={liveStatusSearchData} liveSearchDataTitle="Status"/>

                            <LiveSearch liveSearchData={liveSavedSearchData} liveSearchDataTitle="SAVE"/>

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
                            <Link className="btn btn-primary" to="/updateWorkOrder">
                                Update
                            </Link>
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