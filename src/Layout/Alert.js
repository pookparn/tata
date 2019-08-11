import React from 'react'
import NavBar from '../components/Navbars/Navbar'
import Maintable from '../components/Tables/Maintable'
class Alert extends React.Component {
  render() {
    return (
      <div>
        <NavBar />
        <div style={{ marginLeft : '1rem', marginTop : '1.5rem'}}>
            <Maintable alert_type="type1"/>
        </div>
        <div style={{ marginLeft : '1rem', marginTop : '1.5rem'}}>
            <Maintable alert_type="type2"/>
        </div>
      </div>
    )
  }
}
export default Alert