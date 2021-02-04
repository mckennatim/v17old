/*webpack 5 with react */
import React from 'react';
import ReactDOM from 'react-dom';
//import {HashRouter as Router} from 'react-router-dom';
import {App} from './components/App.jsx'
// import { createHashHistory } from 'history';
// let history = createHashHistory();
 
const title = 'Timecards - Jobs';



ReactDOM.render(
  <App title={title} />,
  document.getElementById('app')
);
