import React, { Component } from 'react'

import MaterialTable from 'material-table'
import axios from 'axios'

import config from '../../config/data_config.json'

import cloneDeep from 'lodash/cloneDeep';

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { withStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';

var rs = require("randomstring");

let CssTextField0 = withStyles(theme => ({
    input: {
        width: '60px',
        fontSize: 14,
        position: 'relative',
        textAlign: 'center',
        color: 'transpalent',
    },
}))(InputBase);

let CssTextField1 = withStyles(theme => ({
    input: {
        width: '75px',
        fontSize: 14,
        position: 'relative',
        textAlign: 'center',
        color: 'transpalent',
    },
}))(InputBase);

let CssTextField2 = withStyles(theme => ({
    input: {
        width: '140px',
        fontSize: 14,
        position: 'relative',
        textAlign: 'center',
        color: 'transpalent',
    },
}))(InputBase);

let CssTextField3 = withStyles(theme => ({
    input: {
        width: '200px',
        fontSize: 14,
        position: 'relative',
        textAlign: 'center',
        color: 'transpalent',

    },
}))(InputBase);

class Testtable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            firstData: [],
            othervalue: "XXXXX"
        };
        this.col = [
            { field: "id", title: "ลำดับ", cellStyle: { textAlign: "center", fontSize: '13px', width: 10 } },
            {
                field: "ser_out_dt", title: "วันที่รับรถ",
                render: rowData => {
                    return (<CssTextField1 defaultValue={rowData.ser_out_dt} inputProps={{ readOnly: true }} />)
                }
            },
            {
                field: "company", title: "บริษัท", render: rowData => {
                    return (<CssTextField2 defaultValue={rowData.company} inputProps={{
                        readOnly: true

                    }} />)
                }
            },
            {
                field: "lice_pl", title: "ทะเบียน", render: rowData => {
                    return (<CssTextField0 defaultValue={rowData.lice_pl} inputProps={{
                        readOnly: true

                    }} />)
                }
            },
            {
                field: "model", title: "รุ่นรถ", render: rowData => {
                    return (<CssTextField2 defaultValue={rowData.model} inputProps={{
                        readOnly: true

                    }} />)
                }
            },
            {
                field: "cont1", title: "ผู้ติดต่อ", cellStyle: { textAlign: "left", fontSize: '13px', width: 1500 }, editable: 'never',
                render: rowData => <div>
                    {rowData.cont1.split("|")[0]} <br /> {rowData.cont1.split("|")[1]}
                </div>
            },
            // { field: "tel1", title: "เบอร์โทร 1", cellStyle: { textAlign: "center", fontSize: '13px', width: 200 }, editable: 'never' },
            // { field: "cont2", title: "ผู้ติดต่อ 2", cellStyle: { textAlign: "center", fontSize: '13px', width: 200 }, editable: 'never' },
            // { field: "tel2", title: "เบอร์โทร 2", cellStyle: { textAlign: "center", fontSize: '13px', width: 200 }, editable: 'never' },
            {
                field: "ser_fix_no", title: "ใบสั่งซ่อม", render: rowData => {
                    return (<CssTextField0 defaultValue={rowData.ser_fix_no} inputProps={{
                        readOnly: true

                    }} />)
                }
            },
            {
                field: "ser_type", title: "ประเภทบริการ", render: rowData => {
                    return (<CssTextField2 defaultValue={rowData.ser_type} inputProps={{
                        readOnly: true

                    }} />)
                }
            },
            { field: "km_out", title: "เลขกิโลออก", cellStyle: { textAlign: "center", fontSize: '13px', width: 200 }, editable: 'never' },
            //{ field: "month_alert_no", title: "จำนวนเดือนติดตาม", cellStyle: { textAlign: "center", fontSize: '13px', width: 200 }, editable: 'never' },
            {
                field: "problem", title: "อาการที่พบ", render: rowData => {
                    return (<CssTextField3 multiline={true} defaultValue={rowData.problem} inputProps={{
                        readOnly: true
                    }} />)
                }
            },
            {
                field: "alert_level", title: "การแจ้งเตือน", cellStyle: { textAlign: "center", fontSize: '13px' },
                render: rowData => {
                    let elements = []
                    Object.keys(config.alert_level).forEach((key) => {
                        elements.push(key)
                    })
                    return (
                        <Select value={rowData.alert_level}
                            onChange={this.handleChangeAlertLevel.bind(this)}
                            input={
                                <OutlinedInput style={{ fontSize: '13px', width: '200px' }} name={"" + rowData.id} id="alertlevel" rowid={rowData.id} />
                            }
                        >
                            {elements.map((value, index) => {
                                return <MenuItem style={{ fontSize: '13px' }} key={index} value={value}>{value}</MenuItem>
                            })}
                        </Select>
                    )
                }
            },
            {
                field: "alert_detail", title: "รายละเอียดการแจ้งเตือน", render: rowData => {
                    return (<CssTextField3 defaultValue={rowData.ser_type} inputProps={{
                        readOnly: true
                    }} />)
                }
            },
            {
                field: "alert_status", title: "สถานะการแจ้งเตือน", cellStyle: { textAlign: "center", fontSize: '13px' },  //lookup: config.alert_status
                render: rowData => {
                    let elements = []
                    Object.keys(config.alert_status).forEach((key) => {
                        elements.push(key)
                    })
                    return (
                        <Select value={rowData.alert_status}
                            onChange={this.handleChangeAlertStatus.bind(this)}
                            input={
                                <OutlinedInput style={{ fontSize: '13px', width: '200px' }} name={"" + rowData.id} id="alertstatus" rowid={rowData.id} />
                            }
                        >
                            {elements.map((value, index) => {
                                return <MenuItem style={{ fontSize: '13px' }} key={index} value={value}>{value}</MenuItem>
                            })}
                        </Select>
                    )
                }
            },
            {
                field: "remark", title: "หมายเหตุ", cellStyle: { textAlign: "center", fontSize: '13px', width: 1000 },
                render: rowData => {
                    return (
                        <CssTextField3 multiline={true} defaultValue={rowData.remark}
                            id={""+rowData.id}
                            onBlur={this.onBlurTextAreaHandler.bind(this)}
                        />
                        //     <TextareaAutosize style={{ border: '0', backgroundColor: (rowData.updFlag) ? '#bfefff' : '#FFF', fontSize: '13px' }}
                        //     id={rowData.id}
                        //     defaultValue={rowData.remark}
                        //     onBlur={this.onBlurTextAreaHandler.bind(this)}
                        // />
                    )
                }
            },
            //{ field: "issueType", title: "Task Type", editor: IssueTypeEditor }
        ]
    }

    handleChangeAlertLevel = (e) => {
        let data = cloneDeep(this.state.data);

        let rowID = parseInt(e.target.name)
        console.log(e.target)
        console.log(rowID - 1)
        data[rowID - 1].alert_level = e.target.value
        this.checkUpdate(rowID - 1, data[rowID - 1])
    };

    handleChangeAlertStatus = (e) => {
        let data = cloneDeep(this.state.data);

        let rowID = parseInt(e.target.name)
        console.log(e.target)
        console.log(rowID - 1)
        data[rowID - 1].alert_status = e.target.value
        this.checkUpdate(rowID - 1, data[rowID - 1])
    };

    onBlurTextAreaHandler = (e) => {
        let data = cloneDeep(this.state.data);

        data[parseInt(e.target.id) - 1].remark = e.target.value
        this.checkUpdate(parseInt(e.target.id)- 1, data[parseInt(e.target.id) - 1])
    }

    componentDidMount() {
        this.getData(this.props.tab_no)
    }

    checkUpdate = (index, newData) => {
        let data = cloneDeep(this.state.data);
        let fdata = cloneDeep(this.state.firstData);
        if (fdata[index].alert_level != newData.alert_level
            || fdata[index].alert_status != newData.alert_status
            || fdata[index].remark != newData.remark) {
            newData.updFlag = true

        } else {
            newData.updFlag = false
        }
        console.log(newData)
        data[index] = newData;
        this.setState({ ...this.state, data });
    }

    getData() {
        console.log("b4 setState", this.state.data, this.props.tab_no)
        var url = 'http://localhost:8788/alertlist'

        if (this.props.tab_no == "2") {
            url = 'http://localhost:8788/alertlist'
        }
        axios.get(url)
            //.then(response => this.setState({rows}))
            .then(response => {
                if (response.data.length > 0) {
                    let i = 1
                    response.data.map((onedata) => {
                        response.data[i - 1].id = i
                        response.data[i - 1].updFlag = false
                        response.data[i - 1].cont1 = response.data[i - 1].cont1 + " [" + response.data[i - 1].tel1 + "]"
                        if (response.data[i - 1].cont2) {
                            response.data[i - 1].cont1 = response.data[i - 1].cont1 + "|" + response.data[i - 1].cont2 + " [" + response.data[i - 1].tel2 + "]"
                        }
                        i = i + 1
                    })
                }
                this.setState({
                    data: [...response.data],
                    firstData: [...response.data]
                });
            })
    }

    render() {
        var title = "รายการติดตาม " + this.props.alert_type
        return (
            <div style={{ width: "auto" }}>
                <MaterialTable
                    columns={this.col}
                    data={this.state.data}
                    title={title}
                    onRowClick={((evt, selectedRow) => this.setState({ selectedRow }))}
                    options={{
                        headerStyle: {
                            fontSize: '15px',
                            textAlign: 'center',
                            padding: '20px'
                        },
                        showTitle: true,
                        exportButton: true,
                        rowStyle: rowData => ({
                            backgroundColor: (rowData.updFlag) ? '#bfefff' : '#FFF'
                        })
                    }}

                // editable={{
                //     onRowUpdate: (newData, oldData) =>
                //         new Promise(resolve => {
                //             setTimeout(() => {
                //                 resolve();
                //                 console.log(this.state)
                //                 const data = [...this.state.data];
                //                 const fdata = [...this.state.firstData];
                //                 this.checkUpdate(data.indexOf(oldData), newData)
                //             }, 5);
                //         }),
                // }}
                />
            </div>
        )
    }
}

export default Testtable