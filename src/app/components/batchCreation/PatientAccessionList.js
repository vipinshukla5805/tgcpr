import React, {Component} from 'react';
import LiveSearch from "../searchWorkOrder/LiveSearch";
import axios from 'axios';
let patientId;
class PatientAccessionList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            livePatientAccessionData: [],
            PatientAccession: []
        };
        this.notifyParent = this.notifyParent.bind(this);
    }

    notifyParent = function (name, selectedField) {
        for (let i = 0; i < this.state.livePatientAccessionData.length; i++) {
            if (selectedField[0] === this.state.livePatientAccessionData[i].name) {
                patientId = this.state.livePatientAccessionData[i].id;
            }
        }
        this.props.getSelectedPatientAccessionId(patientId);
    };

    componentWillReceiveProps(newProps) {
        if (!!newProps.studyId) {
            axios.post('http://localhost:8081/gclportal/api/patientAccessions',
                [newProps.studyId]
            )
                .then((res) => {
                    console.log(res.data);
                    let PatientAccession = [];
                    for (let i = 0; i < res.data.AllRows.length; i++) {
                        PatientAccession.push(res.data.AllRows[i].name);
                    }
                    this.setState({
                        livePatientAccessionData: res.data.AllRows,
                        PatientAccession
                    });
                }, (err) => {
                    console.log(err);
                });
        }
    }

    render() {
        return (
            <div className="form-inline">
                <label className="col-sm-4 col-form-label" style={styles.label}>Patient Accession</label>
                <div className="col-sm-5">
                    <LiveSearch
                        liveSearchData={this.state.PatientAccession}
                        notifyParent={this.notifyParent}
                        liveSearchDataResponse="PatientAccession"/>
                </div>
            </div>
        );
    }
}

const styles = ({
    label: {
        justifyContent: 'flex-start'
    }
});
export default PatientAccessionList;