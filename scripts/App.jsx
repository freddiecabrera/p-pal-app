import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, hashHistory, IndexRoute } from 'react-router'
import Main from './components/Main'
import Welcome from './components/Welcome'
import Locales from './components/Locales'

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path='/' component={Main}>
      <IndexRoute component={Welcome} />
      <Route path='locales' component={Locales} />
    </Route>
  </Router>
  , document.getElementById('app')
)
