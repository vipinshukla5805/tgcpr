import React, {Component} from 'react';
import './InputSearchCriteria.css';
import LiveSearch from '../searchWorkOrder/LiveSearch';
import Header from "../header/Header";
 import DateTimePicker from 'react-datetime-picker';
 import axios from 'axios';

const liveLocationSearchData = ["Mustard", "Ketchup", "Relish"];
// const liveSavedSearchData = ["Save1", "Save2", "Save3", "Save4"];
const liveStatusSearchData = ["Created", "In Progress", "Completed", "Cancelled"];
const liveSponsorSearchData = ['a'];
const liveStudySearchData = ['b'];

let sponsorId;
let studyId;


class InputSearchCriteria extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            liveSponsorSearchData: [],
            sponsorList : [],
            liveStudySearchData : [],
            studyList : [],
            liveTestSearchData : [],
            testList : [],
            liveVialLocationData : [],
            vialLocation : [],
            livefreezerLocationData : [],
            freezerLocation:[]
        };
        this.notifyParent = this.notifyParent.bind(this);
    }

    componentDidMount(){
        axios.get('http://localhost:8081/gclportal/api/getallsponsors')
            .then((res)=> {
                console.log(res.data);
                let sponsorList = [];
                for(let i=0;i<res.data.length;i++) {
                    sponsorList.push(res.data[i].name);
                }
                this.setState({
                    liveSponsorSearchData : res.data,
                    sponsorList
                });
            }, (err) => {
                console.log(err);
            });
    }
    notifyParent = function(name, selectedField){
        console.log(name,selectedField);
        if(name==='sponsor') {
            for(let i=0;i<this.state.liveSponsorSearchData.length;i++){
                if(selectedField[0]===this.state.liveSponsorSearchData[i].name) {
                    sponsorId = this.state.liveSponsorSearchData[i].id;
                }
            }
            axios.get('http://localhost:8081/gclportal/api/studynumbers/'+ sponsorId)
                .then((res)=> {
                    console.log(res.data);
                    let studyList = [];
                    for(let i=0;i<res.data.length;i++) {
                        studyList.push(res.data[i].name);
                    }
                    this.setState({
                        liveStudySearchData : res.data,
                        studyList
                    });
                }, (err) => {
                    console.log(err);
                });
        }
       if(name === 'study'){
           for(let i=0;i<this.state.liveStudySearchData.length;i++){
               if(selectedField[0]===this.state.liveStudySearchData[i].name) {
                   studyId = this.state.liveStudySearchData[i].id;
               }
           }

           axios.get('http://localhost:8081/gclportal/api/tests/'+ studyId)
               .then((res)=> {
                   console.log(res.data);
                   let testList = [];
                   for(let i=0;i<res.data.length;i++) {
                       testList.push(res.data[i].name);
                   }
                   this.setState({
                       liveTestSearchData : res.data,
                       testList
                   });
               }, (err) => {
                   console.log(err);
               });
       }

      // if(name === 'test') {
           axios.get('http://localhost:8081/gclportal/api/viallocation')
               .then((res)=> {
                   console.log(res.data);
                   let vialLocation = [];
                   for(let i=0;i<res.data.length;i++) {
                       vialLocation.push(res.data[i].name);
                   }
                   this.setState({
                       liveVialLocationData : res.data,
                       vialLocation
                   });
               }, (err) => {
                   console.log(err);
               });
       //}
        axios.get('http://localhost:8081/gclportal/api/freezerlocation')
            .then((res)=> {
                console.log(res.data);
                let freezerLocation = [];
                for(let i=0;i<res.data.length;i++) {
                    freezerLocation.push(res.data[i].name);
                }
                this.setState({
                    livefreezerLocationData : res.data,
                    freezerLocation
                });
            }, (err) => {
                console.log(err);
            });
    };
    onChange = date => this.setState({date})

    render() {

        return (
            <div>
                <Header headerTitle="Batch Creation - Input Search Criteria"/>
                <div className="container">
                    <div className="row">
                        <div className='col-md-6'>
                            <div className="form-inline">
                                <label className="col-sm-4 col-form-label" style={styles.label}>Sponsor</label>
                                <div className="col-sm-5">
                                    <LiveSearch
                                        liveSearchData={this.state.sponsorList}
                                        notifyParent={this.notifyParent} liveSearchDataResponse="sponsor"/>
                                </div>
                            </div>

                            <div className="form-inline">
                                <label className="col-sm-4 col-form-label" style={styles.label}>Studies</label>
                                <div className="col-sm-5">
                                    <LiveSearch
                                        liveSearchData={this.state.studyList}
                                        notifyParent={this.notifyParent} liveSearchDataResponse="study"/>
                                </div>
                            </div>
                            <div className="form-inline">
                                <label className="col-sm-4 col-form-label" style={styles.label}>Test</label>
                                <div className="col-sm-5">
                                    <LiveSearch
                                        liveSearchData={this.state.testList}
                                        notifyParent={this.notifyParent}  liveSearchDataResponse="test"/>
                                </div>
                            </div>

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
                            <div className="form-inline">
                                <label className="col-sm-4 col-form-label" style={styles.label}>Vial Location</label>
                                <div className="col-sm-5">
                                    <LiveSearch
                                        liveSearchData={this.state.vialLocation}
                                        notifyParent={this.notifyParent}
                                        liveSearchDataResponse="vial"/>
                                </div>
                            </div>
                            <div className="form-inline">
                                <label className="col-sm-4 col-form-label" style={styles.label}>Freezer Location</label>
                                <div className="col-sm-5">
                                    <LiveSearch
                                        liveSearchData={this.state.freezerLocation}
                                        notifyParent={this.notifyParent}
                                        liveSearchDataResponse="freezer"/>
                                </div>
                            </div>
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