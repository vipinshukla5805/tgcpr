import React from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import '../../../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import SheetJSApp from "../ImportFromExcel/ImportData";
import './PaginationTable.css';
import { ImportDataValidation } from "../Helpers";
import { styles  } from "../Constants";
import axios from "axios/index";


let validationResult;

class PaginationTable extends React.Component {
    

    constructor(props) {
        super(props);
        this.state = {
          submittedData : props.submittedData,
          DataFromXlsx : []
        };
        this.onAfterDeleteRow = this.onAfterDeleteRow.bind(this);
        this.handleData = this.handleData.bind(this);
        this.completeWorkOrder = this.completeWorkOrder.bind(this);
    }

    handleData(data,file) {
        validationResult = ImportDataValidation(data, this.state.submittedData);

        if (validationResult.isValid) {

                    let bodyFormData = new FormData();
                    if(!!this.props.workOrderId) {
                        bodyFormData.set('bioworkorderno',this.props.workOrderId);
                    } else {
                        bodyFormData.set('bioworkorderno','');
                    }
                    bodyFormData.set('file', file);
                    axios({
                        method: 'post', url: 'http://localhost:8081/gclportal/api/workorder/importWorkOrder',
                        data : bodyFormData
                    }).then((res)=> {
                        console.log(res.data);
                        this.setState({
                            DataFromXlsx : res.data
                        });
                        this.props.setWorkOrderId(res.data[0].workOrderNo);

                        let newAddedData = this.state.submittedData.slice();
                        for (let i=0; i<this.state.DataFromXlsx.length;i++) {
                            newAddedData.push({
                                id: newAddedData.length + 1,
                                barcode: this.state.DataFromXlsx[i].barcode,
                                volume : this.state.DataFromXlsx[i].sampleVolume,
                                sampleType: this.state.DataFromXlsx[i].sampleType,
                                uom: this.state.DataFromXlsx[i].uom,
                                sponsor: this.state.DataFromXlsx[i].sponsor,
                                study: this.state.DataFromXlsx[i].studyCode
                            })
                        }
                        console.log(newAddedData);
                        this.setState({
                            submittedData : newAddedData
                        });

                        this.props.editSubmittedData(this.state.submittedData);
                    }, (error)=>{
                        console.log(error);
                    });

        }

        else {
            alert(validationResult.reason);
        }

    }
    completeWorkOrder = (barcode) => {
        console.log('here');
        axios({
            method: 'post', url: 'http://localhost:8081/gclportal/api/workorder/updateWorkOrder?workOrderId=' + this.props.workOrderId,
            data :  { "barCodes":[ {
                    "barcode":'0072373881',
                    "volume":'10',
                    "uom":'ml'}]
            }
        }).then((res)=> {
            console.log(res.data);
        }, (error)=>{
            console.log(error);
        })
    };
    componentWillReceiveProps(newProps) {
        if(newProps.submittedData!==this.state.submittedData){
            this.setState({ submittedData : newProps.submittedData});
        }

    }

    onAfterDeleteRow = (rowKeys) => {
        console.log(rowKeys.length);

        for(let i=0;i<rowKeys.length;i++) {
            axios({
                method: 'delete', url: 'http://localhost:8081/gclportal/api/workorder/deletebarcode?bioworkOrderNo='+ this.props.workOrderId+'&barcode=' + this.state.submittedData[rowKeys[i]-1].barcode
            }).then((res)=> {
                console.log(res.data);
            }, (error)=>{
                console.log(error);
            });
        }
        this.state.submittedData.splice(rowKeys[0]-1,rowKeys.length);
        this.state.submittedData.map((data,index) => {
            return data.id = index + 1;
        });
        this.props.editSubmittedData(this.state.submittedData);

    };

    render() {

        const options = {
                    page: 1,  
                    sizePerPageList: [{
                        text: '5', value: 5
                    }, {
                        text: '10', value: 10
                    }, {
                        text: '40', value: 40
                    },{
                        text: 'All', value: this.state.submittedData.length
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
            <div style={styles.pagebutton}>
                <BootstrapTable
                    data={this.state.submittedData}
                    options={options}
                    pagination
                    deleteRow
                    selectRow={selectRowProp}
                    trStyle={styles.tdStyle}
                    headerStyle={styles.thStyle}
                >
                    <TableHeaderColumn width="39" dataField='id' isKey={ true }>#</TableHeaderColumn>
                    <TableHeaderColumn dataField='barcode'>Parent Barcode</TableHeaderColumn>
                    <TableHeaderColumn dataField='sampleType'>Sample Type</TableHeaderColumn>
                    <TableHeaderColumn dataField='volume'>Volume</TableHeaderColumn>
                    <TableHeaderColumn dataField='uom'>UOM</TableHeaderColumn>
                    <TableHeaderColumn dataField='sponsor'>Sponsor</TableHeaderColumn>
                    <TableHeaderColumn dataField='study'>Study</TableHeaderColumn>
                </BootstrapTable>

                <div className="container" style={styles.fStyle}>
                    <div className="row justify-content-md-center">

                        <SheetJSApp dataHandler={this.handleData} />
                        
                        <div className="col-sm-2">
                            <button className="btn btn-primary"><a href={ "http://localhost:8081/gclportal/api/workorder/exportworkorder?workOrderId=" + this.props.workOrderId} target="_blank">Export</a></button>
                        </div>

                        <div className="col-sm-2">
                            <div className="form-group">
                                <button className="btn btn-success" onClick={this.completeWorkOrder}>Completed</button>
                            </div>
                        </div>



                    </div>
                </div>
            </div >
        );
    }
}


export default PaginationTable;  