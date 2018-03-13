import React from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
// import Workbook from 'react-excel-workbook';

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

addProducts(5);

class SearchPagination extends React.Component {
    // constructor(props) {     super(props); }

    /* componentWillReceiveProps(newProps) {
         if (newProps.submittedData === '') {
             return;
         }
         // console.log("inside the table:" + newProps.submittedData.barcode);
         products.push({
             id: products.length,
             barcode: newProps.submittedData.barcode,
             sampleType: newProps.submittedData.sampleType,
             volume: newProps.submittedData.volume,
             uom: newProps.submittedData.uom,
             sponser: newProps.submittedData.sponser,
             study: newProps.submittedData.study
         });
     } */

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
                    value: products.length
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
            paginationPosition: 'bottom',

            // deleteBtn: this.createCustomDeleteButton default is bottom, top and both is
            // all available hideSizePerPage: true // You can hide the dropdown for
            // sizePerPage alwaysShowAllBtns: true // Always show next and previous button
            // withFirstAndLast: false > Hide the going to First and Last page button
        };

        const selectRowProp = {
            mode: 'checkbox',
            bgColor: 'rgba(244, 65, 54, 0.36)'
        };

        return (
            <div style={styles.pagebutton}>
                <BootstrapTable
                    data={products}
                    options={options}
                    pagination
                    deleteRow={true}
                    selectRow={selectRowProp}
                    trStyle={styles.tdStyle}
                    headerStyle={styles.thStyle}>
                    <TableHeaderColumn width="39" dataField='id' isKey={true}>#</TableHeaderColumn>
                    <TableHeaderColumn dataField='barcode'>Parent Barcode</TableHeaderColumn>
                    <TableHeaderColumn dataField='sampleType'>Sample Type</TableHeaderColumn>
                    <TableHeaderColumn dataField='volume'>Volume</TableHeaderColumn>
                    <TableHeaderColumn dataField='uom'>UOM</TableHeaderColumn>
                    <TableHeaderColumn dataField='sponser'>Sponser</TableHeaderColumn>
                    <TableHeaderColumn dataField='study'>Study</TableHeaderColumn>
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
