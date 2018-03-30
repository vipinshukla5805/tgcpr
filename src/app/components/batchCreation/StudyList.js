import React, {Component} from 'react';
import LiveSearch from "../searchWorkOrder/LiveSearch";
import axios from 'axios';
let studyId;
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
                studyId = this.state.liveStudySearchData[i].id;
            }
        }
        this.props.getSelectedStudyId(studyId);
    };
    componentWillReceiveProps(newProps) {
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
export default StudyList;