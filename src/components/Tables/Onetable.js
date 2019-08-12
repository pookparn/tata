import React from 'react';
import MaterialTable from 'material-table';


export default function MaterialTableDemo(props) {

  console.log(">>>>>",props.testdata)
  const defaultColumnProperties = {
    cellStyle: { textAlign: "center", fontSize: '14px'}
  };

  var col = [ 
    { field: "id", title: "ลำดับ", cellStyle: { textAlign: "center", fontSize: '14px', width: 100 }},
    { field: "ser_out_dt", title: "วันที่รับรถ", cellStyle: { textAlign: "center", fontSize: '14px', width: 200 }},
    { field: "company", title: "บริษัท", cellStyle: { textAlign: "center", fontSize: '14px', width: 200 } },
    { field: "lice_pl", title: "ทะเบียน", cellStyle: { textAlign: "center", fontSize: '14px', width: 200 } },
    { field: "model", title: "รุ่นรถ", cellStyle: { textAlign: "center", fontSize: '14px', width: 200 } },
    { field: "cont1", title: "ผู้ติดต่อ 1", cellStyle: { textAlign: "center", fontSize: '14px', width: 200 }},
    { field: "tel1", title: "เบอร์โทร 1", cellStyle: { textAlign: "center", fontSize: '14px', width: 200 } },
    { field: "cont2", title: "ผู้ติดต่อ 2", cellStyle: { textAlign: "center", fontSize: '14px', width: 200 } },
    { field: "tel2", title: "เบอร์โทร 2", cellStyle: { textAlign: "center", fontSize: '14px', width: 200 } },
    { field: "ser_fix_no", title: "ใบสั่งซ่อม", cellStyle: { textAlign: "center", fontSize: '14px', width: 200 }},
    { field: "ser_type", title: "ประเภทบริการ", cellStyle: { textAlign: "center", fontSize: '14px', width: 200 } },
    { field: "km_out", title: "เลขกิโลออก", cellStyle: { textAlign: "center", fontSize: '14px', width: 200 } },
    { field: "month_alert_no", title: "จำนวนเดือนติดตาม", cellStyle: { textAlign: "center", fontSize: '14px', width: 200 } },
    { field: "problem", title: "อาการที่พบ", cellStyle: { textAlign: "center", fontSize: '14px', width: 200 } },
    { field: "alert_level", title: "การแจ้งเตือน", cellStyle: { textAlign: "center", fontSize: '14px', width: 200 }},
    { field: "alert_detail", title: "รายละเอียดการแจ้งเตือน", cellStyle: { textAlign: "center", fontSize: '14px', width: 200 } },
    { field: "alert_status", title: "สถานะการแจ้งเตือน", cellStyle: { textAlign: "center", fontSize: '14px', width: 200 }},
    { field: "remark", title: "หมายเหตุ", cellStyle: { textAlign: "center", fontSize: '14px', width: 200 } },
    //{ field: "issueType", title: "Task Type", editor: IssueTypeEditor }
  ] //.map(c => ({ ...c, ...defaultColumnProperties }));



  var rows = props.testdata
  console.log("55555",col)
  const [state, setState] = React.useState({
    columns : col,
    // columns: [
    //   { title: 'Name', field: 'name', editable: 'never', cellStyle: { textAlign: "center", fontSize: '14px', width: 200 } },
    //   { title: 'Surname', field: 'surname' },
    //   { title: 'Birth Year', field: 'birthYear', type: 'numeric' },
    //   {
    //     title: 'Birth Place',
    //     field: 'birthCity',
    //     lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
    //   },
    //   {
    //     title: 'test',
    //     field: 'test',
    //     lookup: { "a": 'a', "b": 'b' }
    //   }
    // ],
    data : rows
    // data: [
    //   { name: 'อุดมวรรณ', surname: 'Baran', birthYear: 1987, birthCity: 63, test: "a" },
    //   { name: 'Zerya Betül', surname: 'Baran', birthYear: 2017, birthCity: 34, test: "b" },
    // ],
  });

  var title = "รายการติดตาม " + props.alert_type
  return (
    <div style={{ maxWidth: "99%" }}>
      <MaterialTable
        title={title}
        columns={state.columns}
        data={state.data}

        options={{
          headerStyle: {
            fontSize: '15px',
            textAlign: 'center',
            padding: '20px'
          },
          showTitle:true,
          exportButton:true
        }}
        editable={{
          // onRowAdd: newData =>
          //   new Promise(resolve => {
          //     setTimeout(() => {
          //       resolve();
          //       const data = [...state.data];
          //       data.push(newData);
          //       setState({ ...state, data });
          //     }, 600);
          //   }),
          onRowUpdate: (newData, oldData) =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                const data = [...state.data];
                data[data.indexOf(oldData)] = newData;
                setState({ ...state, data });
                console.log(newData)
              }, 600);
            }),
          // onRowDelete: oldData =>
          //   new Promise(resolve => {
          //     setTimeout(() => {
          //       resolve();
          //       const data = [...state.data];
          //       data.splice(data.indexOf(oldData), 1);
          //       setState({ ...state, data });
          //     }, 600);
          //   }),
        }}
      />
    </div>

  );
}