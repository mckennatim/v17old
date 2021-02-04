/*webpack 5 with react */
import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as Router} from 'react-router-dom';
import {NavCtrl} from './components/NavCtrl.jsx'
 
const title = 'timecards - jobs app';

ReactDOM.render(
  <Router>
    <NavCtrl title={title}/>
  </Router>,
  document.getElementById('app')
);
