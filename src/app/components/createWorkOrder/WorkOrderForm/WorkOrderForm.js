import React from 'react';
import { formStyles  } from "../Constants";
import axios from 'axios';

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
        this.findBarcodeData = this.findBarcodeData.bind(this);
    }

    componentWillReceiveProps(newProps) {
        if(newProps.items!==this.state.items){
            this.setState({ items : newProps.items});
        }

    }

    saveWorkOrder = (barcode) => {
        console.log('here');
        axios({
            method: 'post', url: 'http://localhost:8081/gclportal/api/workorder/saveWorkOrder', data :  {barCodes : ['A72260415J0'] }
        }).then((res)=> {
            console.log(res.data);
        }, (error)=>{
            console.log(error);
        })
    };
    onFormSubmit(event){
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
        this.saveWorkOrder(this.state.barcode);
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

    findBarcodeData = (barcode) => {
        axios.get('http://xtest3.ppdi.com/gclportal/api/workorder/barcodedata?barcode=' + barcode)
            .then( (res) => {
                    this.setState({
                        sampleType: res.data.sampleType,
                        volume: res.data.sampleVolume,
                        uom: res.data.uom,
                        sponsor: res.data.sponsor,
                        study: res.data.studyCode
                    })
                },
                (error) => {console.log(error)});
    };

    handleChange(event) {
        if(event.target.id === 'barcode') {
            this.findBarcodeData(event.target.value);
        }
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