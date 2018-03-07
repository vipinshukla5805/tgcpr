import React from 'react';
import {BootstrapTable, DeleteButton, TableHeaderColumn} from 'react-bootstrap-table';
import './../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import Workbook from 'react-excel-workbook';
import XLSX from 'xlsx';
import SheetJSApp from "./ImportData";


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

addProducts(4);


class PaginationTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          submittedData : props.submittedData,
          DataFromXlsx : ''
        };
        this.onAfterDeleteRow = this.onAfterDeleteRow.bind(this);
        this.handleData = this.handleData.bind(this);
    }

    handleData(data) {
        console.log(data);
        this.setState({
            DataFromXlsx : data
        });
        let newAddedData = [];
       for (var i=1; i< this.state.DataFromXlsx.length;i++) {
             newAddedData.push({
                    id : newAddedData.length,
                    barcode: this.state.DataFromXlsx[i][0],
                    sampleType:this.state.DataFromXlsx[i][1],
                    uom : this.state.DataFromXlsx[i][2],
                    sponser : this.state.DataFromXlsx[i][3],
                    study: this.state.DataFromXlsx[i][4]
                })
       }

       this.setState({
           submittedData : newAddedData
       })
    }
    componentWillReceiveProps(newProps) {
        console.log("Got props");
        console.log(newProps);
        if(newProps.submittedData!==this.state.submittedData){
            this.setState({submittedData:newProps.submittedData});
        }
        // console.log("inside the table:" + newProps.submittedData.barcode);

    }

    onAfterDeleteRow = (rowKeys) => {
        //alert('The rowkey you drop: ' + rowKeys);
        this.state.submittedData.splice(rowKeys[0],rowKeys.length);
        this.state.submittedData.map((data,index) => {
            return data.id = index;
        });

    };

    onAfterInsertRow = (rowKeys) => {
        //alert('The rowkey you drop: ' + rowKeys);
        console.log(rowKeys);
       // this.state.submittedData.splice(rowKeys[0],rowKeys.length);

       // this.state.submittedData.map((data,index) => {
       //     return data.id = index;
       // })
    };

    ExcelToJSON = function() {

    this.parseExcel = function(file) {
        var reader = new FileReader();

        reader.onload = function(e) {
            var data = e.target.result();
            var workbook = XLSX.read(data, {
                type: 'binary'
            });

            workbook.SheetNames.forEach(function(sheetName) {
                // Here is your object
                var XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
                var json_object = JSON.stringify(XL_row_object);
                console.log(json_object);

            })

        };

        reader.onerror = function(ex) {
            console.log(ex);
        };

        reader.readAsBinaryString(file);
    };
};

    render() {
        const options = {
            page: 1,  // which page you want to show as default
            sizePerPageList: [{
                text: '5', value: 5
            }, {
                text: '10', value: 10
            }, {
                text: 'All', value: products.length
            }], // you can change the dropdown list for size per page
            sizePerPage: 5,  // which size per page you want to locate as default
            pageStartIndex: 1, // where to start counting the pages
            paginationSize: 3,  // the pagination bar size.
            prePage: 'Prev', // Previous page button text
            nextPage: 'Next', // Next page button text
            firstPage: 'First', // First page button text
            lastPage: 'Last', // Last page button text
            paginationShowsTotal: this.renderShowsTotal,  // Accept bool or function
            paginationPosition: 'bottom',
           // deleteBtn: this.createCustomDeleteButton,
            afterDeleteRow: this.onAfterDeleteRow,
            afterInsertRow: this.onAfterInsertRow
            // afterDeleteRow: onAfterDeleteRow
            // default is bottom, top and both is all available
            // hideSizePerPage: true // You can hide the dropdown for sizePerPage
            // alwaysShowAllBtns: true // Always show next and previous button
            // withFirstAndLast: false > Hide the going to First and Last page button
        };
        const selectRowProp = {
            mode: 'checkbox',
            bgColor: 'rgba(244, 65, 54, 0.36)'
            //onSelect: onRowSelect,
            //onSelectAll: onSelectAll

        };
        return (
            <div style={styles.pagebutton}>
                <BootstrapTable
                    data={this.state.submittedData}
                    options={options}
                    pagination
                    deleteRow
                    insertRow
                    selectRow={selectRowProp}
                    trStyle={styles.tdStyle}
                    headerStyle={styles.thStyle}
                >
                    <TableHeaderColumn width="39" dataField='id' isKey={ true }>#</TableHeaderColumn>
                    <TableHeaderColumn dataField='barcode'>Parent Barcode</TableHeaderColumn>
                    <TableHeaderColumn dataField='sampleType'>Sample Type</TableHeaderColumn>
                    <TableHeaderColumn dataField='volume'>Volume</TableHeaderColumn>
                    <TableHeaderColumn dataField='uom'>UOM</TableHeaderColumn>
                    <TableHeaderColumn dataField='sponser'>Sponser</TableHeaderColumn>
                    <TableHeaderColumn dataField='study'>Study</TableHeaderColumn>
                </BootstrapTable>

                <div className="container" style={styles.fStyle}>
                    <div className="row justify-content-md-center">

                        <SheetJSApp dataHandler={this.handleData}/>

                        <div className="col-sm-2 text-center">
                            <Workbook filename="Aliquot-Services-Data.xlsx" element={<button className="btn btn-primary">Export</button>}>
                                <Workbook.Sheet data={this.state.submittedData} name="Sheet A">
                                    <Workbook.Column label="Barcode" value="barcode"  />
                                    <Workbook.Column label="Sample Type"  value="sampleType"/>
                                    <Workbook.Column label="UOM"  value="uom"/>
                                    <Workbook.Column label="Sponcer"  value="sponser"/>
                                    <Workbook.Column label="Study"  value="study"/>
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