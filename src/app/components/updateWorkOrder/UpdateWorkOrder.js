import React, {Component} from 'react';
import './update.css';
import Header from "../header/Header";
import {BootstrapTable, TableHeaderColumn} from "react-bootstrap-table";
import ExportToExcel from "../createWorkOrder/ExportToExcel/ExportToExcel";
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/scale.css';

class UpdateWorkOrder extends Component {
     constructor(props) {
         super(props);
         this.changeStatusToCompleted = this.changeStatusToCompleted.bind(this);
         this.state = {
             status : props.match.params.status,
             workOrderId : props.match.params.workOrderId,
             products: [{
                 id: 0,
                 barcode: 'Item Name 1',
                 sampleType: 'xyz',
                 volume: '10',
                 sponsor: 'kk',
                 uom: 'abc',
                 study: 'Amer'
             }, {
                 id: 1,
                 barcode: 'Item Name 2',
                 sampleType: 'xyz',
                 volume: '10',
                 sponsor: 'kk',
                 uom: 'abc',
                 study: 'Amer'
             },
                 {
                     id: 2,
                     barcode: 'Item Name 3',
                     sampleType: 'xyz',
                     volume: '10',
                     sponsor: 'kk',
                     uom: 'abc',
                     study: 'Amer'
                 }, {
                     id: 4,
                     barcode: 'Item Name 3',
                     sampleType: 'xyz',
                     volume: '10',
                     sponsor: 'kk',
                     uom: 'abc',
                     study: 'Amer'
                 },
                 {
                     id: 5,
                     barcode: 'Item Name 4',
                     sampleType: 'xyz',
                     volume: '10',
                     sponsor: 'kk',
                     uom: 'abc',
                     study: 'Amer'
                 }
             ]
         }
     }

    changeStatusToCompleted = () => {
         if(this.state.status === 'Created' || this.state.status === 'In Progress') {
             this.setState({ status: 'Completed'});
             Alert.info('Status Changed to Completed', {
                 position: 'top-right',
                 effect: 'slide',
                 offset : 80,
                 timeout: 200
             });
         }
    };

    changeStatusToCancelled = () => {
        if(this.state.status === 'Created' || this.state.status === 'In Progress') {
            this.setState({ status: 'Cancelled'});
            Alert.info('Status Changed to Cancelled', {
                position: 'top-right',
                effect: 'slide',
                offset : 80,
                timeout: 2000
            });
        }
    };
    handleChange(event) {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    render() {
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
                                <input type="text" className="form-control form-control-sm" defaultValue={this.state.products.length} disabled={true}></input>
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
                        <TableHeaderColumn dataField='volume'>Volume</TableHeaderColumn>
                        <TableHeaderColumn dataField='uom'>UOM</TableHeaderColumn>
                        <TableHeaderColumn dataField='sponsor'>Sponsor</TableHeaderColumn>
                        <TableHeaderColumn dataField='study'>Study</TableHeaderColumn>
                    </BootstrapTable>
                </div>

                <div className="container" style={styles.fStyle}>
                    <div className="row justify-content-md-center">
                        <div className="col-sm-2">
                            <button className="btn btn-primary" onClick={this.changeStatusToCompleted}>Complete</button>
                        </div>
                        <div className="col-sm-2">
                            <ExportToExcel exportedData={this.state.products} />
                        </div>
                        <div className="col-sm-2">
                            <button className="btn btn-primary" onClick={this.changeStatusToCancelled}>Cancel</button>
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