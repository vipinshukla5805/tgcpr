import React, {Component} from 'react';
import './InputSearchCriteria.css';
import LiveSearch from '../searchWorkOrder/LiveSearch';
import Header from "../header/Header";
 import DateTimePicker from 'react-datetime-picker';
 import axios from 'axios';
 import SponsorList from './SponsorList';
import StudyList from "./StudyList";
import TestList from "./TestList";
import FreezerLocationList from "./FreezerLocationList";
import VialLocationList from "./VialLocationList"

const liveLocationSearchData = ["Mustard", "Ketchup", "Relish"];
// const liveSavedSearchData = ["Save1", "Save2", "Save3", "Save4"];
const liveStatusSearchData = ["Created", "In Progress", "Completed", "Cancelled"];
const liveSponsorSearchData = ['a'];
const liveStudySearchData = ['b'];



class InputSearchCriteria extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            sponsorId : '',
            studyId : '',
            testId : '',
            vialId : '',
            freezerLocationId : ''
        };
        this.notifyParent = this.notifyParent.bind(this);
        this.getSelectedSponsorId = this.getSelectedSponsorId.bind(this);
        this.getSelectedStudyId = this.getSelectedStudyId.bind(this);
        this.getSelectedTestId = this.getSelectedTestId.bind(this);
        this.getSelectedVialId = this.getSelectedVialId.bind(this);
        this.getSelectedFreezerLocationId = this.getSelectedFreezerLocationId.bind(this);
    }

    getSelectedSponsorId = function(sponsorId) {
        this.setState({
            sponsorId
        });
    };

    getSelectedStudyId = function(studyId) {
        this.setState({
            studyId
        });
    };

    getSelectedTestId = function(testId) {
        this.setState({
            testId
        });
    };

    getSelectedVialId = function(vialId) {
        this.setState({
            vialId
        });
    };

    getSelectedFreezerLocationId = function(freezerLocationId) {
        this.setState({
            freezerLocationId
        });
    };

    notifyParent = function(name, selectedField) {
        console.log(name,selectedField);

    };
    onChange = date => this.setState({date})

    render() {

        return (
            <div>

                <Header headerTitle="Batch Creation - Input Search Criteria"/>
                <div className="container">

                    <div className="row">
                        <div className='col-md-6'>
                            <SponsorList getSelectedSponsorId={this.getSelectedSponsorId}/>

                            <StudyList getSelectedStudyId={this.getSelectedStudyId} sponsorId={this.state.sponsorId}/>

                            <TestList getSelectedTestId={this.getSelectedTestId} studyId={this.state.studyId}/>


                            <div className="form-inline">
                                 <label className="col-sm-4 col-form-label" style={styles.label}>Pre-Dul. of Tilter Test</label>
                                <div className="col-sm-5">
                                    <LiveSearch
                                        liveSearchData={liveSponsorSearchData}
                                        notifyParent={this.notifyParent}/>
                                </div>
                            </div>

                            <div className="form-inline">
                                <label className="col-sm-4 col-form-label" style={styles.label}>volume|uom</label>
                                <div className="col-xl1">
                                    <LiveSearch
                                        liveSearchData={liveStatusSearchData}
                                        notifyParent={this.notifyParent}/>
                                    <input type="text" style={styles.text} className="form-control" aria-label="Small" id="usr"/>
                                </div>
                            </div>

                            <div className="form-inline">
                                <label className="col-sm-4 col-form-label" style={styles.label}>Visit</label>
                                <div className="col-sm-5">
                                    <LiveSearch
                                        liveSearchData={liveSponsorSearchData}
                                        notifyParent={this.notifyParent}/>
                                </div>
                            </div>

                            <div className="form-inline">
                                <label className="col-sm-4 col-form-label" style={styles.label}>Site</label>
                                <div className="col-sm-5">
                                    <LiveSearch
                                        liveSearchData={liveSponsorSearchData}
                                        notifyParent={this.notifyParent}/>
                                </div>
                            </div>

                            <div className="form-inline">
                                <label className="col-sm-4 col-form-label" style={styles.label}>ScreenID</label>
                                <div className="col-sm-5">
                                    <LiveSearch
                                        liveSearchData={liveSponsorSearchData}
                                        notifyParent={this.notifyParent}/>
                                </div>
                            </div>
                            <div className="form-inline">
                                <label className="col-sm-4 col-form-label" style={styles.label}>RandID</label>
                                <div className="col-sm-5">
                                    <LiveSearch
                                        liveSearchData={liveSponsorSearchData}
                                        notifyParent={this.notifyParent}/>
                                </div>
                            </div>
                            <div className="form-inline">
                                <label className="col-sm-4 col-form-label" style={styles.label}>Patient Accession</label>
                                <div className="col-sm-5">
                                    <LiveSearch
                                        liveSearchData={liveSponsorSearchData}
                                        notifyParent={this.notifyParent}/>
                                </div>
                            </div>
                            <div className="form-inline">
                                <label className="col-sm-4 col-form-label" style={styles.label}>Sample Type</label>
                                <div className="col-sm-5">
                                    <LiveSearch
                                        liveSearchData={liveSponsorSearchData}
                                        notifyParent={this.notifyParent}/>
                                </div>
                            </div>

                            <VialLocationList getSelectedVialId={this.getSelectedVialId} testId={this.state.testId}/>

                            <FreezerLocationList getSelectedVialId={this.getSelectedFreezerLocationId} testId={this.state.freezerLocationId}/>
                            <div className="form-inline">
                                <label className="col-sm-4 col-form-label" style={styles.label}>Freezer</label>
                                <div className="col-sm-5">
                                    <LiveSearch
                                        liveSearchData={liveSponsorSearchData}
                                        notifyParent={this.notifyParent}/>
                                </div>
                            </div>
                            <div className="form-inline">
                                <label className="col-sm-4 col-form-label" style={styles.label}>Freezer Shelf</label>
                                <div className="col-sm-5">
                                    <LiveSearch
                                        liveSearchData={liveSponsorSearchData}
                                        notifyParent={this.notifyParent}/>
                                </div>
                            </div>
                            <div className="form-inline">
                                <label className="col-sm-4 col-form-label" style={styles.label}>Freezer Rack</label>
                                <div className="col-sm-5">
                                    <LiveSearch
                                        liveSearchData={liveSponsorSearchData}
                                        notifyParent={this.notifyParent}/>
                                </div>
                            </div>
                            <div className="form-inline">
                                <label className="col-sm-4 col-form-label" style={styles.label}>Freezer Box</label>
                                <div className="col-sm-5">
                                    <LiveSearch
                                        liveSearchData={liveLocationSearchData}
                                        notifyParent={this.notifyParent}/>
                                </div>
                            </div>

                        </div>

                        <div className='col-md-6'>

                            <div className="row">
                                <div className="col-md-3" style={styles.col}>
                                    <label >Draw Date
                                    </label>
                                </div>
                                <div className="col-md" style={styles.col}>
                                    <div>
                                        <label className="col-sm-2 col-form-label">From:
                                        </label>
                                        <DateTimePicker onChange={this.onChange} value={this.state.date}/>
                                    </div>
                                    <div>
                                        <label className="col-sm-2 col-form-label">To:
                                        </label>
                                        <DateTimePicker/>
                                    </div>
                                </div>
                            </div>

                            <div className="row" style={styles.rowTop}>
                                <div className="col-md-3" style={styles.col}>
                                    <label >Recieved Date
                                    </label>
                                </div>
                                <div className="col-md" style={styles.col}>
                                    <div>
                                        <label className="col-sm-2 col-form-label">From:
                                        </label>
                                        <DateTimePicker onChange={this.onChange} value={this.state.date}/>
                                    </div>
                                    <div>
                                        <label className="col-sm-2 col-form-label">To:
                                        </label>
                                        <DateTimePicker/>
                                    </div>
                                </div>
                            </div>

                            <div className="row" style={styles.rowTop}>
                                <div className="col-md-3" style={styles.col}>
                                    <label >Recieved Date
                                    </label>
                                </div>

                                <div className="col-md" style={styles.col}>
                                    <div>
                                        <label className="col-sm-2 col-form-label">From:
                                        </label>
                                        <DateTimePicker onChange={this.onChange} value={this.state.date}/>
                                    </div>
                                    <div>
                                        <label className="col-sm-2 col-form-label">To:
                                        </label>
                                        <DateTimePicker/>
                                    </div>
                                </div>
                            </div>

                            <div className="row" style={styles.rowTop}>
                                <div className="col-md-5" style={styles.col}>
                                    <label>Parent Barcode</label>
                                </div>
                                <div >
                                    <input type="text"/>
                                    <button>Go</button>
                                </div>
                            </div>

                            <div className="row" style={styles.rowTop}>
                                <div className="col-md-5" style={styles.col}>
                                    <label>Paste Box Barcodes</label>
                                </div>
                                <input className="textBox" type="text"/>
                            </div>

                            <div className="row" style={styles.rowTop}>
                                <div className="col-md-5" style={styles.col}>
                                    <label>Paste Parent Barcodes</label>
                                </div>
                                <input className="textBox" type="text"/>
                            </div>

                            <div className="row" style={styles.rowTop}>
                                <div className="col-md-2" style={styles.col}>
                                    <div className="form-check">
                                        <input type="checkbox" className="form-check-input" id="exampleCheck1"></input>
                                    </div>
                                </div>
                                <label className="form-check-label">Include items with open exceptions?</label>
                            </div>

                            <div className="row" style={styles.rowTop}>
                                <div className="col-md-2" style={styles.col}>
                                    <div className="form-check">
                                        <input type="checkbox" className="form-check-input" id="exampleCheck1"></input>
                                    </div>
                                </div>
                                <label className="form-check-label">Only items with prerequistes met</label>
                            </div>

                            <div className="row" style={styles.rowTop}>
                                <div className="col-md-2" style={styles.col}>
                                    <div className="form-check">
                                        <input type="checkbox" className="form-check-input" id="exampleCheck1"></input>
                                    </div>
                                </div>
                                <label className="form-check-label">Only items with HI in last days</label>
                            </div>

                            <div className="row" style={styles.rowTop}>
                                <div className="col-md-5" style={styles.col}>
                                    <label>Parent Barcode</label>
                                </div>
                                <div className="form-inline">
                                    <LiveSearch
                                        liveSearchData={liveLocationSearchData}
                                        notifyParent={this.notifyParent}/>
                                </div>
                            </div>

                            <div className="row" style={styles.button}>
                                <div className="col-sm-2">
                                    <button className="btn btn-primary">Reset</button>
                                </div>
                                <div className="col-sm-2">
                                    <button className="btn btn-secondary">Find</button>
                                </div>
                                <div className="col-sm-2">
                                    <button className="btn btn-success">Save</button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        );
    }
}
const styles = ({
    label: {
        justifyContent: 'flex-start'
    },
    rowTop: {
        marginTop: '20px'

    },
    text: {
        width:"30%",
        height:"31px"
    },
    col: {
        textAlign: 'start'
    },
    button: {
        justifyContent: 'flex-end',
        marginTop: '25px'
    }
});

export default InputSearchCriteria;