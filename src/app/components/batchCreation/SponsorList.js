import React, {Component} from 'react';
import LiveSearch from "../searchWorkOrder/LiveSearch";
import axios from 'axios';
let sponsorId;
class SponsorList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            liveSponsorSearchData : [],
            sponsorList : []
        }
        this.notifyParent = this.notifyParent.bind(this);
    }

    notifyParent = function(name, selectedField){
        for(let i=0;i<this.state.liveSponsorSearchData.length;i++){
            if(selectedField[0]===this.state.liveSponsorSearchData[i].name) {
                sponsorId = this.state.liveSponsorSearchData[i].id;
            }
        }
        this.props.getSelectedSponsorId(sponsorId);
    };
    componentDidMount(){
        axios.get('http://localhost:8081/gclportal/api/getallsponsors')
            .then((res)=> {
                console.log(res.data);
                let sponsorList = [];
                for(let i=0;i<res.data.length;i++) {
                    sponsorList.push(res.data[i].name);
                }
                this.setState({
                    liveSponsorSearchData : res.data,
                    sponsorList
                });
            }, (err) => {
                console.log(err);
            });
    }

   render() {
         return (
             <div className="form-inline">
                 <label className="col-sm-4 col-form-label" style={styles.label}>Sponsor</label>
                 <div className="col-sm-5">
                     <LiveSearch
                         liveSearchData={this.state.sponsorList}
                         notifyParent={this.notifyParent} liveSearchDataResponse="sponsor"/>
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
export default SponsorList;