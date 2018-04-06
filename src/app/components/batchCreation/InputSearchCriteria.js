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
import { getBatchResult, getresult } from "../../action/batch.action"
import { connect } from 'react-redux';

//import { BrowserRouter as Router, Route } from "react-router-dom";

const liveLocationSearchData = ["Mustard", "Ketchup", "Relish"];
const liveStatusSearchData = ["ml", "ul", "g", "mg", "ug","ng"];



class InputSearchCriteria extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: moment(),
            sponsorData: {},
            studyData: {},
            testData : {},
            vialData : {},
            SampleTypeData:{},
            preDulData:{},
            visitData: {},
            freezerLocationData : {},
            freezerData: {},
            freezerShelfData: {},
            freezerRackData:{},
            freezerBoxData:{},
            siteData:{},
            screenData:{},
            randData:{},
            patientData:{},
            INCLUDE_ITEMS_WITH_OPEN_EXCEPTIONS : false,
            ONLY_ITEMS_WITH_PREREQUISITES_MET : false
        };
        this.notifyParent = this.notifyParent.bind(this);
        this.getSelectedSponsorData = this.getSelectedSponsorData.bind(this);
        this.getSelectedStudyData = this.getSelectedStudyData.bind(this);
        this.getSelectedTestData = this.getSelectedTestData.bind(this);
        this.getSelectedVialData = this.getSelectedVialData.bind(this);
        this.getSelectedSampleTypeData = this.getSelectedSampleTypeData.bind(this);
        this.getSelectedPreDulTestData = this.getSelectedPreDulTestData(this);
        this.getSelectedVisitData= this.getSelectedVisitData.bind(this);
        this.getSelectedSiteData = this.getSelectedSiteData.bind(this);
        this.getSelectedScreenID_Data = this.getSelectedScreenID_Data.bind(this);
        this.getSelectedRandID_Data = this.getSelectedRandID_Data.bind(this);
        this.getSelectedPatientAccessionData = this.getSelectedPatientAccessionData.bind(this);
        this.getSelectedFreezerLocationData = this.getSelectedFreezerLocationData.bind(this);
        this.getSelectedFreezerData = this.getSelectedFreezerData.bind(this);
        this.getSelectedFreezerShelfData = this.getSelectedFreezerShelfData.bind(this);
        this.getSelectedFreezerRackData = this.getSelectedFreezerRackData.bind(this);
        this.getSelectedFreezerBoxData = this.getSelectedFreezerBoxData.bind(this);
        this.handleIncludeItemsCheckbox = this.handleIncludeItemsCheckbox.bind(this);
        this.handleOnlyItemsCheckbox = this.handleOnlyItemsCheckbox.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.findBatchResult = this.findBatchResult.bind(this);
    }

    handleChange(date) {
        this.setState({
            startDate: date
        });
    }

    getSelectedSponsorData = function(sponsorData) {
        this.setState({
            sponsorData
        });
    };

    getSelectedStudyData = function(studyData) {
        this.setState({
            studyData
        });
    };

    getSelectedTestData = function(testData) {
        this.setState({
            testData
        });
    };

    getSelectedVialData = function(vialData) {
        this.setState({
            vialData
        });
        // this.props.router.push({
        //     pathName :'/batchSearchResults',
        //     state : this.state.vialId
        // })
    };
    handleOnlyItemsCheckbox = function () {
        this.setState({
            ONLY_ITEMS_WITH_PREREQUISITES_MET: !this.state.ONLY_ITEMS_WITH_PREREQUISITES_MET
        });
    };

    handleIncludeItemsCheckbox = function () {
      this.setState({
          INCLUDE_ITEMS_WITH_OPEN_EXCEPTIONS: !this.state.INCLUDE_ITEMS_WITH_OPEN_EXCEPTIONS
      });
    };

    getSelectedSampleTypeData = function( SampleTypeData) {
        this.setState({
            SampleTypeData
        });
    };

    getSelectedPreDulTestData= function( preDulData) {
        this.setState({
            preDulData
        });
    };

    getSelectedVisitData = function( visitData) {
        this.setState({
            visitData
        });
    };

    getSelectedSiteData = function( siteData) {
        this.setState({
            siteData
        });
    };

    getSelectedScreenID_Data = function( screenData) {
        this.setState({
            screenData
        });
    };

    getSelectedRandID_Data = function( randData) {
        this.setState({
            randData
        });
    };

    getSelectedPatientAccessionData = function( patientData) {
        this.setState ({
            patientData
        });
    };

    getSelectedFreezerLocationData = function(freezerLocationData) {
        this.setState({
            freezerLocationData
        });
    };

    getSelectedFreezerData= function(freezerData) {
        this.setState({
            freezerData
        });
    };

    getSelectedFreezerShelfData = function(freezerShelfData) {
        this.setState({
            freezerShelfData
        });
    };

    getSelectedFreezerRackData = function(freezerRackData) {
        this.setState({
            freezerRackData
        });
    };

    getSelectedFreezerBoxData = function(freezerBoxData) {
        this.setState({
            freezerBoxData
        });
    };

    notifyParent = function(name, selectedField) {
        console.log(name,selectedField);

    };
    // onChange = date => this.setState({date})

    findBatchResult = function(){
        getBatchResult(this.state)
    } 

    render() {
        debugger
        return (
            <div>

                <Header headerTitle="Batch Creation - Input Search Criteria"/>
                <div className="container input-search-container">

                    <div className="row">
                        <div className='col-md-6'>
                            <SponsorList getSelectedSponsorData={this.getSelectedSponsorData}/>

                            <StudyList getSelectedStudyData={this.getSelectedStudyData} sponsorId={this.state.sponsorData.id}/>

                            <TestList getSelectedTestData={this.getSelectedTestData} studyId={this.state.studyData.id}/>

                            <PreDulTestList getSelectedPreDulTestData={this.getSelectedPreDulTestData} studyId={this.state.studyData.id}/>

                            <div className="form-inline">
                                <label className="col-sm-4 col-form-label" style={styles.label}>volume|uom</label>
                                <div className="col-xl1">
                                    <input type="text" style={styles.text} className="form-control" aria-label="Small" id="usr"/>
                                    <LiveSearch
                                        liveSearchData={liveStatusSearchData}
                                        notifyParent={this.notifyParent}/>
                                </div>
                            </div>

                            <VisitList getSelectedVisitData={this.getSelectedVisitData} studyId={this.state.studyData.id} />

                            <SiteList getSelectedSiteData={this.getSelectedSiteData} studyId={this.state.studyData.id}/>

                            <ScreenIDList getSelectedScreenID_Data={this.getSelectedScreenID_Data} studyId={this.state.studyData.id}/>

                            <RandIDList getSelectedRandID_Data={this.getSelectedRandID_Data} studyId={this.state.studyData.id}/>

                            <PatientAccessionList getSelectedPatientAccessionData={this.getSelectedPatientAccessionData} studyId={this.state.studyData.id}/>

                            <SampleTypeList getSelectedSampleTypeData={this.getSelectedSampleTypeData} testId={this.state.testData.id}/>

                            <VialLocationList getSelectedVialData={this.getSelectedVialData} testId={this.state.testData.id}/>

                            <FreezerLocationList getSelectedFreezerLocationData={this.getSelectedFreezerLocationData} testId={this.state.testData.id}/>

                            <FreezerList getSelectedFreezerData={this.getSelectedFreezerData} freezerLocationId={this.state.freezerLocationData.id}/>

                            <FreezerShelfList getSelectedFreezerShelfData={this.getSelectedFreezerShelfData} freezerId={this.state.freezerData.id}/>

                            <FreezerRackList getSelectedFreezerRackData={this.getSelectedFreezerRackData} freezerShelfId={this.state.freezerShelfData.id}/>

                            <FreezerBoxList getSelectedFreezerBoxData={this.getSelectedFreezerBoxData} freezerRackId={this.state.freezerRackData.id}/>


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
                                            style={styles.Calender}
                                            // selected={this.state.startDate}
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                    <div className="date-style">
                                        <label className="col-sm-3 col-form-label">To:
                                        </label>
                                        <DatePicker
                                            placeholderText="mm/dd/yyyy"
                                            style={styles.Calender}
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
                                            style={styles.Calender}
                                            // selected={this.state.startDate}
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                    <div className="date-style">
                                        <label className="col-sm-3 col-form-label">To:</label>
                                        <DatePicker
                                            placeholderText="mm/dd/yyyy"
                                            style={styles.Calender}
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
                                <div className="col-md-2" style={styles.sequenceNo}>
                                    <div>
                                        <div className="col-md seq-no" >
                                        <label >From:</label>
                                        <input type="text" style={styles.sequenceText} className="form-control" aria-label="Small"/>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="col-md-2 seq-no" >
                                        <label >To:</label>
                                        <input type="text" style={styles.sequenceText} className="form-control" aria-label="Small" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row" style={styles.rowTop}>
                                <div className="col-md-5" style={styles.col}>
                                    <label> Barcodes </label>
                                </div>
                                <div >
                                    <input className="Parent-barcode-batch-creation" type="text"/>
                                    <button>Go</button>
                                </div>
                            </div>

                            <div className="row" style={styles.rowTop}>
                                <div className="col-md-5" style={styles.col}>
                                    <label>Paste Barcodes</label>
                                </div>
                                <textarea className="form-control Paste-text-area"  rows="3"></textarea>
                            </div>

                            <div className="row" style={styles.rowTop}>
                                <div className="col-md-5" style={styles.col}>
                                    <label>Paste Box Barcodes</label>
                                </div>
                                <textarea className="form-control Paste-text-area"  rows="3"></textarea>
                            </div>

                            <div className="row" style={styles.rowTop}>
                                <div className="col-md-2" style={styles.col}>
                                    <div className="form-check">
                                        <input type="checkbox"  checked={this.state.INCLUDE_ITEMS_WITH_OPEN_EXCEPTIONS} onChange={this.handleIncludeItemsCheckbox}className="form-check-input"></input>
                                    </div>
                                </div>
                                <label className="form-check-label">Include items with open exceptions?</label>
                            </div>

                            <div className="row" style={styles.rowTop}>
                                <div className="col-md-2" style={styles.col}>
                                    <div className="form-check">
                                        <input type="checkbox" checked={this.state.ONLY_ITEMS_WITH_PREREQUISITES_MET} onChange={this.handleOnlyItemsCheckbox} className="form-check-input"></input>
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
                                <label className="form-check-label">Only items with HI in last
                                    <span id="only-item-span"> <input id="only-item-input"
                                     type="text"/></span>
                                    days</label>
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
                                    <button  className="btn btn-success" onClick={this.findBatchResult()} >
                                        <Link style={styles.findButton} params={this.props} to='/batchSearchResults' state={this.state.vialId}>Find</Link>
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
    Calender:{
        width:'175px'
    },
    findButton:{
        color:'white'
    },
    sequenceText:{
        width: '55px',
        height: '30px',
        marginLeft: '10px'
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

const mapStateToProps = (state) => ({
    searchresult: getresult()
  })

export default connect(mapStateToProps,{getBatchResult})(InputSearchCriteria);