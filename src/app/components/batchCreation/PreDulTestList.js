import React, {Component} from 'react';
import LiveSearch from "../searchWorkOrder/LiveSearch";
import axios from 'axios';
let preDulId;
class PreDulTestList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            livePreDulTestData: [],
            PreDulTest: []
        };
        this.notifyParent = this.notifyParent.bind(this);
    }

    notifyParent = function (name, selectedField) {
        for (let i = 0; i < this.state.livePreDulTestData.length; i++) {
            if (selectedField[0] === this.state.livePreDulTestData[i].name) {
                preDulId = this.state.livePreDulTestData[i].id;
            }
        }
        this.props.getSelectedPreDulTestId(preDulId);
    };

    componentWillReceiveProps(newProps) {
        if (!!newProps.studyId) {
            axios.post('http://localhost:8081/gclportal/api/dilutions',
                [newProps.studyId]
            )
                .then((res) => {
                    console.log(res.data);
                    let PreDulTest = [];
                    for (let i = 0; i < res.data.length; i++) {
                        PreDulTest.push(res.data[i].name);
                    }
                    this.setState({
                        livePreDulTestData: res.data,
                        PreDulTest
                    });
                }, (err) => {
                    console.log(err);
                });
        }
    }

    render() {
        return (
            <div className="form-inline">
                <label className="col-sm-4 col-form-label" style={styles.label}>Pre-Dilution of Test</label>
                <div className="col-sm-5">
                    <LiveSearch
                        liveSearchData={this.state.PreDulTest}
                        notifyParent={this.notifyParent}
                        liveSearchDataResponse="PreDulTest"/>
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
export default PreDulTestList;