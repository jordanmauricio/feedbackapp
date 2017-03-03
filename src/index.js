import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from "react-router";
import App from './App';
import Home from './Home.jsx';
import './index.css';

ReactDOM.render((
  <Router history={browserHistory}>
  	<Route path="/" component={App} />
  	<Route path="/home" component={Home} />
  </Router>
  ), document.getElementById('root'))
