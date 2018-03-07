import * as XLSX from "xlsx";
import React from 'react';

class SheetJSApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [], cols: []
        };
        this.handleFile = this.handleFile.bind(this);
    };
    handleFile(file/*:File*/) {
        const reader = new FileReader();
        const rABS = !!reader.readAsBinaryString;
        reader.onload = (e) => {
            const bstr = e.target.result;
            const wb = XLSX.read(bstr, {type:rABS ? 'binary' : 'array'});
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            const data = XLSX.utils.sheet_to_json(ws, {header:1});
            this.setState({ data: data, cols: make_cols(ws['!ref']) });
            this.props.dataHandler(this.state.data);
        };
        if(rABS) reader.readAsBinaryString(file); else reader.readAsArrayBuffer(file);
    };

    render() { return (
        <DragDropFile handleFile={this.handleFile}>
            <div className="row"><div className="col-xs-12">
                <DataInput handleFile={this.handleFile} />
            </div></div>
        </DragDropFile>
    ); };
};

export default SheetJSApp;

class DragDropFile extends React.Component {
    constructor(props) {
        super(props);
        this.onDrop = this.onDrop.bind(this);
    };
    suppress(evt) { evt.stopPropagation(); evt.preventDefault(); };
    onDrop(evt) { evt.stopPropagation(); evt.preventDefault();
        const files = evt.dataTransfer.files;
        if(files && files[0]) this.props.handleFile(files[0]);
    };
    render() { return (
        <div onDrop={this.onDrop} onDragEnter={this.suppress} onDragOver={this.suppress}>
            {this.props.children}
        </div>
    ); };
};

class DataInput extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    };
    handleChange(e) {
        const files = e.target.files;
        if(files && files[0]) this.props.handleFile(files[0]);
    };
    render() { return (

    <div className="btn btn-primary btn-file">
        <input type="file" id="file" accept={SheetJSFT} onChange={this.handleChange}/>Import File
    </div>
    ); };
}

class OutTable extends React.Component {
    constructor(props) { super(props); };
    render() { return (
        <div className="table-responsive">
            <table className="table table-striped">
                <thead>
                <tr>{this.props.cols.map((c) => <th key={c.key}>{c.name}</th>)}</tr>
                </thead>
                <tbody>
                {this.props.data.map((r,i) => <tr key={i}>
                    {this.props.cols.map(c => <td key={c.key}>{ r[c.key] }</td>)}
                </tr>)}
                </tbody>
            </table>
        </div>
    ); };
};

const SheetJSFT = [
    "xlsx", "xlsb", "xlsm", "xls", "xml", "csv", "txt", "ods", "fods", "uos", "sylk", "dif", "dbf", "prn", "qpw", "123", "wb*", "wq*", "html", "htm"
].map(function(x) { return "." + x; }).join(",");

const make_cols = refstr => {
    let o = [], C = XLSX.utils.decode_range(refstr).e.c + 1;
    for(var i = 0; i < C; ++i) o[i] = {name:XLSX.utils.encode_col(i), key:i}
    return o;
};