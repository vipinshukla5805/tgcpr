import React, {Component} from 'react';
import './InputSearchCriteria.css';
import LiveSearch from '../searchWorkOrder/LiveSearch';
import Header from "../header/Header";
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
 // import axios from 'axios';
 import SponsorList from './SponsorList';
import StudyList from "./StudyList";
import TestList from "./TestList";
import SampleTypeList from "./SampleTypeList";
import FreezerLocationList from "./FreezerLocationList";
import FreezerList from "./FreezerList";
import VialLocationList from "./VialLocationList"
import FreezerShelfList from "./FreezerShelfList";
import FreezerRackList from "./FreezerRackList";
import FreezerBoxList from "./FreezerBoxList";
import VisitList from "./VisitList";
import SiteList from "./SiteList";
import ScreenIDList from "./ScreenIDList";
import RandIDList from "./RandIDList";
import PatientAccessionList from "./PatientAccessionList";
import PreDulTestList from "./PreDulTestList";
import {Link} from "react-router-dom";

// import { BrowserRouter as Router, Route } from "react-router-dom";

const liveLocationSearchData = ["Mustard", "Ketchup", "Relish"];
const liveStatusSearchData = ["ml", "ul", "g", "mg", "ug","ng"];



class InputSearchCriteria extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: moment(),
            sponsorId : '',
            studyId : '',
            testId : '',
            vialId : '',
            SampleTypeId:'',
            preDulId:'',
            visitId:'',
            freezerLocationId : '',
            freezerId: '',
            freezerShelfId: '',
            freezerRackId:'',
            freezerBoxId: '',
            siteId:'',
            screenId:'',
            randId:'',
            patientId:''
        };
        this.notifyParent = this.notifyParent.bind(this);
        this.getSelectedSponsorId = this.getSelectedSponsorId.bind(this);
        this.getSelectedStudyId = this.getSelectedStudyId.bind(this);
        this.getSelectedTestId = this.getSelectedTestId.bind(this);
        this.getSelectedVialId = this.getSelectedVialId.bind(this);
        this.getSelectedSampleTypeId = this.getSelectedSampleTypeId.bind(this);
        this.getSelectedPreDulTestId = this.getSelectedPreDulTestId(this);
        this.getSelectedVisitId = this.getSelectedVisitId.bind(this);
        this.getSelectedSiteId = this.getSelectedSiteId.bind(this);
        this.getSelectedScreenID_Id = this.getSelectedScreenID_Id.bind(this);
        this.getSelectedRandID_Id = this.getSelectedRandID_Id.bind(this);
        this.getSelectedPatientAccessionId = this.getSelectedPatientAccessionId.bind(this);
        this.getSelectedFreezerLocationId = this.getSelectedFreezerLocationId.bind(this);
        this.getSelectedFreezerId = this.getSelectedFreezerId.bind(this);
        this.getSelectedFreezerShelfId = this.getSelectedFreezerShelfId.bind(this);
        this.getSelectedFreezerRackId = this.getSelectedFreezerRackId.bind(this);
        this.getSelectedFreezerBoxId = this.getSelectedFreezerBoxId.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(date) {
        this.setState({
            startDate: date
        });
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
        // this.props.router.push({
        //     pathName :'/batchSearchResults',
        //     state : this.state.vialId
        // })
    };

    getSelectedSampleTypeId = function( SampleType) {
        this.setState({
            SampleType
        });
    };

    getSelectedPreDulTestId = function( preDulId) {
        this.setState({
            preDulId
        });
    };

    getSelectedVisitId = function( visitId) {
        this.setState({
            visitId
        });
    };

    getSelectedSiteId = function( siteId) {
        this.setState({
            siteId
        });
    };

    getSelectedScreenID_Id = function( screenId) {
        this.setState({
            screenId
        });
    };

    getSelectedRandID_Id = function( randId) {
        this.setState({
            randId
        });
    };

    getSelectedPatientAccessionId = function( patientId) {
        this.setState ({
            patientId
        });
    };

    getSelectedFreezerLocationId = function(freezerLocationId) {
        this.setState({
            freezerLocationId
        });
    };

    getSelectedFreezerId = function(freezerId) {
        this.setState({
            freezerId
        });
    };

    getSelectedFreezerShelfId = function(freezerShelfId) {
        this.setState({
            freezerShelfId
        });
    };

    getSelectedFreezerRackId = function(freezerRackId) {
        this.setState({
            freezerRackId
        });
    };

    getSelectedFreezerBoxId = function(freezerBoxId) {
        this.setState({
            freezerBoxId
        });
    };

    notifyParent = function(name, selectedField) {
        console.log(name,selectedField);

    };
    // onChange = date => this.setState({date})

    render() {

        return (
            <div>

                <Header headerTitle="Batch Creation - Input Search Criteria"/>
                <div className="container input-search-container">

                    <div className="row">
                        <div className='col-md-6'>
                            <SponsorList getSelectedSponsorId={this.getSelectedSponsorId}/>

                            <StudyList getSelectedStudyId={this.getSelectedStudyId} sponsorId={this.state.sponsorId}/>

                            <TestList getSelectedTestId={this.getSelectedTestId} studyId={this.state.studyId}/>

                            <PreDulTestList getSelectedPreDulTestId={this.getSelectedPreDulTestId} studyId={this.state.studyId}/>

                            <div className="form-inline">
                                <label className="col-sm-4 col-form-label" style={styles.label}>volume|uom</label>
                                <div className="col-xl1">
                                    <input type="text" style={styles.text} className="form-control" aria-label="Small" id="usr"/>
                                    <LiveSearch
                                        liveSearchData={liveStatusSearchData}
                                        notifyParent={this.notifyParent}/>
                                </div>
                            </div>

                            <VisitList getSelectedVisitId={this.getSelectedVisitId} studyId={this.state.studyId} />

                            <SiteList getSelectedSiteId={this.getSelectedSiteId} studyId={this.state.studyId}/>

                            <ScreenIDList getSelectedScreenID_Id={this.getSelectedScreenID_Id} studyId={this.state.studyId}/>

                            <RandIDList getSelectedRandID_Id={this.getSelectedRandID_Id} studyId={this.state.studyId}/>

                            <PatientAccessionList getSelectedPatientAccessionId={this.getSelectedPatientAccessionId} studyId={this.state.studyId}/>

                            <SampleTypeList getSelectedSampleTypeId={this.getSelectedSampleTypeId} testId={this.state.testId}/>

                            <VialLocationList getSelectedVialId={this.getSelectedVialId} testId={this.state.testId}/>

                            <FreezerLocationList getSelectedFreezerLocationId={this.getSelectedFreezerLocationId} testId={this.state.testId}/>

                            <FreezerList getSelectedFreezerId={this.getSelectedFreezerId} freezerLocationId={this.state.freezerLocationId}/>

                            <FreezerShelfList getSelectedFreezerShelfId={this.getSelectedFreezerShelfId} freezerId={this.state.freezerId}/>

                            <FreezerRackList getSelectedFreezerRackId={this.getSelectedFreezerRackId} freezerShelfId={this.state.freezerShelfId}/>

                            <FreezerBoxList getSelectedFreezerBoxId={this.getSelectedFreezerBoxId} freezerRackId={this.state.freezerRackId}/>


                        </div>

                        <div className='col-md-6'>

                            <div className="row" style={styles.rowTop}>
                                <div className="col-md-4" style={styles.col}>
                                    <label >Draw Date</label>
                                </div>
                                <div className="col-md" style={styles.col}>
                                    <div className="date-style">
                                        <label className="col-sm-3 col-form-label">From:</label>
                                        <DatePicker
                                            placeholderText="mm/dd/yyyy"
                                            // selected={this.state.startDate}
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                    <div className="date-style">
                                        <label className="col-sm-3 col-form-label">To:
                                        </label>
                                        <DatePicker
                                            placeholderText="mm/dd/yyyy"
                                            // selected={this.state.startDate}
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="row" style={styles.rowTop}>
                                <div className="col-md-4" style={styles.col}>
                                    <label >Recieved Date</label>
                                </div>
                                <div className="col-md" style={styles.col}>
                                    <div className="date-style">
                                        <label className="col-sm-3 col-form-label">From:
                                        </label>
                                        <DatePicker
                                            placeholderText="mm/dd/yyyy"
                                            // selected={this.state.startDate}
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                    <div className="date-style">
                                        <label className="col-sm-3 col-form-label">To:</label>
                                        <DatePicker
                                            placeholderText="mm/dd/yyyy"
                                            // selected={this.state.startDate}
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="row" style={styles.rowTop}>
                                <div className="col-md-5" style={styles.col}>
                                    <label >Sequence Number
                                    </label>
                                </div>
                                <div className="col-md" style={styles.sequenceNo}>
                                    <div>
                                        <div className="col-md seq-no" >
                                        <label >From:</label>
                                        <input type="text" style={styles.sequenceText} className="form-control" aria-label="Small"/>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="col-md seq-no" >
                                        <label >To:</label>
                                        <input type="text" style={styles.sequenceText} className="form-control" aria-label="Small" />
                                        </div>
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
                                <textarea className="form-control Paste-text-area"  rows="3"></textarea>
                            </div>

                            <div className="row" style={styles.rowTop}>
                                <div className="col-md-5" style={styles.col}>
                                    <label>Paste Parent Barcodes</label>
                                </div>
                                <textarea className="form-control Paste-text-area"  rows="3"></textarea>
                            </div>

                            <div className="row" style={styles.rowTop}>
                                <div className="col-md-2" style={styles.col}>
                                    <div className="form-check">
                                        <input type="checkbox" className="form-check-input"></input>
                                    </div>
                                </div>
                                <label className="form-check-label">Include items with open exceptions?</label>
                            </div>

                            <div className="row" style={styles.rowTop}>
                                <div className="col-md-2" style={styles.col}>
                                    <div className="form-check">
                                        <input type="checkbox" className="form-check-input"></input>
                                    </div>
                                </div>
                                <label className="form-check-label">Only items with prerequistes met</label>
                            </div>

                            <div className="row" style={styles.rowTop}>
                                <div className="col-md-2" style={styles.col}>
                                    <div className="form-check">
                                        <input type="checkbox" className="form-check-input" ></input>
                                    </div>
                                </div>
                                <label className="form-check-label">Only items with HI in last days</label>
                            </div>

                            <div className="form-inline" style={styles.rowTop1}>
                                <label className="col-sm-5 col-form-label" style={styles.label}>My Saved Searches</label>
                                <div className="col-sm-5">
                                    <LiveSearch
                                        notifyParent={this.notifyParent}
                                        liveSearchData={liveLocationSearchData}/>
                                </div>
                            </div>
                            <div className="row" style={styles.SaveField}>
                                <div className="col-md-5"></div>
                                    <div className="form-check">
                                        <input type="checkbox" className="form-check-input" id="exampleCheck1"></input>
                                    </div>
                                <label className="form-check-label">Show other user's searches</label>
                            </div>



                            <div className="row" style={styles.button}>
                                <div className="col-sm-2">
                                    <button id='reset-button'className="btn btn-primary">Reset</button>
                                </div>
                                <div className="col-sm-2">
                                    <button  className="btn btn-success">
                                        <Link style={styles.findButton} to='/batchSearchResults' state={this.state.vialId}>Find</Link>
                                    </button>


                                </div>
                                <div className="col-sm-2">
                                    <button id='save-button'className="btn btn-secondary">Save</button>
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
    rowTop1: {
        marginTop: '20px',
        marginLeft:'-12px'
    },
    SaveField:{
        marginTop:'5px',
        paddingLeft:'45px'
    },
    findButton:{
        color:'white'
    },
    sequenceText:{
        width:'50%',
        height: '30px'
    },
    sequenceNo :{
        display:'flex',
        marginLeft:'-44px'
    },
    text: {
        width: '48%',
        height: '31px',
        marginLeft:'29px'
    },
    col: {
        textAlign: 'start'
    },
    button: {
        justifyContent: 'flex-end',
        marginTop: '45px'
    }

});

export default InputSearchCriteria;