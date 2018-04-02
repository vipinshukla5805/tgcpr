import React, {Component} from 'react';
import LiveSearch from "../searchWorkOrder/LiveSearch";
import axios from 'axios';
let siteId;
class SiteList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            liveSiteData: [],
            Site: []
        };
        this.notifyParent = this.notifyParent.bind(this);
    }

    notifyParent = function (name, selectedField) {
        for (let i = 0; i < this.state.liveSiteData.length; i++) {
            if (selectedField[0] === this.state.liveSiteData[i].name) {
                siteId = this.state.liveSiteData[i].id;
            }
        }
        this.props.getSelectedSiteId(siteId);
    };

    componentWillReceiveProps(newProps) {
        if (!!newProps.visitId) {
            axios.post('http://localhost:8081/gclportal/api/sites',
                [newProps.visitId]
            )
                .then((res) => {
                    console.log(res.data);
                    let Site = [];
                    for (let i = 0; i < res.data.length; i++) {
                        Site.push(res.data[i].name);
                    }
                    this.setState({
                        liveSiteData: res.data,
                        Site
                    });
                }, (err) => {
                    console.log(err);
                });
        }
    }

    render() {
        return (
            <div className="form-inline">
                <label className="col-sm-4 col-form-label" style={styles.label}>Site</label>
                <div className="col-sm-5">
                    <LiveSearch
                        liveSearchData={this.state.Site}
                        notifyParent={this.notifyParent}
                        liveSearchDataResponse="Site"/>
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
export default SiteList;