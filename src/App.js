import React from 'react'
import NavBar from './components/Navbars/Navbar'
// import Onetable from './components/Tables/Onetable'
// import Tabletwo from './components/Tables/Tabletwo'
import Maintable from './components/Tables/Maintable'
class App extends React.Component {
  render() {
    return (
      <div>
        <NavBar />

        <Maintable />
      </div>
    )
  }
}
export default App