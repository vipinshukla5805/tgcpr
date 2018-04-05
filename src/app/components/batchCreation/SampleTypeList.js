import React, {Component} from 'react';
import LiveSearch from "../searchWorkOrder/LiveSearch";
import axios from 'axios';
let SampleTypeData={};
class SampleTypeList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            liveSampleTypeData : [],
            SampleType : []
        };
        this.notifyParent = this.notifyParent.bind(this);
    }

    notifyParent = function(name, selectedField){
        for(let i=0;i<this.state.liveSampleTypeData.length;i++){
            if(selectedField[0]===this.state.liveSampleTypeData[i].name) {
                SampleTypeData.id = this.state.liveSampleTypeData[i].id;
            }
        }
        SampleTypeData.name=selectedField[0];
        this.props.getSelectedSampleTypeData(SampleTypeData);
    };
    componentWillReceiveProps(newProps) {
        //  if(!!newProps.testId) {
        axios.get('http://localhost:8081/gclportal/api/getAllSampleTypes')
            .then((res)=> {
                console.log(res.data);
                let SampleType = [];
                for(let i=0;i<res.data.length;i++) {
                    SampleType.push(res.data[i].name);
                }
                this.setState({
                    liveSampleTypeData : res.data,
                    SampleType
                });
            }, (err) => {
                console.log(err);
            });
        //   }
    }

    render() {
        return (
            <div className="form-inline">
                <label className="col-sm-4 col-form-label" style={styles.label}>Sample Type</label>
                <div className="col-sm-5">
                    <LiveSearch
                        liveSearchData={this.state.SampleType}
                        notifyParent={this.notifyParent}
                        liveSearchDataResponse="SampleType"/>
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
export default SampleTypeList;