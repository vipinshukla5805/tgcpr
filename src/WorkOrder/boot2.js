import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import './../../node_modules/react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import './../../node_modules/react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import Workbook from 'react-excel-workbook';

const products = [];

function addProducts(quantity) {
    const startId = products.length;
    for (let i = 0; i < quantity; i++) {
        const id = startId + i;
        products.push({
            id: id,
            barcode: 'Item name ' + id,
            sampleType: 2100 + i

        });
    }
}

addProducts(200);

class PaginationTable extends React.Component {

    /* componentWillReceiveProps(newProps) {
     console.log(newProps.submittedData);
     if (!!newProps.submittedData) {
     products.push({
     id: products.length,
     barcode: newProps.submittedData.barcode,
     sampleType: newProps.submittedData.sampleType,
     volume: newProps.submittedData.volume,
     uom: newProps.submittedData.uom,
     sponser: newProps.submittedData.sponser,
     study: newProps.submittedData.study
     });
     }
     // console.log("inside the table:" + newProps.submittedData.barcode);

     } */



    render() {

        const columns = [{
            dataField: 'id',
            text: '#'
        }, {
            dataField: 'barcode',
            text: 'Parent Barcode'
        }, {
            dataField: 'sampleType',
            text: 'Sample Type'
        },  {
            dataField: 'volume',
            text: 'Volume'
        }, {
            dataField: 'uom',
            text: 'UOM'
        },  {
            dataField: 'sponser',
            text: 'Sponser'
        }, {
            dataField: 'study',
            text: 'Study'
        }];

        const pagination = paginationFactory({
            page: 0,  // which page you want to show as default
            sizePerPageList: [{
                text: '5', value: 5
            }, {
                text: '10', value: 10
            }, {
                text: 'All', value: products.length
            }], // you can change the dropdown list for size per page
            sizePerPage: 5,  // which size per page you want to locate as default
            pageStartIndex: 0, // where to start counting the pages
            paginationSize: 3,  // the pagination bar size.
            prePage: 'Prev', // Previous page button text
            nextPage: 'Next', // Next page button text
            firstPage: 'First', // First page button text
            lastPage: 'Last', // Last page button text
            paginationShowsTotal: this.renderShowsTotal,  // Accept bool or function
            paginationPosition: 'bottom',
            //deleteBtn: this.createCustomDeleteButton
            //afterDeleteRow: this.onAfterDeleteRow
            // afterDeleteRow: onAfterDeleteRow
            // default is bottom, top and both is all available
            // hideSizePerPage: true // You can hide the dropdown for sizePerPage
            // alwaysShowAllBtns: true // Always show next and previous button
            // withFirstAndLast: false > Hide the going to First and Last page button
        });
        const selectRow = {
            mode: 'checkbox',
            bgColor: 'rgba(244, 65, 54, 0.36)',
        };
        return (
            <div style={styles.pagebutton}>
                <BootstrapTable
                    keyField='id'
                    deleteRow={true}
                    data={ products }
                    columns={ columns }
                    pagination={ pagination }
                    selectRow={ selectRow }
                    trStyle={styles.tdStyle}
                    headerStyle={styles.thStyle}
                />
                <div className="container" style={styles.fStyle}>
                    <div className="row justify-content-md-center">
                        <div className="btn btn-primary btn-file">
                            <input type="file" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" />Import File
                        </div>
                        <div className="col-sm-2 text-center">
                            <Workbook filename="example.xlsx" element={<button className="btn btn-primary">Export</button>}>
                                <Workbook.Sheet data={products} name="Sheet A">
                                    <Workbook.Column label="Foo" value="name" />
                                    <Workbook.Column label="Bar" value="price" />
                                </Workbook.Sheet>

                            </Workbook>
                        </div>
                        <div className="col-sm-2">
                            <div className="form-group">
                                <button className="btn btn-success">Completed</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div >
        );
    }
}

const styles = ({
    // button style for dropdown list for size per page
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
        backgroundColor: 'darkgrey'
    },

    //Bottom Container style
    fStyle: {
        marginTop: '40px'
    }
});

export default PaginationTable;