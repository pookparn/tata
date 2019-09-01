import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
// import App from './App'

import Contact from './contact'
import Notfound from './notfound'
import Alert from './Layout/Alert'
import Customer from './Layout/Customer'
const routing = (
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={Alert} />
        <Route path="/Alert" component={Alert} />
        <Route path="/Customer" component={Customer} />
        <Route path="/contact" component={Contact} />
        <Route component={Notfound} />
      </Switch>
    </div>
  </Router>
)
ReactDOM.render(routing, document.getElementById('root'))