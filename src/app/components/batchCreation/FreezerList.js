import React, {Component} from 'react';
import LiveSearch from "../searchWorkOrder/LiveSearch";
import axios from 'axios';
let freezerData={};
class FreezerList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            livefreezerData: [],
            freezer: []
        };
        this.notifyParent = this.notifyParent.bind(this);
    }

    notifyParent = function (name, selectedField) {
        for (let i = 0; i < this.state.livefreezerData.length; i++) {
            if (selectedField[0] === this.state.livefreezerData[i].name) {
                freezerData.id = this.state.livefreezerData[i].id;
                freezerData.name = selectedField[0];
            }
        }
        this.props.getSelectedFreezerData(freezerData);
    };

    componentWillReceiveProps(newProps) {
        if (!!newProps.freezerLocationId) {
            axios.get('http://localhost:8081/gclportal/api/freezers/' + newProps.freezerLocationId)
                .then((res) => {
                    console.log(res.data);
                    let freezer = [];
                    for (let i = 0; i < res.data.length; i++) {
                        freezer.push(res.data[i].name);
                    }
                    this.setState({
                        livefreezerData: res.data,
                        freezer
                    });
                }, (err) => {
                    console.log(err);
                });
        }
    }

    render() {
        return (
            <div className="form-inline">
                <label className="col-sm-4 col-form-label" style={styles.label}>Freezer</label>
                <div className="col-sm-5">
                    <LiveSearch
                        liveSearchData={this.state.freezer}
                        notifyParent={this.notifyParent}
                        liveSearchDataResponse="freezer"/>
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
export default FreezerList;