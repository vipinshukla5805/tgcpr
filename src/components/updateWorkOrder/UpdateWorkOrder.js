import React, {Component} from 'react';
import './update.css';

class UpdateWorkOrder extends Component {
    // constructor(props) {     super(props); }

    render() {
        return (
            <div>
                <div className="jumbotron">
                    <h4 className="w3-bar w3-left">PCR Aliquot Services- Update Work Order</h4>
                </div>

                <div className="container">
                    <form >
                        <div className="row">
                            <div className="col-sm-2">
                                <label className="label">Total</label>
                                <input type="text" className="form-control form-control-sm"></input>
                            </div>
                            <div className="col-sm-2">
                                <label className="label">Status</label>
                                <input type="text" className="form-control form-control-sm"></input>
                            </div>
                            <div className="col-sm-1">
                                <label className="label">Total</label>
                                <input type="text" className="form-control form-control-sm"></input>
                            </div>

                        </div>
                    </form>
                </div>

                <div className="container" style={styles.fStyle}>
                    <div className="row justify-content-md-center">
                        <div className="col-sm-2">
                            <button className="btn btn-primary">Complete</button>
                        </div>
                        <div className="col-sm-2">
                            <button className="btn btn-primary">Export</button>
                        </div>
                        <div className="col-sm-2">
                            <button className="btn btn-primary">Cancel</button>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

const styles = ({
    //Bottom Container style
    fStyle: {
        marginTop: '35px'
    }
});

export default UpdateWorkOrder;