import React from "react";
import ReactDOM from "react-dom";
import ReactDataGrid from "react-data-grid";
import { Editors } from "react-data-grid-addons";

import "./styles.css";
import 'bootstrap/dist/css/bootstrap.css';
import Button from '@material-ui/core/Button';

var dataConf = require('../../config/data_config.json')

const COLUMN_WIDTH = 140; 
const { DropDownEditor } = Editors;
const issueTypes = dataConf.issueTypes

const alertStatuslEditor = <DropDownEditor options={dataConf.alert_status} />;
const alertLevellEditor = <DropDownEditor options={dataConf.alert_level} />;

const colFormat = (props) => {
  return (<div style={{
    fontSize: '14px',
    textAlign: 'center'
  }}>{props.value}</div>
  )
}

const renderHeader = (props) => {
  return (<div style={{
    fontSize: '15px',
    textAlign: 'center',
  }}>{props.column.name}</div>
  )
}
const defaultColumnProperties = {
  formatter: colFormat,
  headerRenderer: renderHeader
};

const columns = [ 
  { key: "id", name: "ลำดับ",frozen: true,width: 50},
  { key: "ser_out_dt", name: "วันที่รับรถ" ,frozen: true,width: 90},
  { key: "company", name: "บริษัท" ,frozen: true,width: 240},
  { key: "lice_pl", name: "ทะเบียน" ,frozen: true,width: 80},
  { key: "model", name: "รุ่นรถ" ,frozen: true, width: 120},
  { key: "cont1", name: "ผู้ติดต่อ 1",width:100},
  { key: "tel1", name: "เบอร์โทร 1" , width: 90},
  { key: "cont2", name: "ผู้ติดต่อ 2" ,width:100},
  { key: "tel2", name: "เบอร์โทร 2" , width: 90},
  { key: "ser_hist_no", name: "เลขการบริการ" , width: 100},
  { key: "ser_type", name: "ประเภทบริการ" ,width:100},
  { key: "km_out", name: "เลขกิโลออก" ,width:90},
  { key: "month_alert_no", name: "จำนวนเดือนติดตาม" ,width:150},
  { key: "problem", name: "อาการที่พบ" ,width:400},
  { key: "alert_level", name: "การแจ้งเตือน", width: 170 , editor: alertLevellEditor},
  { key: "alert_detail", name: "รายละเอียดการแจ้งเตือน" ,width:400},
  { key: "alert_status", name: "สถานะการแจ้งเตือน",width:220, editor: alertStatuslEditor},
  { key: "remark", name: "หมายเหตุ" , width:400,editable: true},
  //{ key: "issueType", name: "Task Type", editor: IssueTypeEditor }
].map(c => ({ ...c, ...defaultColumnProperties }));

const rows = [
  { id: 1, ser_out_dt: "10/05/2019", company: "บจก. ที.พี.ดรัก แลบบอราทอรี่ส์ (1969)", lice_pl: "7กฌ 343", model: "150NX-Pert HD 4x2", 
  cont1:"cont1", tel1:"0614155453", cont2:"cont2", tel2:"tel2", ser_hist_no:"ser_hist_no", ser_type:"ser_type",
  km_out:"1,234,567", month_alert_no:"month_alert_no", problem:"problem", alert_level:"alert_level", alert_detail:"alert_detail",
  alert_status:"alert_status",remark:"remark",issueType: "Bug"},
  { id: 2, ser_out_dt: "10/05/2019", company: "Bug", lice_pl: "7กฌ 343", model: "model", 
  cont1:"cont1", tel1:"tel1", cont2:"cont2", tel2:"tel2", ser_hist_no:"ser_hist_no", ser_type:"ser_type",
  km_out:"km_out", month_alert_no:"month_alert_no", problem:"problem", alert_level:"alert_level", alert_detail:"alert_detail",
  alert_status:"alert_status",remark:"remark",issueType: "Story"},
  { id: 3, ser_out_dt: "10/05/2019", company: "บจก. ที.พี.ดรัก แลบบอราทอรี่ส์ (1969)", lice_pl: "7กฌ 343", model: "150NX-Pert HD 4x2", 
  cont1:"cont1", tel1:"0614155453", cont2:"cont2", tel2:"tel2", ser_hist_no:"ser_hist_no", ser_type:"ser_type",
  km_out:"1,234,567", month_alert_no:"month_alert_no", problem:"problem", alert_level:"alert_level", alert_detail:"alert_detail",
  alert_status:"alert_status",remark:"remark",issueType: "Bug"},
  { id: 4, ser_out_dt: "10/05/2019", company: "Bug", lice_pl: "7กฌ 343", model: "model", 
  cont1:"cont1", tel1:"tel1", cont2:"cont2", tel2:"tel2", ser_hist_no:"ser_hist_no", ser_type:"ser_type",
  km_out:"km_out", month_alert_no:"month_alert_no", problem:"problem", alert_level:"alert_level", alert_detail:"alert_detail",
  alert_status:"alert_status",remark:"remark",issueType: "Story"},
  
];

const EmptyRowsView = () => {
  const message = "No data to show";
  return (
    <div
      style={{ textAlign: "center", backgroundColor: "#ddd", padding: "100px" }}
    >

      <h3>{message}</h3>
    </div>
  );
};

class Maintable extends React.Component {
  
  state = { rows };
  
  onGridRowsUpdated = ({ fromRow, toRow, updated }) => {
    this.setState(state => {
      const rows = state.rows.slice();
      for (let i = fromRow; i <= toRow; i++) {
        rows[i] = { ...rows[i], ...updated };
      }
      console.log(fromRow,toRow)
      console.log(updated)
      console.log(rows)
      return { rows };
    });
  };

  onClickUpdate= () => {
    console.log(this.props.alert_type)
    console.log(this.state)
  };

  render() {
    return (
      <div>
        <div><h2>
                รายการแจ้งเตือน {this.props.alert_type}
                <Button onClick={this.onClickUpdate} variant="outlined" size="large" color="primary" style={{ marginLeft:"1rem"}}>
                    อัพเดทข้อมูล
                </Button>
              </h2>
        </div>
        
        <div style={{ marginTop : '1rem'}}>
          <ReactDataGrid 
            columns={columns}
            rowGetter={i => this.state.rows[i]}
            rowsCount={this.state.rows.length}
            onGridRowsUpdated={this.onGridRowsUpdated}
            enableCellSelect={true}
            emptyRowsView={EmptyRowsView}
          />
        </div>
      </div>
    );
  }
}

export default Maintable