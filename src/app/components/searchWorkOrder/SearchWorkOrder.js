import React, {Component} from 'react';
import './SearchWorkOrder.css';
import SearchPagination from './SearchPagination';
import Header from "../header/Header";
import LiveSearch from "./LiveSearch";
import {Link} from "react-router-dom";
import Workbook from 'react-excel-workbook';
import axios from "axios/index";

const liveSavedSearchData = ["Save1", "Save2", "Save3", "Save4"];
const liveStatusSearchData = ["Created", "In Progress", "Completed", "Cancelled"];
let selectedRow = [{workOrderId:'', status : ''}];
let queryObj = {};

function buildUrl(name, selectedField) {
    let str = 'http://xtest3.ppdi.com/gclportal/api/workorder/getWorkOrderSearchResults?';
    if(!!selectedField[0]) {
        queryObj[name] = selectedField;
    } else {
        delete queryObj[name];
    }
    for(let i=0;i<Object.keys(queryObj).length;i++) {
        if(Object.keys(queryObj)[i] !== undefined) {
            str += Object.keys(queryObj)[i] + '='+  queryObj[Object.keys(queryObj)[i]] + '&';
        }
    }

    return str;
};

class SearchWorkOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            statusFlag : [false, false,false, false, false],
            liveLocationSearchData : [],
            liveStudySearchData : [],
            liveSponsorSearchData : [],
            selectedExportRows : [],
            products1 : []
        };
        this.handleExportSelectedRows = this.handleExportSelectedRows.bind(this);
        this.handleStatusChange = this.handleStatusChange.bind(this);
        this.handleStatusCompletedFlag = this.handleStatusCompletedFlag.bind(this);
        this.notifyParent = this.notifyParent.bind(this);
        this.handleParentBarCode = this.handleParentBarCode.bind(this)

}

    handleStatusChange = (isStatusFlag) => {
      this.setState({
         statusFlag: isStatusFlag
      });
    };

    componentDidMount() {
        axios.get('http://xtest3.ppdi.com/gclportal/api/workorder/getLocations')
            .then( (res) => {
                    console.log(res.data);
                    this.setState({
                        liveLocationSearchData : res.data
                    })
                },
                (error) => {console.log(error)});
        axios.get('http://xtest3.ppdi.com/gclportal/api/workorder/getStudyCodes')
            .then( (res) => {
                    console.log(res.data);
                    this.setState({
                        liveStudySearchData : res.data
                    })
                },
                (error) => {console.log(error)});
        axios.get('http://xtest3.ppdi.com/gclportal/api/workorder/getSponsors')
            .then( (res) => {
                    console.log(res.data);
                    this.setState({
                        liveSponsorSearchData : res.data
                    })
                },
                (error) => {console.log(error)});
    }
    handleExportSelectedRows = (selectedRows) => {
        selectedRow = selectedRows;
        if(selectedRow === undefined || selectedRow[0] === undefined) {
            selectedRow.push({
                workOrderId : 'test',
                status : '123'
            })
        }
        console.log(selectedRows);
        this.setState ({
            selectedExportRows:selectedRows
        })
    };

    handleStatusCompletedFlag = (isStatusCompletedFlag) => {
       this.setState({
           statusCompletedFlag: isStatusCompletedFlag
                  });
    };

    notifyParent = (name,selectedField) => {
         axios.get(buildUrl(name,selectedField))
                .then( (res) => {
                        console.log(res.data);
                        if(res.data.length > 0){
                            let productArray = [];

                            for(let i=0;i<res.data.length;i++){
                                productArray.push({
                                    id: productArray.length,
                                    workOrderId : res.data[i].barcodeNo,
                                    createdDate: new Date(res.data[i].createdDate).toString(),
                                    status: res.data[i].status,
                                    sponsor: res.data[i].sponsor,
                                    parentSamples: res.data[i].itemCount,
                                    createdBy : res.data[i].createdby
                                });
                            }

                            console.log(productArray );
                            this.setState({
                                products1 : productArray
                            });
                        } else {
                            this.setState({
                                products1 : []
                            });
                        }
                    },
                    (error) => {console.log(error)});

    };

    handleParentBarCode(event){
       this.notifyParent('parentBarcode', event.target.value)
    }
    render() {
        return (
            <div>
               <Header headerTitle="PCR Aliquot Services-Search Work Order"/>
                <div className="container">
                    <form >
                        <div className="row">

                                <LiveSearch liveSearchData={this.state.liveLocationSearchData} notifyParent={this.notifyParent} liveSearchDataTitle="Location" liveSearchDataResponse="location"/>

                                <LiveSearch liveSearchData={this.state.liveStudySearchData} notifyParent={this.notifyParent} liveSearchDataTitle="Study" liveSearchDataResponse="studyCode"/>

                                <LiveSearch liveSearchData={this.state.liveSponsorSearchData} notifyParent={this.notifyParent} liveSearchDataTitle="Sponsor" liveSearchDataResponse="sponsor"/>

                            <div className="col-xl">
                                <label className="label">Parent Barcode</label>
                                <input id='parentBarcode' onChange={this.handleParentBarCode} type="text" placeholder="Enter "/>
                            </div>

                            <LiveSearch liveSearchData={liveStatusSearchData} notifyParent={this.notifyParent} liveSearchDataTitle="Status" liveSearchDataResponse="status"/>

                            <LiveSearch liveSearchData={liveSavedSearchData} notifyParent={this.notifyParent} liveSearchDataTitle="SAVE"/>

                        </div>
                    </form>
                </div>
                {/* <hr class="divider" text="react-native"/> */}
                <div className="container">
                    <SearchPagination products1={this.state.products1} handleStatusChange={this.handleStatusChange} handleExportSelectedRows={this.handleExportSelectedRows} handleStatusCompletedFlag = {this.handleStatusCompletedFlag}/>
                </div>

                <div className="container" style={styles.fStyle}>
                    <div className="row justify-content-md-center">
                        <div className="col-sm-2">
                            <Link to={'/updateWorkOrder/' + selectedRow[selectedRow.length-1].workOrderId + '/' + selectedRow[selectedRow.length-1].status} >
                                <button className="btn btn-primary" disabled={!this.state.statusFlag[0]}>
                                Update
                                </button>
                            </Link>
                        </div>
                        <div className="col-sm-2">
                            <Workbook filename="Search-Work-Order.xlsx" element={<button className="btn btn-primary" disabled={!this.state.statusFlag[1]}>Export</button>}>

                                <Workbook.Sheet data={this.state.selectedExportRows} name="Sheet A">
                                    <Workbook.Column label="Work Order Id" value="workOrderId"  />
                                    <Workbook.Column label="Create Date"  value="createDate"/>
                                    <Workbook.Column label="Status"  value="status"/>
                                    <Workbook.Column label="Sponsor"  value="sponsor"/>
                                    <Workbook.Column label="Total # of Parent Samples" value="parentSamples"/>
                                    <Workbook.Column label="Created By"  value="createdBy"/>
                                    <Workbook.Column label="Total # of Aliquot"  value="aliquot"/>
                                </Workbook.Sheet>
                            </Workbook>
                        </div>
                        <div className="col-sm-2">
                            <button className="btn btn-primary" disabled={!this.state.statusFlag[3]}>Create Aliquot</button>
                        </div>
                        {/*<div className="col-sm-2">*/}
                            {/*<button className="btn btn-primary" disabled={!this.state.statusFlag[4]}>Create Batch</button>*/}
                        {/*</div>*/}

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