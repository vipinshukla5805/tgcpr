import React, { Component } from 'react';
import PaginationTable from './PaginationTable';
import './CreateWorkOrder.css';

class CreateWorkOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items:[],
      barcode: '',
      sampleType: '',
      volume: '',
      uom: '',
      sponser: '',
      study: '',
      submittedData: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  handleChange(event) {
      console.log(this.state.items);
    this.setState({
      [event.target.id]: event.target.value
    });
      console.log(this.state.items);
  }

  onFormSubmit(event) {
      console.log("form submition");
      let items = [...this.state.items];
      items.push({id:items.length,
          barcode: this.state.barcode,
          sampleType: this.state.sampleType,
          volume: this.state.volume,
          uom: this.state.uom,
          sponser: this.state.sponser,
          study: this.state.study
      });
    //const submittedData = { ...this.state };
    //console.log(event.target);
    //this.setState({
    //  submittedData
    //});

      this.setState({
          items,
          barcode: '',
          sampleType: '',
          volume: '',
          uom: '',
          sponser: '',
          study: '',
          submittedData: ''
      });
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <div className="jumbotron">
          <h4 className="w3-bar w3-left">PCR Aliquot Services-Create Work Order</h4>
        </div>
        <div className="container">
          <form onSubmit={this.onFormSubmit}>
            <div className="row">
              <div className="col-sm-2">
                <div className="form-group required">
                  <label className="control-label">Scan Parent Barcode</label>
                  <input style={styles.color} type="text" className="form-control form-control-sm"
                    id="barcode" value={this.state.barcode} onChange={this.handleChange} placeholder="" required>
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
                  <label className="control-label">Sponser</label>
                  <input type="text" className="form-control form-control-sm"
                    id="sponser" value={this.state.sponser} onChange={this.handleChange} placeholder="" required>
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
        </div>

        <div className="container">
          <PaginationTable submittedData={this.state.items} />
        </div>

      </div>
    );
  }
}

const styles = ({
  // background color for scan barcode text box
  color: {
    backgroundColor: '#ffff00a6'
  }
});

export default CreateWorkOrder;