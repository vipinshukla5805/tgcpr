import React, {Component} from 'react';
import './update.css';
import Header from "../header/Header";
import {BootstrapTable, TableHeaderColumn} from "react-bootstrap-table";
// import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/scale.css';
import axios from 'axios';
// import { Link } from "react-router-dom";
import {Redirect} from 'react-router'

class UpdateWorkOrder extends Component {
    constructor(props) {
        super(props);
        this.changeStatusToCompleted = this.changeStatusToCompleted.bind(this);
        this.state = {
            status : props.match.params.status,
            workOrderId : props.match.params.workOrderId,
            products: [],
            redirect : false
    }}

    changeStatusToCompleted = () => {
        if(this.state.status === 'Created' || this.state.status === 'In Progress') {
           let confirmComplete = window.confirm('You sure you want to change status to completed?');
            if(confirmComplete) {
                axios.post(' http://localhost:8081/gclportal/api/workorder/completedworkorder?bioaworkOrderNo=' + this.state.workOrderId)
                    .then( (res) => {
                            console.log(res.data);
                            this.setState({
                                products : res.data
                            })
                        },
                        (error) => {console.log(error)});

                this.setState({ status: 'Completed', redirect : true});
            }

        }
    };

    changeStatusToCancelled = () => {
        if(this.state.status === 'Created' || this.state.status === 'In Progress') {
            let confirmCancel = window.confirm('You sure you want to change status to cancelled?');
            if(confirmCancel) {
                axios.post(' http://localhost:8081/gclportal/api/workorder/cancelworkorder?bioaworkOrderNo=' + this.state.workOrderId)
                    .then((res) => {
                            console.log(res.data);
                            this.setState({
                                products : res.data
                            })
                        },
                        (error) => {
                            console.log(error)
                        });
            };
                this.setState({ status: 'Cancelled' , redirect : true});
            }
    };

    handleChange(event) {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    componentDidMount() {
        axios.get('http://xtest3.ppdi.com/gclportal/api/workorder/bioaworkorder?bioaworkOrderNo=' + this.state.workOrderId)
            .then( (res) => {
                console.log(res.data);
                    let getUpdatedData=[];
                    for(let i=0;i<res.data.length;i++){
                        getUpdatedData.push({
                            id : getUpdatedData.length + 1,
                            barcode: res.data[i].barcode,
                            volume : res.data[i].sampleVolume,
                            sampleType: res.data[i].sampleType,
                            uom: res.data[i].uom,
                            sponsor: res.data[i].sponsor,
                            study: res.data[i].studyCode
                        });
                    }
                    this.setState({
                        products: getUpdatedData
                    })
                },
                (error) => {console.log(error)});
    }

    onAfterDeleteRow = (rowKeys) => {
        console.log(rowKeys.length);
        for(let i=0;i<rowKeys.length;i++) {
            axios({
                method: 'delete', url: 'http://localhost:8081/gclportal/api/workorder/deletebarcode?bioworkOrderNo='+ this.state.workOrderId+'&barcode=' + this.state.products[rowKeys[i]-1].barcode
            }).then((res)=> {
                console.log(res.data);
            }, (error)=>{
                console.log(error);
            });
        }
        this.state.products.splice(rowKeys[0]-1,rowKeys.length);
        this.state.products.map((data,index) => {
            return data.id = index + 1;
        });

    };
    render() {
        console.log(this.state.products);
        const options = {
            page: 1,
            sizePerPageList: [{
                text: '5', value: 5
            }, {
                text: '10', value: 10
            }, {
                text: 'All', value: this.state.products.length
            }],
            sizePerPage: 5,
            pageStartIndex: 1,
            paginationSize: 3,
            prePage: 'Prev',
            nextPage: 'Next',
            firstPage: 'First',
            lastPage: 'Last',
            paginationShowsTotal: this.renderShowsTotal,
            paginationPosition: 'bottom',
            afterDeleteRow: this.onAfterDeleteRow
        };

        const selectRowProp = {
            mode: 'checkbox',
            bgColor: 'rgba(244, 65, 54, 0.36)'

        };
        return (
            <div>
                <Header headerTitle=" PCR Aliquot Services- Update Work Order"/>

                <div className="container">
                    <form className="updateTableHeader">
                        <div className="row">
                            <div className="col-sm-2">
                                <label className="label">Work Order Id</label>
                                <input type="text" className="form-control form-control-sm" value={this.state.workOrderId} disabled={true} onChange={this.handleChange}></input>
                            </div>
                            <div className="col-sm-2">
                                <label className="label">Status</label>
                                <input type="text" className="form-control form-control-sm" value={this.state.status} disabled={true} onChange={this.handleChange}></input>
                            </div>
                            <div className="col-sm-1">
                                <label className="label">Total</label>
                                <input type="text" className="form-control form-control-sm" value={this.state.products.length} disabled={true}></input>
                            </div>

                        </div>
                    </form>
                </div>

                <div className="container" style={styles.pagebutton}>
                    <BootstrapTable
                        data={this.state.products}
                        options={options}
                        pagination
                        selectRow={selectRowProp}
                        deleteRow={true}
                        trStyle={styles.tdStyle}
                        headerStyle={styles.thStyle}
                    >
                        <TableHeaderColumn width="39" dataField='id' isKey={ true }>#</TableHeaderColumn>
                        <TableHeaderColumn dataField='barcode'>Parent Barcode</TableHeaderColumn>
                        <TableHeaderColumn dataField='sampleType'>Sample Type</TableHeaderColumn>
                        <TableHeaderColumn dataField='sampleVolume'>Volume</TableHeaderColumn>
                        <TableHeaderColumn dataField='uom'>UOM</TableHeaderColumn>
                        <TableHeaderColumn dataField='sponsor'>Sponsor</TableHeaderColumn>
                        <TableHeaderColumn dataField='studyCode'>Study</TableHeaderColumn>
                    </BootstrapTable>
                </div>

                <div className="container" style={styles.fStyle}>
                    <div className="row justify-content-md-center">
                        <div className="col-sm-2">
                            <button className="btn btn-primary" onClick={this.changeStatusToCompleted}>Complete</button>
                        </div>
                        <div className="col-sm-2">
                            <button className="btn btn-primary"><a href={ "http://localhost:8081/gclportal/api/workorder/exportworkorder?workOrderId=" + this.state.workOrderId} target="_blank">Export</a></button>
                        </div>
                        <div className="col-sm-2">
                            <button className="btn btn-primary" onClick={this.changeStatusToCancelled}>Cancel</button>
                        </div>

                    </div>
                </div>
                {(this.state.redirect) ? <Redirect to="/searchWorkOrder"/>  : <div></div>}
            </div>
        );
    }
}

const styles = ({
    //Bottom Container style
    fStyle: {
        marginTop: '35px'
    },
    pagebutton: {
        textAlign: 'left',
        marginTop: '25px'
    },

    // table data style
    tdStyle: {
        lineHeight: '14px',
        deleteRow: 'bottom'
    },

    // table header style
    thStyle: {
        textAlign: 'center',
        backgroundColor: '#a06aa0c4'
    }
});

export default UpdateWorkOrder;