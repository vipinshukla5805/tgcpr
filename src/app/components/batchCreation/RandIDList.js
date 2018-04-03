import React, {Component} from 'react';
import LiveSearch from "../searchWorkOrder/LiveSearch";
import axios from 'axios';
let randId;
class RandIDList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            liveRandIDData: [],
            RandID: []
        };
        this.notifyParent = this.notifyParent.bind(this);
    }

    notifyParent = function (name, selectedField) {
        for (let i = 0; i < this.state.liveRandIDData.length; i++) {
            if (selectedField[0] === this.state.liveRandIDData[i].name) {
                randId = this.state.liveRandIDData[i].id;
            }
        }
        this.props.getSelectedRandID_Id(randId);
    };

    componentWillReceiveProps(newProps) {
        if (!!newProps.studyId) {
            axios.post('http://localhost:8081/gclportal/api/randIDs',
                [newProps.studyId]
            )
                .then((res) => {
                    console.log(res.data);
                    let RandID = [];
                    for (let i = 0; i < res.data.AllRows.length; i++) {
                        RandID.push(res.data.AllRows[i].name);
                    }
                    this.setState({
                        liveRandIDData: res.data.AllRows,
                        RandID
                    });
                }, (err) => {
                    console.log(err);
                });
        }
    }

    render() {
        return (
            <div className="form-inline">
                <label className="col-sm-4 col-form-label" style={styles.label}>RandID</label>
                <div className="col-sm-5">
                    <LiveSearch
                        liveSearchData={this.state.RandID}
                        notifyParent={this.notifyParent}
                        liveSearchDataResponse="RandID"/>
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
export default RandIDList;