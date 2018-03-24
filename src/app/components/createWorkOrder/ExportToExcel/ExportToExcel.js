import React from 'react';
import Workbook from 'react-excel-workbook';


class ExportToExcel extends React.Component{

	render() {
		return (
 				<div className="col-sm-2 text-center">
                            <Workbook filename="Aliquot-Services-Data.xlsx" element={<button className="btn btn-primary">Export</button>}>
                                <Workbook.Sheet data={this.props.exportedData} name="Sheet A">
                                    <Workbook.Column label="Barcode" value="barcode"  />
                                    <Workbook.Column label="Sample Type"  value="sampleType"/>
                                    <Workbook.Column label="Volume"  value="sampleType"/>
                                    <Workbook.Column label="UOM"  value="uom"/>
                                    <Workbook.Column label="Sponsor"  value="sponsor"/>
                                    <Workbook.Column label="Study"  value="study"/>
                                </Workbook.Sheet>
                             </Workbook>
                  </div>

		);
	};
}

export default ExportToExcel;