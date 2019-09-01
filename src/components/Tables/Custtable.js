import React, { Component } from 'react'

import MaterialTable, { MTableToolbar } from 'material-table'
import axios from 'axios'

import config from '../../config/data_config.json'

import cloneDeep from 'lodash/cloneDeep';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { withStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
//import AddIcon from '@material-ui/icons/Add';
import DoneIcon from '@material-ui/icons/Done';
import CallMissedOutgoingIcon from '@material-ui/icons/CallMissedOutgoing';
import UndoIcon from '@material-ui/icons/Undo';
import PhoneMissedIcon from '@material-ui/icons/PhoneMissed';
import BlockIcon from '@material-ui/icons/Block';
import Button from '@material-ui/core/Button';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
//var rs = require("randomstring");
var ip = (process.env.REACT_APP_SERV !== "dev") ? "157.230.249.126" : 'localhost'

// if (process.env.REACT_APP_SERV !== "dev") {
//     ip = "157.230.249.126"
// }
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

let CssTextField4 = withStyles(theme => ({
    input: {
        width: '230px',
        fontSize: 14,
        position: 'relative',
        textAlign: 'left',
        color: 'transpalent',

    },
}))(InputBase);

class Custtable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            firstData: [],
            othervalue: "XXXXX",
            dialogOpen: false,
            dialogResultOpen: false
        };
        this.updatelist = []
        this.updateDetail = []
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
                    return (<CssTextField2 multiline={true} defaultValue={rowData.company} inputProps={{
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
                render: rowData => {
                    return (<CssTextField4 multiline={true} defaultValue={rowData.cont1} inputProps={{
                        readOnly: true

                    }} />)
                    // render: rowData => <div>
                    //     {rowData.cont1.split("|")[0]} <br /> {rowData.cont1.split("|")[1]}
                    // </div>
                }
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
                    return (<CssTextField3 defaultValue={rowData.ser_type} inputProps={{
                        readOnly: true

                    }} />)
                }
            },
            { field: "km_out", title: "เลขกิโลออก", cellStyle: { textAlign: "center", fontSize: '13px', width: 200 }, editable: 'never' },
            //{ field: "month_alert_no", title: "จำนวนเดือนติดตาม", cellStyle: { textAlign: "center", fontSize: '13px', width: 200 }, editable: 'never' },
            {
                field: "problem", title: "อาการที่พบ", render: rowData => {
                    return (<CssTextField4 multiline={true} defaultValue={rowData.problem} inputProps={{
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
                                <OutlinedInput style={{ fontSize: '13px', width: '180px' }} name={"" + rowData.id} id="alertlevel" rowid={rowData.id} />
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
                    return (<CssTextField4 multiline={true} defaultValue={rowData.alert_detail} inputProps={{
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
                    var listFab = ""
                    if (this.props.tab_no === 1 || this.props.tab_no === 2) {
                        listFab = <div>
                            <Tooltip title="กลับไปค่าเริ่มต้น">
                                <Fab onClick={this.handleClickAlertStatus.bind(this, rowData, "-1")} aria-label="add" style={{ color: 'white', background: '#424242', marginRight: '0.5rem', marginTop: '0.5rem', width: '35px', height: '35px' }}>
                                    <UndoIcon />
                                </Fab>
                            </Tooltip>
                            <Tooltip title="ติดตามงานบริการ (ไม่พบปัญหา)" >
                                <Fab onClick={this.handleClickAlertStatus.bind(this, rowData, "ติดตามงานบริการ (ไม่พบปัญหา)")} aria-label="add" style={{ color: 'white', background: '#26a69a', marginRight: '0.5rem', marginTop: '0.5rem', width: '35px', height: '35px' }}>
                                    <DoneIcon />
                                </Fab>
                            </Tooltip>
                            <Tooltip title="ติดตามงานบริการ (พบปัญหา)">
                                <Fab onClick={this.handleClickAlertStatus.bind(this, rowData, "ติดตามงานบริการ (พบปัญหา)")} aria-label="add" style={{ color: 'white', background: '#f44336', marginRight: '0.5rem', marginTop: '0.5rem', width: '35px', height: '35px' }}>
                                    <CallMissedOutgoingIcon />
                                </Fab>
                            </Tooltip>
                            <Tooltip title="ลูกค้าไม่รับสาย/ไม่สะดวกคุย">
                                <Fab onClick={this.handleClickAlertStatus.bind(this, rowData, "ลูกค้าไม่รับสาย/ไม่สะดวกคุย")} aria-label="add" style={{ color: 'white', background: '#546e7a', marginRight: '0.5rem', marginTop: '0.5rem', width: '35px', height: '35px' }}>
                                    <PhoneMissedIcon />
                                </Fab>
                            </Tooltip>
                            <Tooltip title="เลิกติดตาม">
                                <Fab onClick={this.handleClickAlertStatus.bind(this, rowData, "เลิกติดตาม")} aria-label="add" style={{ color: 'white', background: '#b71c1c', marginTop: '0.5rem', width: '35px', height: '35px' }}>
                                    <BlockIcon />
                                </Fab>
                            </Tooltip>
                        </div>
                    } else {
                        listFab = <div>
                            <Tooltip title="กลับไปค่าเริ่มต้น">
                                <Fab onClick={this.handleClickAlertStatus.bind(this, rowData, "-1")} aria-label="add" style={{ color: 'white', background: '#424242', marginRight: '0.5rem', marginTop: '0.5rem', width: '35px', height: '35px' }}>
                                    <UndoIcon />
                                </Fab>
                            </Tooltip>
                            <Tooltip title="แจ้งทราบแล้ว" >
                                <Fab onClick={this.handleClickAlertStatus.bind(this, rowData, "แจ้งทราบแล้ว")} aria-label="add" style={{ color: 'white', background: '#26a69a', marginRight: '0.5rem', marginTop: '0.5rem', width: '35px', height: '35px' }}>
                                    <DoneIcon />
                                </Fab>
                            </Tooltip>
                            <Tooltip title="ลูกค้าไม่รับสาย/ไม่สะดวกคุย">
                                <Fab onClick={this.handleClickAlertStatus.bind(this, rowData, "ลูกค้าไม่รับสาย/ไม่สะดวกคุย")} aria-label="add" style={{ color: 'white', background: '#546e7a', marginRight: '0.5rem', marginTop: '0.5rem', width: '35px', height: '35px' }}>
                                    <PhoneMissedIcon />
                                </Fab>
                            </Tooltip>
                            <Tooltip title="เลิกติดตาม">
                                <Fab onClick={this.handleClickAlertStatus.bind(this, rowData, "เลิกติดตาม")} aria-label="add" style={{ color: 'white', background: '#b71c1c', marginTop: '0.5rem', width: '35px', height: '35px' }}>
                                    <BlockIcon />
                                </Fab>
                            </Tooltip>
                        </div>
                    }
                    return (<div>
                        <Select value={rowData.alert_status}
                            onChange={this.handleChangeAlertStatus.bind(this)}
                            input={
                                <OutlinedInput style={{ fontSize: '13px', width: '220px', height: '35px' }} name={"" + rowData.id} id="alertstatus" rowid={rowData.id} />
                            }
                        >
                            {elements.map((value, index) => {
                                return <MenuItem style={{ fontSize: '13px' }} key={index} value={value}>{value}</MenuItem>
                            })}
                        </Select>
                        {(listFab) ? listFab : ""}

                    </div>
                    )
                }
            },
            {
                field: "remark", title: "หมายเหตุ", cellStyle: { textAlign: "center", fontSize: '13px', width: 1000 },
                render: rowData => {
                    return (
                        <CssTextField4 multiline={true} defaultValue={rowData.remark}
                            id={"" + rowData.id}
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


    sendUpdate = async () => {
        let data = cloneDeep(this.state.data);
        let arrUpd = []
        let fdata = cloneDeep(this.state.firstData);
        console.log("fdata",fdata)
        data.forEach((oneData) => {
            if (oneData.updFlag) {
                console.log(oneData)
                
                arrUpd.push({
                    _id:oneData._id,
                    alert_lv: oneData.alert_level,
                    alert_status: oneData.alert_status,
                    remark: oneData.remark,
                    old_alert_lv : fdata[oneData.id-1].alert_level,
                    old_alert_status : fdata[oneData.id-1].alert_status,
                    old_remark : fdata[oneData.id-1].remark
                })
            }
        })
        console.log(arrUpd)
        var url = 'http://' + ip + ':8788/alertlist'
        let response = await axios({
            method: 'post',
            url: url,
            data: arrUpd
        })
        console.log(response)
        console.log("end")
        if (response.data.code === 0) {
            this.handleDialogOpen(2)
        }
    }
    handleClickAlertStatus = (rowData, alertStatus) => {
        console.log(rowData)
        console.log(alertStatus)

        let data = cloneDeep(this.state.data);

        let rowID = parseInt(rowData.id)
        console.log(rowID - 1)
        if (alertStatus === "-1") {
            let fdata = cloneDeep(this.state.firstData);
            data[rowID - 1].alert_status = fdata[rowID - 1].alert_status
        } else {

            data[rowID - 1].alert_status = alertStatus
        }

        this.checkUpdate(rowID - 1, data[rowID - 1])
    };

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
        this.checkUpdate(parseInt(e.target.id) - 1, data[parseInt(e.target.id) - 1])
    }

    handleClickUpdateYes = async (e) => {
        this.setState({ ...this.state, dialogOpen: false });
        this.sendUpdate()
        this.updateDetail = []
    };

    handleDialogClose = (dtype) => {
        console.log("handleDialogClose", dtype)
        if (dtype === 2) {
            this.setState({ ...this.state, dialogResultOpen: false });
        } else {
            this.setState({ ...this.state, dialogOpen: false });
        }
    }

    handleDialogOpen = (dtype) => {
        console.log("handleDialogOpen", dtype)
        if (dtype === 2) {
            this.setState({ ...this.state, dialogResultOpen: true });
        } else {
            this.setState({ ...this.state, dialogOpen: true });
        }

    }

    componentDidMount() {
        this.getData(this.props.tab_no)
    }

    checkUpdate = (index, newData) => {
        let data = cloneDeep(this.state.data);
        let fdata = cloneDeep(this.state.firstData);
        if (fdata[index].alert_level !== newData.alert_level
            || fdata[index].alert_status !== newData.alert_status
            || fdata[index].remark !== newData.remark) {
            newData.updFlag = true
            this.updatelist.push(index)
            console.log(this.updatelist)
        } else {
            newData.updFlag = false
            for (var i = 0; i < this.updatelist.length; i++) {
                if (this.updatelist[i] === index) {
                    this.updatelist.splice(i, 1);
                }
            }
            console.log(this.updatelist)
        }
        console.log(newData)
        data[index] = newData;
        this.setState({ ...this.state, data });
    }

    async getData() {
        console.log("b4 setState", this.state.data, this.props.tab_no)

        var url = 'http://' + ip + ':8788/alertlist/fix7day'
        if (this.props.tab_no === "2") {
            url = 'http://' + ip + ':8788/alertlist/km7day'
        } else if (this.props.tab_no === "3") {
            url = 'http://' + ip + ':8788/alertlist/km'
        }
        let response = await axios.get(url)
        //.then(response => this.setState({rows}))
        //.then(response => {
        if (response.data.length > 0) {
            let i = 1
            response.data.forEach((onedata) => {
                response.data[i - 1].id = i
                response.data[i - 1].updFlag = false
                if (response.data[i - 1].cont1) {
                    response.data[i - 1].cont1 = "1." + response.data[i - 1].cont1 + " " + response.data[i - 1].tel1
                } else {
                    response.data[i - 1].cont1 = "1." + response.data[i - 1].tel1
                }

                if (response.data[i - 1].cont2) {
                    response.data[i - 1].cont1 = response.data[i - 1].cont1 + "\n2." + response.data[i - 1].cont2 + " " + response.data[i - 1].tel2 + ""
                }
                if (response.data[i - 1].cont1 === "1.") {
                    response.data[i - 1].cont1 = ""
                }
                i = i + 1
            })
        }
        this.setState({
            data: [...response.data],
            firstData: [...response.data]
        });
        //})
    }

    render() {
        var title = "รายการติดตาม " + this.props.alert_type
        return (
            <div style={{ width: "auto" }}>
                <Dialog
                    open={this.state.dialogOpen}
                    onClose={this.handleDialogClose.bind(this, 1)}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"ต้องการ \"บันทึกข้อมูลทั้งหมด\" ใช่หรือไม่?"}</DialogTitle>

                    <DialogActions>
                        <Button onClick={this.handleClickUpdateYes.bind(this)} color="primary" autoFocus>
                            ใช่
                        </Button>
                        <Button onClick={this.handleDialogClose.bind(this, 1)} color="primary" >
                            ไม่ใช่
                        </Button>
                    </DialogActions>
                </Dialog>
                <Dialog
                    open={this.state.dialogResultOpen}
                    onClose={this.handleDialogClose.bind(this, 2)}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >

                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            บันทึกเรียบร้อย
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleDialogClose.bind(this, 2)} color="primary" autoFocus>
                            ปิด
                        </Button>
                    </DialogActions>
                </Dialog>
                <MaterialTable
                    columns={this.col}
                    data={this.state.data}
                    title={title}
                    //onRowClick={((evt, selectedRow) => this.setState({ selectedRow }))}
                    options={{
                        headerStyle: {
                            fontSize: '15px',
                            textAlign: 'center',
                            padding: '20px'
                        },
                        pageSize: 10,
                        showTitle: true,
                        exportButton: true,
                        rowStyle: rowData => ({
                            backgroundColor: (rowData.updFlag) ? '#eeeeee' : '#FFF'
                        })
                    }}
                    components={{
                        Toolbar: props => (
                            <div>
                                <MTableToolbar {...props} />
                                <div style={{ padding: '0px 10px' }}>
                                    <Button onClick={this.handleDialogOpen.bind(this, 1)} disabled={(this.updatelist.length > 0) ? false : true} size="large" variant="contained" style={{ color: 'white', background: (this.updatelist.length > 0) ? '#26a69a' : '#e0e0e0', marginTop: '1rem', marginLeft: '1rem' }}>
                                        บันทึกข้อมูลทั้งหมด
                                </Button>
                                </div>
                            </div>
                        ),
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

export default Custtable
