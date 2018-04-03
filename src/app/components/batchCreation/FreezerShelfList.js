import React, {Component} from 'react';
import LiveSearch from "../searchWorkOrder/LiveSearch";
import axios from 'axios';
let freezerShelfId;
class FreezerShelfList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            livefreezerShelfData: [],
            freezerShelf: []
        };
        this.notifyParent = this.notifyParent.bind(this);
    }

    notifyParent = function (name, selectedField) {
        for (let i = 0; i < this.state.livefreezerShelfData.length; i++) {
            if (selectedField[0] === this.state.livefreezerShelfData[i].name) {
                freezerShelfId = this.state.livefreezerShelfData[i].id;
            }
        }
        this.props.getSelectedFreezerShelfId(freezerShelfId);
    };

    componentWillReceiveProps(newProps) {
        if (!!newProps.freezerId) {
            axios.post('http://localhost:8081/gclportal/api/freezershelf',
                [newProps.freezerId]
            )
                .then((res) => {
                    console.log(res.data);
                    let freezerShelf = [];
                    for (let i = 0; i < res.data.length; i++) {
                        freezerShelf.push(res.data[i].name);
                    }
                    this.setState({
                        livefreezerShelfData: res.data,
                        freezerShelf
                    });
                }, (err) => {
                    console.log(err);
                });
        }
    }

    render() {
        return (
            <div className="form-inline">
                <label className="col-sm-4 col-form-label" style={styles.label}>Freezer Shelf</label>
                <div className="col-sm-5">
                    <LiveSearch
                        liveSearchData={this.state.freezerShelf}
                        notifyParent={this.notifyParent}
                        liveSearchDataResponse="freezerShelf"/>
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
export default FreezerShelfList;