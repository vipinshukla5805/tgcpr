import React, {Component} from 'react';
import LiveSearch from "../searchWorkOrder/LiveSearch";
import axios from 'axios';
let freezerBoxData={};
class FreezerBoxList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            livefreezerBoxData: [],
            freezerBox: []
        };
        this.notifyParent = this.notifyParent.bind(this);
    }

    notifyParent = function (name, selectedField) {
        for (let i = 0; i < this.state.livefreezerBoxData.length; i++) {
            if (selectedField[0] === this.state.livefreezerBoxData[i].name) {
                freezerBoxData.id = this.state.livefreezerBoxData[i].id;
            }
        }
        freezerBoxData.name = selectedField[0];
        this.props.getSelectedFreezerBoxData(freezerBoxData);
    };

    componentWillReceiveProps(newProps) {
        if (!!newProps.freezerRackId) {
            axios.post('http://localhost:8081/gclportal/api/freezerbox',
                [newProps.freezerRackId]
            )
                .then((res) => {
                    console.log(res.data);
                    let freezerBox = [];
                    for (let i = 0; i < res.data.length; i++) {
                        freezerBox.push(res.data[i].name);
                    }
                    this.setState({
                        livefreezerBoxData: res.data,
                        freezerBox
                    });
                }, (err) => {
                    console.log(err);
                });
        }
    }

    render() {
        return (
            <div className="form-inline">
                <label className="col-sm-4 col-form-label" style={styles.label}>Freezer Box</label>
                <div className="col-sm-5">
                    <LiveSearch
                        liveSearchData={this.state.freezerBox}
                        notifyParent={this.notifyParent}
                        liveSearchDataResponse="freezerBox"/>
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

export default FreezerBoxList;