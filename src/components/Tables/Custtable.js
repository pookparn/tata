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
        width: '400px',
        fontSize: 14,
        position: 'relative',
        textAlign: 'left',
        color: 'transpalent',

    },
}))(InputBase);

let CssTextField4 = withStyles(theme => ({
    input: {
        width: '300px',
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
            { field: "id", title: "ลำดับ", cellStyle: { textAlign: "center", fontSize: '13px', width: 10 } }
            ,
            {
                field: "business_name", title: "บริษัท", render: rowData => {
                    return (<CssTextField4 multiline={true} defaultValue={rowData.business_name} inputProps={{readOnly: true}} />)
                }
            },
            {
                field: "owner_name", title: "เจ้าของ", render: rowData => {
                    return (<CssTextField4 multiline={true} defaultValue={rowData.owner_name} inputProps={{readOnly: true}} />)      
                }
            },

            {
                field: "contname1", title: "ผู้ติดต่อ1", cellStyle: { textAlign: "center", fontSize: '13px', width: 500 }, editable: 'never',
                render: rowData => {
                    return (<CssTextField2 multiline={true} defaultValue={rowData.contname1} inputProps={{ readOnly: true}} />)
                }
            },
            {
                field: "conttel1", title: "เบอร์โทร1", cellStyle: { textAlign: "center", fontSize: '13px', width: 500 }, editable: 'never',
                render: rowData => {
                    return (<CssTextField2 multiline={true} defaultValue={rowData.conttel1} inputProps={{ readOnly: true}} />)
                }
            },
            {
                field: "contname2", title: "ผู้ติดต่อ2", cellStyle: { textAlign: "center", fontSize: '13px', width: 500 }, editable: 'never',
                render: rowData => {
                    return (<CssTextField2 multiline={true} defaultValue={rowData.contname2} inputProps={{ readOnly: true}} />)
                }
            },
            {
                field: "conttel2", title: "เบอร์โทร2", cellStyle: { textAlign: "center", fontSize: '13px', width: 500 }, editable: 'never',
                render: rowData => {
                    return (<CssTextField2 multiline={true} defaultValue={rowData.conttel2} inputProps={{ readOnly: true}} />)
                }
            },
            {
                field: "addr_no", title: "ที่อยู่", cellStyle: { textAlign: "left", fontSize: '13px', width: 500 }, editable: 'never',
                render: rowData => {
                    return (<CssTextField3 multiline={true} defaultValue={rowData.addr_no} inputProps={{ readOnly: true}} />)
                }
            },
            {
                field: "addr_dist", title: "อำเภอ/เขต", cellStyle: { textAlign: "center", fontSize: '13px', width: 500 }, editable: 'never',
                render: rowData => {
                    return (<CssTextField2 multiline={true} defaultValue={rowData.addr_dist} inputProps={{ readOnly: true}} />)
                }
            },
            {
                field: "addr_prov", title: "จังหวัด", cellStyle: { textAlign: "center", fontSize: '13px', width: 500 }, editable: 'never',
                render: rowData => {
                    return (<CssTextField2 multiline={true} defaultValue={rowData.addr_prov} inputProps={{ readOnly: true}} />)
                }
            },
            {
                field: "addr_post", title: "รหัสไปรษณีย์", cellStyle: { textAlign: "center", fontSize: '13px', width: 500 }, editable: 'never',
                render: rowData => {
                    return (<CssTextField1 multiline={true} defaultValue={rowData.addr_post} inputProps={{ readOnly: true}} />)
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
        this.getData()
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

        var url = 'http://' + ip + ':8788/customer'

        let response = await axios.get(url)
        console.log(response.data)
        //.then(response => this.setState({rows}))
        //.then(response => {
        if (response.data.length > 0) {
            let i = 1
            response.data.forEach((onedata) => {
                response.data[i - 1].id = i
                response.data[i - 1].updFlag = false
                
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
