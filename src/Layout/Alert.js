import React from 'react'
import NavBar from '../components/Navbars/Navbar'
import Alerttable from '../components/Tables/Alerttable'


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
          <Alerttable alert_type="งานซ่อม  (7 วัน)" tab_no="1" />
        </div>
        <div style={{ marginLeft: '1rem', marginTop: '1.5rem' }}>
          <Alerttable alert_type="งานเช็คระยะ (7 วัน)" tab_no="2" />
        </div>
        <div style={{ marginLeft: '1rem', marginTop: '1.5rem' }}>
          <Alerttable alert_type="เช็คระยะ" tab_no="3" />
        </div>
      </div>
    )
  }
}
export default Alert