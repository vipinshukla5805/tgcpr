import React, {Component} from 'react';
import LiveSearch from "../searchWorkOrder/LiveSearch";
import axios from 'axios';
let vialLocationData={};
class VialLocationList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            liveVialLocationData : [],
            vialLocation : []
        };
        this.notifyParent = this.notifyParent.bind(this);
    }

    notifyParent = function(name, selectedField){
        for(let i=0;i<this.state.liveVialLocationData.length;i++){
            if(selectedField[0]===this.state.liveVialLocationData[i].name) {
                vialLocationData.id = this.state.liveVialLocationData[i].id;
                vialLocationData.name=selectedField[0];
                vialLocationData.ticked = true;
            }
        }
        this.props.getSelectedVialData(vialLocationData);
    };
    componentDidMount() {
      //  if(!!newProps.testId) {
            axios.get('http://localhost:8081/gclportal/api/viallocation')
                .then((res)=> {
                    console.log(res.data);
                    let vialLocation = [];
                    for(let i=0;i<res.data.length;i++) {
                        vialLocation.push(res.data[i].name);
                    }
                    this.setState({
                        liveVialLocationData : res.data,
                        vialLocation
                    });
                }, (err) => {
                    console.log(err);
                });
     //   }
    }

    render() {
        return (
            <div className="form-inline">
                <label className="col-sm-4 col-form-label" style={styles.label}>Vial Location</label>
                <div className="col-sm-5">
                    <LiveSearch
                        liveSearchData={this.state.vialLocation}
                        notifyParent={this.notifyParent}
                        liveSearchDataResponse="vial"/>
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
export default VialLocationList;