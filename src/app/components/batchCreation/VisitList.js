import React, {Component} from 'react';
import LiveSearch from "../searchWorkOrder/LiveSearch";
import axios from 'axios';
let visitData={};
class VisitList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            liveVisitData: [],
            Visit: []
        };
        this.notifyParent = this.notifyParent.bind(this);
    }

    notifyParent = function (name, selectedField) {
        for (let i = 0; i < this.state.liveVisitData.length; i++) {
            if (selectedField[0] === this.state.liveVisitData[i].name) {
                visitData.id = this.state.liveVisitData[i].id;
                visitData.name=selectedField[0];
            }
        }
        this.props.getSelectedVisitData(visitData);
    };

    componentWillReceiveProps(newProps) {
        if (!!newProps.studyId) {
            axios.post('http://localhost:8081/gclportal/api/visits',
                [newProps.studyId]
            )
                .then((res) => {
                    console.log(res.data);
                    let Visit = [];
                    for (let i = 0; i < res.data.length; i++) {
                        Visit.push(res.data[i].name);
                    }
                    this.setState({
                        liveVisitData: res.data,
                        Visit
                    });
                }, (err) => {
                    console.log(err);
                });
        }
    }

    render() {
        return (
            <div className="form-inline">
                <label className="col-sm-4 col-form-label" style={styles.label}>Visit</label>
                <div className="col-sm-5">
                    <LiveSearch
                        liveSearchData={this.state.Visit}
                        notifyParent={this.notifyParent}
                        liveSearchDataResponse="Visit"/>
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
export default VisitList;