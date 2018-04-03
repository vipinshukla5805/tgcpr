import React, {Component} from 'react';
import LiveSearch from "../searchWorkOrder/LiveSearch";
import axios from 'axios';
let freezerLocationId;
class FreezerLocationList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            livefreezerLocationData : [],
            freezerLocation:[]
        };
        this.notifyParent = this.notifyParent.bind(this);
    }

    notifyParent = function(name, selectedField){
        for(let i=0;i<this.state.livefreezerLocationData.length;i++){
            if(selectedField[0]===this.state.livefreezerLocationData[i].name) {
                freezerLocationId = this.state.livefreezerLocationData[i].id;
            }
        }
        this.props.getSelectedFreezerLocationId(freezerLocationId);
    };
    componentWillReceiveProps(newProps) {
      //  if(!!newProps.testId) {
            axios.get('http://localhost:8081/gclportal/api/freezerlocation')
                .then((res)=> {
                    console.log(res.data);
                    let freezerLocation = [];
                    for(let i=0;i<res.data.length;i++) {
                        freezerLocation.push(res.data[i].name);
                    }
                    this.setState({
                        livefreezerLocationData : res.data,
                        freezerLocation
                    });
                }, (err) => {
                    console.log(err);
                });
      //  }
    }

    render() {
        return (
            <div className="form-inline">
                <label className="col-sm-4 col-form-label" style={styles.label}>Freezer Location</label>
                <div className="col-sm-5">
                    <LiveSearch
                        liveSearchData={this.state.freezerLocation}
                        notifyParent={this.notifyParent}
                        liveSearchDataResponse="freezerLocation"/>
                </div>
            </div>
        )
    }
}

const styles = ({
    label: {
        justifyContent: 'flex-start'
    }
});
export default FreezerLocationList;