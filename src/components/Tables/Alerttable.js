import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import MaterialTable from 'material-table'
import axios from 'axios'

import config from '../../config/data_config.json'

var rs = require("randomstring");
const col = [
    { field: "id", title: "ลำดับ", cellStyle: { textAlign: "center", fontSize: '13px', width: '0' }, editable: 'never' },
    { field: "ser_out_dt", title: "วันที่รับรถ", cellStyle: { textAlign: "center", fontSize: '13px', width: 400 }, editable: 'never' },
    { field: "company", title: "บริษัท", cellStyle: { textAlign: "center", fontSize: '13px', width: 500 }, editable: 'never' },
    { field: "lice_pl", title: "ทะเบียน", cellStyle: { textAlign: "center", fontSize: '13px', width: 200 }, editable: 'never' },
    { field: "model", title: "รุ่นรถ", cellStyle: { textAlign: "center", fontSize: '13px', width: 200 }, editable: 'never' },
    { field: "cont1", title: "ผู้ติดต่อ 1", cellStyle: { textAlign: "center", fontSize: '13px', width: 200 }, editable: 'never' },
    { field: "tel1", title: "เบอร์โทร 1", cellStyle: { textAlign: "center", fontSize: '13px', width: 200 }, editable: 'never' },
    { field: "cont2", title: "ผู้ติดต่อ 2", cellStyle: { textAlign: "center", fontSize: '13px', width: 200 }, editable: 'never' },
    { field: "tel2", title: "เบอร์โทร 2", cellStyle: { textAlign: "center", fontSize: '13px', width: 200 }, editable: 'never' },
    { field: "ser_fix_no", title: "ใบสั่งซ่อม", cellStyle: { textAlign: "center", fontSize: '13px', width: 200 }, editable: 'never' },
    { field: "ser_type", title: "ประเภทบริการ", cellStyle: { textAlign: "center", fontSize: '13px', width: 200 }, editable: 'never' },
    { field: "km_out", title: "เลขกิโลออก", cellStyle: { textAlign: "center", fontSize: '13px', width: 200 }, editable: 'never' },
    //{ field: "month_alert_no", title: "จำนวนเดือนติดตาม", cellStyle: { textAlign: "center", fontSize: '13px', width: 200 }, editable: 'never' },
    { field: "problem", title: "อาการที่พบ", cellStyle: { textAlign: "center", fontSize: '13px', width: 1500 }, editable: 'never' },
    { field: "alert_level", title: "การแจ้งเตือน", cellStyle: { textAlign: "center", fontSize: '13px', width: 1500 } },
    { field: "alert_detail", title: "รายละเอียดการแจ้งเตือน", cellStyle: { textAlign: "center", fontSize: '13px', width: 1000 }, editable: 'never' },
    { field: "alert_status", title: "สถานะการแจ้งเตือน", cellStyle: { textAlign: "center", fontSize: '13px', width: 1000 }, lookup: config.alert_status },
    { field: "remark", title: "หมายเหตุ", cellStyle: { textAlign: "center", fontSize: '13px', width: 1000 } },
    //{ field: "issueType", title: "Task Type", editor: IssueTypeEditor }
]

class Testtable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };

    }

    componentDidMount() {
        this.getData(this.props.tab_no)
    }

    componentWillUnmount() {

    }

    getData() {
        console.log("b4 setState", this.state.data,this.props.tab_no)
        var url = 'http://localhost:8788/alertlist'

        if(this.props.tab_no == "2"){
            url = 'http://localhost:8788/alertlist'
        }
        axios.get(url)
            //.then(response => this.setState({rows}))
            .then(response => {
                if(response.data.length>0){
                    let i =1
                    response.data.map((onedata)=>{
                        response.data[i-1].id = i
                        response.data[i-1].updFlag = false
                    })
                }
                this.setState({
                    data : response.data
                });
            })
    }

    render() {
        var title = "รายการติดตาม " + this.props.alert_type
        return (
            <div style={{ }}>
                <MaterialTable
                    columns={col}
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
                    detailPanel={rowData => {
                        return (
                            <iframe
              width="100%"
              height="315"
              src="https://www.youtube.com/embed/C0DPdy98e4c"
              frameborder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            />
                        )
                    }}
                    editable={{
                        onRowUpdate: (newData, oldData) =>
                            new Promise(resolve => {
                                setTimeout(() => {
                                    resolve();
                                    const data = [...this.state.data];
                                    newData.updFlag = true
                                    data[data.indexOf(oldData)] = newData;
                                    this.setState({ ...this.state, data });
                                    console.log("newData>>>>", newData)
                                }, 5);
                            }),
                    }}
                />
            </div>
        )
    }
}

export default Testtable