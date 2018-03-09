import React from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import './../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import Workbook from 'react-excel-workbook';
import SheetJSApp from "./ImportData";
import './PaginationTable.css'

 function ImportDataValidation(data, existingTableData) {
    var counter = 0;

    if (data[0][0] === '' || data[0][1] === '' || data[0][2] === '' ||  data[0][3] === ''  || data[0][4] === '' || data[0][5] === '') {
        return { isValid : false, reason : "Header titles are not defined" };
    }

    if (data[0][0].toLowerCase().replace(/ /g,'') !== 'barcode' || 
          data[0][1].toLowerCase().replace(/ /g,'') !== 'sampletype' ||
          data[0][2].toLowerCase().replace(/ /g,'') !== 'volume' ||
           data[0][3].toLowerCase().replace(/ /g,'') !== 'uom' || 
             data[0][4].toLowerCase().replace(/ /g,'') !== 'sponser' ||
               data[0][5].toLowerCase().replace(/ /g,'') !== 'study'
             ) {
          return { isValid : false, reason : "Header titles are not correct. Please Update." };
     }
      
     for(let i=1;i< data.length;i++) {
        if(data[i][0] === '' || data[i][0] === undefined) {
            return { isValid : false, reason : 'Barcode is empty in ' + (i+1) +  ' row of excel' };
        }
      }
     

      for(let i=1;i< data.length;i++) {
         for(let j=1;j<data.length;j++) {
            if (data[i][0] === data[j][0]) {
                    if (counter > 1) {
                         return { isValid : false, reason : "Duplicate Barcodes on " + (j+1) + " and " + (i+1) + " rows"};
                      }
                      counter++;
            }
         }
      }

    for(let i=0; i< existingTableData.length; i++) {
        for(let j=0; j< data.length; j++) {
                if(existingTableData[i].barcode === data[j][0]) {
                   return { isValid : false, reason : "Duplicate Barcodes on " + (i+1) + " row of table and " + (j+1) + " row of sheet"};
                }
        }
     }  

      return { isValid : true, reason : "Data is as expected." };
 }


 var validationResult;

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
        validationResult = ImportDataValidation(data, this.state.submittedData);

        if (validationResult.isValid) {
          this.setState({
              DataFromXlsx : data
           });
        let newAddedData = this.state.submittedData.slice();
         for (var i=1; i< this.state.DataFromXlsx.length;i++) {
             newAddedData.push({
                    id : newAddedData.length +1,
                    barcode: (this.state.DataFromXlsx[i][0]=== '' || this.state.DataFromXlsx[i][0]=== undefined) ? 'N/A' : this.state.DataFromXlsx[i][0] ,
                    volume: (this.state.DataFromXlsx[i][1]=== '' || this.state.DataFromXlsx[i][1]=== undefined) ? 'N/A' : this.state.DataFromXlsx[i][1]  ,
                    sampleType:(this.state.DataFromXlsx[i][2]=== '' || this.state.DataFromXlsx[i][2]=== undefined) ? 'N/A' :  this.state.DataFromXlsx[i][2] ,
                    uom : (this.state.DataFromXlsx[i][3]=== '' || this.state.DataFromXlsx[i][3]=== undefined) ? 'N/A' : this.state.DataFromXlsx[i][3] ,
                    sponser : (this.state.DataFromXlsx[i][4]=== '' || this.state.DataFromXlsx[i][4]=== undefined) ? 'N/A' : this.state.DataFromXlsx[i][4] ,
                    study: (this.state.DataFromXlsx[i][5]=== '' || this.state.DataFromXlsx[i][5]=== undefined) ? 'N/A' : this.state.DataFromXlsx[i][5] 
                })
         }

       this.setState({
           submittedData : newAddedData
       })
       this.props.editSubmittedData(this.state.submittedData);

        }

        else {
            alert(validationResult.reason);
        }
   
    }
    componentWillReceiveProps(newProps) {
        if(newProps.submittedData!==this.state.submittedData){
            this.setState({ submittedData : newProps.submittedData});
        }
         
    }

    onAfterDeleteRow = (rowKeys) => {
        this.state.submittedData.splice(rowKeys[0]-1,rowKeys.length);
        this.state.submittedData.map((data,index) => {
            return data.id = index + 1;
        });
        this.props.editSubmittedData(this.state.submittedData);

    };

     
    
    render() {
        const options = {
            page: 1,  // which page you want to show as default
            sizePerPageList: [{
                text: '5', value: 5
            }, {
                text: '10', value: 10
            }, {
                text: 'All', value: this.state.submittedData.length
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
            afterDeleteRow: this.onAfterDeleteRow
            // afterDeleteRow: onAfterDeleteRow
            // default is bottom, top and both is all available
            // hideSizePerPage: true // You can hide the dropdown for sizePerPage
            // alwaysShowAllBtns: true // Always show next and previous button
            // withFirstAndLast: false > Hide the going to First and Last page button
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
                                    <Workbook.Column label="Volume"  value="sampleType"/>
                                    <Workbook.Column label="UOM"  value="uom"/>
                                    <Workbook.Column label="Sponcer"  value="sponcer"/>
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