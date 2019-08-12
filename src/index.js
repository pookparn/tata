import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
// import App from './App'
import Users from './users'
import Contact from './contact'
import Notfound from './notfound'
import Alert from './Layout/Alert'
const routing = (
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={Alert} />
        <Route path="/users" component={Users} />
        <Route path="/contact" component={Contact} />
        <Route component={Notfound} />
      </Switch>
    </div>
  </Router>
)
ReactDOM.render(routing, document.getElementById('root'))