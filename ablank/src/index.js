/*webpack 5 with react */
import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as Router} from 'react-router-dom';
import {App} from './components/App.jsx'
 
const title = 'Timecards - Jobs';

ReactDOM.render(
  <Router>
    <App title={title}/>,
  </Router>,
  document.getElementById('app')
);
