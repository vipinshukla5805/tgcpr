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
            this.props.dataHandler(this.state.data,file);
        };
        if(rABS) reader.readAsBinaryString(file); else reader.readAsArrayBuffer(file);
    };

    render() { return (
        <DragDropFile handleFile={this.handleFile}>
                <DataInput handleFile={this.handleFile} />
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
        console.log(files[0]);
        if(files && files[0]) this.props.handleFile(files[0]);
    };
    render() { return (
        <div className="col-sm-2" onDrop={this.onDrop} onDragEnter={this.suppress} onDragOver={this.suppress}>
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
        console.log(files[0]);
        if(files && files[0]) this.props.handleFile(files[0]);
    };
    render() { return (
          <div className="btn btn-primary btn-file">
          <input type="file" id="file" accept={SheetJSFT} onChange={this.handleChange}/>Import File
          </div>
    ); };
}


const SheetJSFT = [
    "xlsx", "xlsb", "xlsm", "xls", "xml", "csv", "txt", "ods", "fods", "uos", "sylk", "dif", "dbf", "prn", "qpw", "123", "wb*", "wq*", "html", "htm"
].map(function(x) { return "." + x; }).join(",");

const make_cols = refstr => {
    let o = [], C = XLSX.utils.decode_range(refstr).e.c + 1;
    for(var i = 0; i < C; ++i) o[i] = {name:XLSX.utils.encode_col(i), key:i}
    return o;
};