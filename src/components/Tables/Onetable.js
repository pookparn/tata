import React from 'react';
import MaterialTable from 'material-table';

export default function MaterialTableDemo(props) {
  const [state, setState] = React.useState({
    columns: [
      { title: 'Name', field: 'name', editable: 'never', cellStyle: { textAlign: "center", fontSize: '14px', width: 200 } },
      { title: 'Surname', field: 'surname' },
      { title: 'Birth Year', field: 'birthYear', type: 'numeric' },
      {
        title: 'Birth Place',
        field: 'birthCity',
        lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
      },
      {
        title: 'test',
        field: 'test',
        lookup: { "a": 'a', "b": 'b' }
      }
    ],
    data: [
      { name: 'อุดมวรรณ', surname: 'Baran', birthYear: 1987, birthCity: 63, test: "a" },
      { name: 'Zerya Betül', surname: 'Baran', birthYear: 2017, birthCity: 34, test: "b" },
    ],
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