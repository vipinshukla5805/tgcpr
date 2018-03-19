import React from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import '../../../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import SheetJSApp from "../ImportFromExcel/ImportData";
import './PaginationTable.css';
import ExportToExcel from "../ExportToExcel/ExportToExcel";
import { ImportDataValidation } from "../Helpers";
import { styles  } from "../Constants";


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
                    sponsor : (this.state.DataFromXlsx[i][4]=== '' || this.state.DataFromXlsx[i][4]=== undefined) ? 'N/A' : this.state.DataFromXlsx[i][4] ,
                    study: (this.state.DataFromXlsx[i][5]=== '' || this.state.DataFromXlsx[i][5]=== undefined) ? 'N/A' : this.state.DataFromXlsx[i][5]
                })
         }

       this.setState({
           submittedData : newAddedData
       });
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
                    page: 1,  
                    sizePerPageList: [{
                        text: '5', value: 5
                    }, {
                        text: '10', value: 10
                    }, {
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

                        <ExportToExcel exportedData={this.state.submittedData} />


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


export default PaginationTable;  