import React from 'react'
import NavBar from '../components/Navbars/Navbar'
import Custtable from '../components/Tables/Custtable'


class Customer extends React.Component {
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
          <Custtable alert_type="งานซ่อม  (7 วัน)" tab_no="1" />
        </div>
      </div>
    )
  }
}
export default Customer