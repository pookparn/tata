import React from "react";
import ReactDOM from "react-dom";
import ReactDataGrid from "react-data-grid";
import { Editors } from "react-data-grid-addons";

//import "./styles.css";

const COLUMN_WIDTH = 140;
const { DropDownEditor } = Editors;
const issueTypes = [
  { id: "bug", value: "Bug" },
  { id: "epic", value: "Epic" },
  { id: "story", value: "Story" }
];
const IssueTypeEditor = <DropDownEditor options={issueTypes} />;

const columns = [
  { key: "id", name: "ลำดับ",frozen: true,width: 50},
  { key: "ser_out_dt", name: "วันที่รับรถ" ,frozen: true,width: 100, editable: true},
  { key: "company", name: "บริษัท" ,frozen: true,width: 200},
  { key: "lice_pl", name: "ทะเบียน" ,frozen: true,width: 100},
  { key: "model", name: "รุ่นรถ" ,frozen: true,width: 100},
  { key: "cont1", name: "ผู้ติดต่อ 1" },
  { key: "tel1", name: "โทรศัพท์ติดต่อ 1" },
  { key: "cont2", name: "ผู้ติดต่อ 2" },
  { key: "tel2", name: "โทรศัพท์ติดต่อ 2" },
  { key: "ser_hist_no", name: "เลขประวัติการเข้ารับบริการ" },
  { key: "ser_type", name: "ประเภทการบริการ" },
  { key: "km_out", name: "เลขกิโลออก" },
  { key: "month_noti_no", name: "จำนวนเดือนติดตาม" },
  { key: "problem", name: "อาการที่พบ" },
  { key: "noti_info", name: "การแจ้งเตือน" },
  { key: "noti_detail", name: "รายละเอียดการแจ้งเตือน" },
  { key: "noti_status", name: "สถานะการแแจ้งเตือน" },
  { key: "remark", name: "หมายเหตุ" },
  { key: "issueType", name: "Task Type", editor: IssueTypeEditor }
];

const rows = [
  { id: 0, ser_out_dt: "10/05/2019", company: "Bug", lice_pl: "7กฌ 343", model: "model", 
  cont1:"cont1", tel1:"tel1", cont2:"cont2", tel2:"tel2", ser_hist_no:"ser_hist_no", ser_type:"ser_type",
  km_out:"km_out", month_noti_no:"month_noti_no", problem:"problem", noti_info:"noti_info", noti_detail:"noti_detail",
  noti_status:"noti_status",remark:"remark",issueType: "Bug"},
  { id: 1, ser_out_dt: "10/05/2019", company: "Bug", lice_pl: "7กฌ 343", model: "model", 
  cont1:"cont1", tel1:"tel1", cont2:"cont2", tel2:"tel2", ser_hist_no:"ser_hist_no", ser_type:"ser_type",
  km_out:"km_out", month_noti_no:"month_noti_no", problem:"problem", noti_info:"noti_info", noti_detail:"noti_detail",
  noti_status:"noti_status",remark:"remark",issueType: "Story"},
  { id: 2, title: "Task 3", issueType: "Epic", complete: 60 }
];

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
      return { rows };
    });
  };
  render() {
    return (
      <div>
        <ReactDataGrid
          columns={columns}
          rowGetter={i => this.state.rows[i]}
          rowsCount={3}
          onGridRowsUpdated={this.onGridRowsUpdated}
          enableCellSelect={true}
        />
      </div>
    );
  }
}

export default Maintable