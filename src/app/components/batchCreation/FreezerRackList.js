import React, {Component} from 'react';
import LiveSearch from "../searchWorkOrder/LiveSearch";
import axios from 'axios';
let freezerRackId;
class FreezerRackList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            livefreezerRackData: [],
            freezerRack: []
        };
        this.notifyParent = this.notifyParent.bind(this);
    }

    notifyParent = function (name, selectedField) {
        for (let i = 0; i < this.state.livefreezerRackData.length; i++) {
            if (selectedField[0] === this.state.livefreezerRackData[i].name) {
                freezerRackId = this.state.livefreezerRackData[i].id;
            }
        }
        this.props.getSelectedFreezerRackId(freezerRackId);
    };

    componentWillReceiveProps(newProps) {
        if (!!newProps.freezerShelfId) {
            axios.post('http://localhost:8081/gclportal/api/freezerrack',
                [newProps.freezerShelfId]
            )
                .then((res) => {
                    console.log(res.data);
                    let freezerRack = [];
                    for (let i = 0; i < res.data.length; i++) {
                        freezerRack.push(res.data[i].name);
                    }
                    this.setState({
                        livefreezerRackData: res.data,
                        freezerRack
                    });
                }, (err) => {
                    console.log(err);
                });
        }
    }

    render() {
        return (
            <div className="form-inline">
                <label className="col-sm-4 col-form-label" style={styles.label}>Freezer Rack</label>
                <div className="col-sm-5">
                    <LiveSearch
                        liveSearchData={this.state.freezerRack}
                        notifyParent={this.notifyParent}
                        liveSearchDataResponse="freezerRack"/>
                </div>
            </div>
        );
    }
}

const styles = ({
    label: {
        justifyContent: 'flex-start'
    },
    rowTop: {
        marginTop: '20px'

    },
    text: {
        width:"30%",
        height:"31px"
    },
    col: {
        textAlign: 'start'
    },
    button: {
        justifyContent: 'flex-end',
        marginTop: '25px'
    }
});

export default FreezerRackList;