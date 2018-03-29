import React, {Component} from 'react';
import LiveSearch from "../searchWorkOrder/LiveSearch";
import axios from 'axios';
let testId;
class TestList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            liveTestSearchData : [],
            testList : [],
        };
        this.notifyParent = this.notifyParent.bind(this);
    }

    notifyParent = function(name, selectedField){
        for(let i=0;i<this.state.liveTestSearchData.length;i++){
            if(selectedField[0]===this.state.liveTestSearchData[i].name) {
                testId = this.state.liveTestSearchData[i].id;
            }
        }
        this.props.getSelectedTestId(testId);
    };
    componentWillReceiveProps(newProps) {
        if(!!newProps.studyId) {
            axios.get('http://localhost:8081/gclportal/api/tests/'+ newProps.studyId)
                .then((res)=> {
                    console.log(res.data);
                    let testList = [];
                    for(let i=0;i<res.data.length;i++) {
                        testList.push(res.data[i].name);
                    }
                    this.setState({
                        liveTestSearchData : res.data,
                        testList
                    });
                }, (err) => {
                    console.log(err);
                });
        }
    }

    render() {
        return (
            <div className="form-inline">
                <label className="col-sm-4 col-form-label" style={styles.label}>Test</label>
                <div className="col-sm-5">
                    <LiveSearch
                        liveSearchData={this.state.testList}
                        notifyParent={this.notifyParent}  liveSearchDataResponse="test"/>
                </div>
            </div>
        )
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
export default TestList;