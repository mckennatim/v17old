/*webpack 5 with react */
import React from 'react';
import ReactDOM from 'react-dom';
import {App} from './components/App.jsx'
 
const title = 'React with Webpack and Babel';

console.log('hello webpack dod')
 
ReactDOM.render(
  <App title={title}/>,
  document.getElementById('app')
);


/*index.js without react  
console.log('hello webpack dod')
*/