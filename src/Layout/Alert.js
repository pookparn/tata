import React from 'react'
import NavBar from '../components/Navbars/Navbar'
import Maintable from '../components/Tables/Maintable'

import Onetable from '../components/Tables/Onetable'

class Alert extends React.Component {
  render() {
    return (
      <div>
        <NavBar />
        <div style={{ marginLeft : '1rem', marginTop : '1.5rem'}}>
            <Onetable alert_type="งานซ่อม  (7 วัน)"/>
        </div>
        <div style={{ marginLeft : '1rem', marginTop : '1.5rem'}}>
            <Maintable alert_type="งานซ่อม  (7 วัน)"/>
        </div>
        
        <div style={{ marginLeft : '1rem', marginTop : '1.5rem'}}>
            <Maintable alert_type="งานเช็คระยะ (7 วัน)"/>
        </div>
        <div style={{ marginLeft : '1rem', marginTop : '1.5rem'}}>
            <Maintable alert_type="เช็คระยะ"/>
        </div>
      </div>
    )
  }
}
export default Alert