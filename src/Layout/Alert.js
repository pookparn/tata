import React from 'react'
import NavBar from '../components/Navbars/Navbar'
//import Maintable from '../components/Tables/Maintable'

import Onetable from '../components/Tables/Onetable'
import axios from 'axios'
var rows = []
var rows2 = []
var rows3 = []
class Alert extends React.Component {
  state = { rows };

  componentDidMount() {
    console.log("MAIN")
    axios.get('http://localhost:8788/alertlist')
      //.then(response => this.setState({rows}))
      .then(response => {
        this.setState(state => {
          var rows = state.rows.slice();
          if (this.state.rows.length === 0) {
            for (let i = 0; i < response.data.length; i++) {

              rows[i] = { ...rows[i], ...response.data[i], ...{ "id": i + 1 } };
              //console.log({ ...rows[i], ...updated })
            }
          }
          return { rows };
        });

      })
      // .then(() => {
      //   axios.get('http://localhost:8788/alertlist')
      //     //.then(response => this.setState({rows}))
      //     .then(response => {
      //       this.setState(state => {
      //         var rows2 = state.rows2.slice();
      //         if (this.state.rows2.length === 0) {
      //           for (let i = 0; i < response.data.length; i++) {

      //             rows2[i] = { ...rows2[i], ...response.data[i], ...{ "id": i + 1 } };
      //             //console.log({ ...rows[i], ...updated })
      //           }
      //         }
      //          rows =this.state.rows
      //          rows3 = this.state.rows3
      //         return { rows, rows2, rows3 };
      //       });

      //     })
      // })
  }

  render() {
    console.log("state >>>",JSON.stringify(this.state))
    return (
      <div>
        <NavBar />
        <div style={{ marginLeft: '1rem', marginTop: '1.5rem' }}>
          <Onetable alert_type="งานซ่อม  (7 วัน)" testdata={this.state.rows} />
        </div>
        {/* <div style={{ marginLeft: '1rem', marginTop: '1.5rem' }}>
          <Onetable alert_type="งานเช็คระยะ (7 วัน)" testdata={this.state.rows2} />
        </div> */}
        {/* <div style={{ marginLeft : '1rem', marginTop : '1.5rem'}}>
            <Maintable alert_type="งานซ่อม  (7 วัน)"/>
        </div>
        
        <div style={{ marginLeft : '1rem', marginTop : '1.5rem'}}>
            <Maintable alert_type="งานเช็คระยะ (7 วัน)"/>
        </div>
        <div style={{ marginLeft : '1rem', marginTop : '1.5rem'}}>
            <Maintable alert_type="เช็คระยะ"/>
        </div> */}
      </div>
    )
  }
}
export default Alert