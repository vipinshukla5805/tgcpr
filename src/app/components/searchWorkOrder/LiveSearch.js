import React, {Component} from 'react';
import {Typeahead} from 'react-bootstrap-typeahead';

export default class LiveSearch extends Component {
    onChange = name => value =>{
         this.props.notifyParent(name,value);
    };

    render(props) {
        return (
            <div className="col-xl">
                <label className="label">{this.props.liveSearchDataTitle}</label>
                <Typeahead
                    labelKey="name"
                    bsSize="small"
                    onChange={this.onChange(this.props.liveSearchDataResponse)}
                    options={this.props.liveSearchData}
                    placeholder="None Selected"
                />
            </div>
        );
    }
}