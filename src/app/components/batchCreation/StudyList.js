import React, {Component} from 'react';
import LiveSearch from "../searchWorkOrder/LiveSearch";
import axios from 'axios';
let studyData= {};
class StudyList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            liveStudySearchData : [],
            studyList : []
        };
        this.notifyParent = this.notifyParent.bind(this);
    }

    notifyParent = function(name, selectedField){
        for(let i=0;i<this.state.liveStudySearchData.length;i++){
            if(selectedField[0]===this.state.liveStudySearchData[i].name) {
                studyData.id = this.state.liveStudySearchData[i].id;
                studyData.name=selectedField[0];
            }
        }

        this.props.getSelectedStudyData(studyData);
    };
    componentWillReceiveProps(newProps) {
       // this.refs.StudyList.clearFields();
        if(!!newProps.sponsorId) {
            axios.get('http://localhost:8081/gclportal/api/studynumbers/'+ newProps.sponsorId)
                .then((res)=> {
                    console.log(res.data);
                    let studyList = [];
                    for(let i=0;i<res.data.length;i++) {
                        studyList.push(res.data[i].name);
                    }
                    this.setState({
                        liveStudySearchData : res.data,
                        studyList
                    });
                }, (err) => {
                    console.log(err);
                });
        }
    }

    render() {
        return (
            <div className="form-inline">
                <label className="col-sm-4 col-form-label" style={styles.label}>Studies</label>
                <div className="col-sm-5">
                    <LiveSearch
                        ref="StudyList"
                        liveSearchData={this.state.studyList}
                        notifyParent={this.notifyParent} liveSearchDataResponse="study"/>
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
export default StudyList;