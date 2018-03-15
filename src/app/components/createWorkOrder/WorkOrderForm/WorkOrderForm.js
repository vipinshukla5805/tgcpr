import React from 'react';
import { formStyles  } from "../Constants";

const checkBarcode = [{"barcode":"kkkkk","sampleType":"Serum","sponsor":"Merck Sharp & Dohme Corp., NJ, USA","uom":"123","studyCode":"MERK0026","volumeUnit":"123","status":null}];
export default class WorkOrderForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		      items: props.items,
		      barcode: '',
		      sampleType: '',
		      volume: '',
		      uom: '',
		      sponsor: '',
		      study: '',
		      submittedData: ''
         };
        this.onFormSubmit = this.onFormSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

     componentWillReceiveProps(newProps) {
        if(newProps.items!==this.state.items){
            this.setState({ items : newProps.items});
        }
         
    }

	 onFormSubmit(event) {
	 	event.preventDefault();
       let items = [...this.state.items];
       var isBarcodePresent = true;
       for(let i=0;i<items.length;i++) {
          if(items[i].barcode === this.state.barcode) {
        	  alert("Parent Barcode is already present in table. Check row " + (i+1));
            	isBarcodePresent=false;
           }
        }

      if (isBarcodePresent) {

         items.push({id:items.length +1 ,
                    barcode: this.state.barcode,
                    sampleType: this.state.sampleType,
                    volume: this.state.volume,
                    uom: this.state.uom,
                    sponsor: this.state.sponsor,
                    study: this.state.study
         });
      }
     
    this.setState({
          items,
          barcode: '',
          sampleType: '',
          volume: '',
          uom: '',
          sponsor: '',
          study: '',
          submittedData: ''
      });
     this.props.getFormItems(items);
  }

    findBarcodeData = (event) => {
	  if(event.target.value === checkBarcode[0].barcode) {
	      this.setState({
              barcode: checkBarcode[0].barcode,
              sampleType:checkBarcode[0].sampleType,
              volume: checkBarcode[0].volumeUnit,
              uom: checkBarcode[0].uom,
              sponsor: checkBarcode[0].sponsor,
              study: checkBarcode[0].studyCode,
              submittedData: ''
          });
      } else {
          this.setState({
              sampleType: '',
              volume: '',
              uom: '',
              sponsor: '',
              study: '',
              submittedData: ''
          });
      }
    };

   handleChange(event) {
	    this.setState({
	      [event.target.id]: event.target.value
	    });
	  }

	render() {
		return (
			<form onSubmit={this.onFormSubmit}>
	            <div className="row">
	              <div className="col-sm-2">
	                <div className="form-group required">
	                  <label className="control-label">Scan Parent Barcode</label>
	                  <input style={formStyles.barcodeColor} type="text" className="form-control form-control-sm"
	                    id="barcode" value={this.state.barcode} onChange={this.handleChange} onKeyUp={this.findBarcodeData} placeholder="" required>
	                  </input>
	                </div>

	              </div>
	              <div className="col-sm-2">
	                <div className="form-group required">
	                  <label className="control-label">Sample Type</label>
	                  <input type="text" className="form-control form-control-sm"
	                    id="sampleType" value={this.state.sampleType} onChange={this.handleChange} placeholder="" required>
	                  </input>
	                </div>

	              </div>
	              <div className="col-sm-1">
	                <div className="form-group required">
	                  <label className="control-label">Volume</label>
	                  <input type="text" className="form-control form-control-sm"
	                    id="volume" value={this.state.volume} onChange={this.handleChange} placeholder="" required>
	                  </input>
	                </div>

	              </div>
	              <div className="col-sm-1">
	                <div className="form-group required">
	                  <label className="control-label">UOM</label>
	                  <input type="text" className="form-control form-control-sm"
	                    id="uom" value={this.state.uom} onChange={this.handleChange} placeholder="" required>
	                  </input>
	                </div>

	              </div> <div className="col-sm-2">
	                <div className="form-group required">
	                  <label className="control-label">Sponsor</label>
	                  <input type="text" className="form-control form-control-sm"
	                    id="sponsor" value={this.state.sponsor} onChange={this.handleChange} placeholder="" required>
	                  </input>
	                </div>

	              </div>
	              <div className="col-sm-2">
	                <div className="form-group required">
	                  <label className="control-label">Study</label>
	                  <input type="text" className="form-control form-control-sm"
	                    id="study" value={this.state.study} onChange={this.handleChange} placeholder="" required>
	                  </input>
	                </div>

	              </div>
	              <div className="col-sm-1">
	                <div className="form-group">
	                  <label>Total</label>
	                  <input type="text" className="form-control form-control-sm" value={this.state.items.length} disabled={true}>
	                  </input>
	                </div>

	              </div>
	              <div className="col-sm-1">
	                <div className="form-group">
	                  <button className="default" type="submit" >Enter
	                  </button>
	                </div>

			       </div>
			      </div>
			    </form>

			)
	}
}