import React from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import './SearchPagination.css';

let isStatusFlag = [false, false, false, false, false];
let allStatusFlags = [false , false];
let selectedRows = [];
class SearchPagination extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            products : props.products1,
            productData : []
        };
        this.dateFormatter = this.dateFormatter.bind(this);
    }

     dateFormatter = (cell, row) => {
        console.log(cell);
            if (cell === undefined){
                cell = new Date(row.createdDate);
            }
            if (typeof cell !== 'object') {
                cell = new Date(cell);
            }
         return `${('0' + (cell.getMonth() + 1)).slice(-2)}/${('0' + cell.getDate()).slice(-2)}/${cell.getFullYear()}`;
     };

    onRowSelect = (row, isSelected, e) => {
        let statusArray = [];
        if(isSelected) {
            selectedRows.push(row);
        } else {
            selectedRows.splice(selectedRows.indexOf(row),1);
        }
        if(selectedRows.length > 0) {
           for(let i=0;i<selectedRows.length;i++) {
               statusArray.push(selectedRows[i].status);
               if((selectedRows[i].status === 'Created') || (selectedRows[i].status === 'In Progress')) {
                   isStatusFlag[0] = isStatusFlag[1]= true;
                   isStatusFlag[2] = isStatusFlag[3] = isStatusFlag[4] = false;
               } else {
                   isStatusFlag[1] = isStatusFlag[2]= isStatusFlag[3] = isStatusFlag[4]= true;
                   isStatusFlag[0] = false;
               }
           }
            if(((statusArray.includes('Created')) && (statusArray.includes('Cancelled'))) ||
                ((statusArray.includes('In Progress')) && (statusArray.includes('Cancelled'))) ||
                ((statusArray.includes('Created')) && (statusArray.includes('Completed'))) ||
                ((statusArray.includes('In Progress')) && (statusArray.includes('Completed')))) {
                isStatusFlag[0] = isStatusFlag[1] = isStatusFlag[2]= isStatusFlag[3] = isStatusFlag[4]= false;
            }

        } else {
            isStatusFlag[0] = isStatusFlag[1] = isStatusFlag[2]= isStatusFlag[3] = isStatusFlag[4]= false;
        }
        this.props.handleExportSelectedRows(selectedRows);
        this.props.handleStatusChange(isStatusFlag);
    };


     onSelectAll = (isSelected, selectedRows) => {
         let checkStatus = [true,true]
         let statusArray = [];
            if (isSelected) {
                for(let i=0;i<selectedRows.length;i++) {
                    statusArray.push(selectedRows[i].status);
                }
                for (let i=0;i<statusArray.length;i++) {
                    allStatusFlags[0] = ((checkStatus[0] && statusArray[i] === 'Created') || (checkStatus[0] && statusArray[i] === 'In Progress'));
                    if(allStatusFlags[0] === false) {
                        checkStatus[0] = false;
                    }
                }
                for (let i=0;i<statusArray.length;i++) {
                    allStatusFlags[1] = ((checkStatus[1] && statusArray[i] === 'Completed') || (checkStatus[1] && statusArray[i] === 'Cancelled'));
                    if(allStatusFlags[1] === false) {
                        checkStatus[1] = false;
                    }
                }
                if(allStatusFlags[0] === true) {
                    isStatusFlag[0] = isStatusFlag[1]= true;
                    isStatusFlag[2] = isStatusFlag[3] = isStatusFlag[4] = false;
                } else if(allStatusFlags[1] === true) {
                    isStatusFlag[1] = isStatusFlag[2]= isStatusFlag[3] = isStatusFlag[4]= true;
                    isStatusFlag[0] = false;
                } else {
                    isStatusFlag[0] = isStatusFlag[1] = isStatusFlag[2]= isStatusFlag[3] = isStatusFlag[4]= false;
                }
                allStatusFlags = [false, false];
                this.props.handleExportSelectedRows(selectedRows);
            } else {
                isStatusFlag[0] = isStatusFlag[1] = isStatusFlag[2]= isStatusFlag[3] = isStatusFlag[4]= false;
                this.props.handleExportSelectedRows([]);
            }
            this.props.handleStatusChange(isStatusFlag);
     };

    render() {
        const options = {
            page: 1, // which page you want to show as default
            sizePerPageList: [
                {
                    text: '5',
                    value: 5
                }, {
                    text: '10',
                    value: 10
                }, {
                    text: 'All',
                    value: this.state.products.length
                }
            ], // you can change the dropdown list for size per page
            sizePerPage: 5, // which size per page you want to locate as default
            pageStartIndex: 0, // where to start counting the pages
            paginationSize: 3, // the pagination bar size.
            prePage: 'Prev', // Previous page button text
            nextPage: 'Next', // Next page button text
            firstPage: 'First', // First page button text
            lastPage: 'Last', // Last page button text
            paginationShowsTotal: this.renderShowsTotal, // Accept bool or function
            paginationPosition: 'bottom'
        };

        const selectRowProp = {
            mode: 'checkbox',
            bgColor: 'rgba(244, 65, 54, 0.36)',
            onSelect: this.onRowSelect,
            onSelectAll: this.onSelectAll
        };

        return (
            <div style={styles.pagebutton}>
                <BootstrapTable
                    data={this.props.products1}
                    options={options}
                    pagination
                    selectRow={selectRowProp}
                    trStyle={styles.tdStyle}
                    headerStyle={styles.thStyle}>
                    <TableHeaderColumn width="39" dataField='id' isKey={true} hidden={true}>#</TableHeaderColumn>
                    <TableHeaderColumn ref='workOrderIdCol'dataField='workOrderId' dataSort={true} width="13%"filter={ { type: 'TextFilter', placeholder:"Enter" } }>Work Order Id</TableHeaderColumn>
                    <TableHeaderColumn dataField='createDate' dataSort={true} width="18%" dataFormat={ this.dateFormatter } filter={ { type: 'DateFilter' , defaultValue: { comparator: '=' } , placeholder:"dd/mm/yyyy"} }>Create Date</TableHeaderColumn>
                    <TableHeaderColumn dataField='status' width="10%" filter={ { type: 'TextFilter', placeholder:"Enter" } }>Status</TableHeaderColumn>
                    <TableHeaderColumn dataField='sponsor' width="10%" filter={ { type: 'TextFilter', placeholder:"Enter" } }>Sponsor</TableHeaderColumn>
                    <TableHeaderColumn dataField='parentSamples' tdStyle={ { whiteSpace: 'normal' } } width="20%"filter={ { type: 'TextFilter', placeholder:"Enter" } }>Total # of Parent Samples</TableHeaderColumn>
                    <TableHeaderColumn dataField='createdBy' filter={ { type: 'TextFilter', placeholder:"Enter" } }>Created By</TableHeaderColumn>
                    <TableHeaderColumn dataField='aliquot' width="14%" filter={ { type: 'TextFilter', placeholder:"Enter" } }>Total # of Aliquot</TableHeaderColumn>
                </BootstrapTable>
            </div>

        );
    }
}

const styles = ({
    // button style for dropdown list for size per page
    pagebutton: {
        textAlign: 'left',
        marginTop: '20px'
    },

    // table data style
    tdStyle: {
        lineHeight: '14px',
        deleteRow: 'bottom'
    },

    // table header style
    thStyle: {
        textAlign: 'center',
        backgroundColor: '#86278694'
        // #965296c4
    },

    //Bottom Container style fStyle: {     marginTop: '35px' }
});

export default SearchPagination;
