import React from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import './SearchPagination.css';

let isStatusFlag = [false, false, false, false, false];
let selectedRows = [];

class SearchPagination extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            products : [{
                id : 0,
                workOrderId: 'Item Name 1',
                createDate: '02/02/2011',
                status: 'Created',
                sponsor: 'kk',
                parentSamples : 'abc',
                createdBy : 'Amer',
                aliquot : 'xyz' },
                {
                    id : 1,
                    workOrderId: 'Item Name 1',
                    createDate: '02/02/2011',
                    status: 'Created',
                    sponsor: 'kk',
                    parentSamples : 'abc',
                    createdBy : 'Amer',
                    aliquot : 'xyz' },
                {
                    id : 2,
                    workOrderId: 'Item Name 2',
                    createDate: '03/12/2018',
                    status: 'In Progress',
                    sponsor: 'kk',
                    parentSamples : 'abc',
                    createdBy : 'Amer',
                    aliquot : 'xyz' },
                {
                    id : 3,
                    workOrderId: 'Item Name 3',
                    createDate: '04/02/2011',
                    status: 'Completed',
                    sponsor: 'kk',
                    parentSamples : 'abc',
                    createdBy : 'Amer',
                    aliquot : 'xyz' },
                {
                    id : 4,
                    workOrderId: 'Item Name 4',
                    createDate: '02/02/2011',
                    status: 'Cancelled',
                    sponsor: 'kk',
                    parentSamples : 'abc',
                    createdBy : 'Amer',
                    aliquot : 'xyz'
                }]
    }
    }

    onRowSelect = (row, isSelected, e) => {
        if(isSelected) {
            selectedRows.push(row);
        } else {
            selectedRows.splice(selectedRows.indexOf(row),1);
        }
        if(selectedRows.length > 0) {
           for(let i=0;i<selectedRows.length;i++) {
               if((selectedRows[i].status === 'Created') || (selectedRows[i].status === 'In Progress')) {
                   isStatusFlag[0] = isStatusFlag[1]= true;
                   isStatusFlag[2] = isStatusFlag[3] = isStatusFlag[4] = false;
               } else {
                   isStatusFlag[1] = isStatusFlag[2]= isStatusFlag[3] = isStatusFlag[4]= true;
                   isStatusFlag[0] = false;
               }
           }
        } else {
            isStatusFlag[0] = isStatusFlag[1] = isStatusFlag[2]= isStatusFlag[3] = isStatusFlag[4]= false;
        }
        this.props.handleExportSelectedRows(selectedRows);
        this.props.handleStatusChange(isStatusFlag);
    };

     onSelectAll = (isSelected, selectedRows) => {
            if (isSelected) {
                for(let i=0;i<selectedRows.length;i++) {
                    if((selectedRows[i].status === 'Created') || (selectedRows[i].status === 'In Progress')) {
                        isStatusFlag[0] = isStatusFlag[1]= true;
                        isStatusFlag[2] = isStatusFlag[3] = isStatusFlag[4] = false;
                    } else  if((selectedRows[i].status === 'Completed') || ((selectedRows[i].status === 'Cancelled'))) {
                        isStatusFlag[1] = isStatusFlag[2]= isStatusFlag[3] = isStatusFlag[4]= true;
                        isStatusFlag[0] = false;
                    }
                }
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
                    data={this.state.products}
                    options={options}
                    pagination
                    selectRow={selectRowProp}
                    trStyle={styles.tdStyle}
                    headerStyle={styles.thStyle}>
                    <TableHeaderColumn width="39" dataField='id' isKey={true}>#</TableHeaderColumn>
                    <TableHeaderColumn ref='workOrderIdCol'dataField='workOrderId' dataSort={true} filter={ { type: 'TextFilter', placeholder:"Enter" } }>Work Order Id</TableHeaderColumn>
                    <TableHeaderColumn dataField='createDate' dataSort={true} filter={ { type: 'TextFilter', placeholder:"Enter" } }>Create Date</TableHeaderColumn>
                    <TableHeaderColumn dataField='status' filter={ { type: 'TextFilter', placeholder:"Enter" } }>Status</TableHeaderColumn>
                    <TableHeaderColumn dataField='sponsor' filter={ { type: 'TextFilter', placeholder:"Enter" } }>Sponsor</TableHeaderColumn>
                    <TableHeaderColumn dataField='parentSamples' tdStyle={ { whiteSpace: 'normal' } } filter={ { type: 'TextFilter', placeholder:"Enter" } }>Total # of Parent Sameples</TableHeaderColumn>
                    <TableHeaderColumn dataField='createdBy' filter={ { type: 'TextFilter', placeholder:"Enter" } }>Created By</TableHeaderColumn>
                    <TableHeaderColumn dataField='aliquot' filter={ { type: 'TextFilter', placeholder:"Enter" } }>Total # of Aliquot</TableHeaderColumn>
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
