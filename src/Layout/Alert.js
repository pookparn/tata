import React from 'react'
import NavBar from '../components/Navbars/Navbar'
//import Maintable from '../components/Tables/Maintable'


import Testtable from '../components/Tables/Alerttable'


class Alert extends React.Component {
  constructor(props) {
      super(props);
    this.state = {
      rows: []
    };
  }

  componentDidMount() {
  }

  render() {
    return (
      <div >
        <NavBar />
        <div style={{ marginLeft: '1rem', marginTop: '1rem' }}>
          <Testtable alert_type="งานซ่อม  (7 วัน)" tab_no="1" />
        </div>
        <div style={{ marginLeft: '1rem', marginTop: '1.5rem' }}>
          <Testtable alert_type="งานเช็คระยะ (7 วัน)" tab_no="2" />
        </div>
        {/* <div style={{ marginLeft: '1rem', marginTop: '1.5rem' }}>
          <Onetable alert_type="งานเช็คระยะ (7 วัน)" testdata={this.state.rows2} />
        </div>  */}
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