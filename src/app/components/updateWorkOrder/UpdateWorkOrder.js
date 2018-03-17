import React, {Component} from 'react';
import './update.css';
import Header from "../header/Header";
import {BootstrapTable, TableHeaderColumn} from "react-bootstrap-table";

class UpdateWorkOrder extends Component {
     constructor(props) {
         super(props);
         this.state = {
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
                                <input type="text" className="form-control form-control-sm" defaultValue={this.props.match.params.workOrderId}></input>
                            </div>
                            <div className="col-sm-2">
                                <label className="label">Status</label>
                                <input type="text" className="form-control form-control-sm" defaultValue={this.props.match.params.status}></input>
                            </div>
                            <div className="col-sm-1">
                                <label className="label">Total</label>
                                <input type="text" className="form-control form-control-sm"></input>
                            </div>

                        </div>
                    </form>


                    <BootstrapTable
                        data={this.state.products}
                        options={options}
                        pagination
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
                </div>

                <div className="container" style={styles.fStyle}>
                    <div className="row justify-content-md-center">
                        <div className="col-sm-2">
                            <button className="btn btn-primary">Complete</button>
                        </div>
                        <div className="col-sm-2">
                            <button className="btn btn-primary">Export</button>
                        </div>
                        <div className="col-sm-2">
                            <button className="btn btn-primary">Cancel</button>
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

export default UpdateWorkOrder;