import React from 'react'
import ReactDOM from 'react-dom'

var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const getDateInfo=(d)=> {
  //https://stackoverflow.com/questions/6117814/get-week-of-year-in-javascript-like-in-php
  d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
  var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
  var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
  const dao = {yr:d.getUTCFullYear(), week:weekNo, datestr:''}
  return dao
}

const getDateOfWeek=(w, y)=> { //ISO date starts on Monday
  var simple = new Date(y, 0, 1 + (w - 1) * 7);
  var dow = simple.getDay();
  var ISOweekStart = simple;
  if (dow <= 4)
      ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1);
  else
      ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay());
  return ISOweekStart.toString().split(' 00')[0]
}

const makeDateStr=()=>{
  console.log('in make')
}

const geta=(dotstr, obj)=>{
  return dotstr.split(".")
    .slice(1)
    .reduce((xs,x)=>(xs && xs[x]) ? xs[x] : null , obj)
}

const deepObjModify=(dotstr, val, obj)=>{
  if(geta(dotstr, obj)){
    var keyarray = dotstr.split(".")
    var ls = keyarray.slice(-1)[0]
    keyarray
      .slice(1) 
      .reduce((xs,x)=>{
        if(xs && xs[x]) {
          if(x==ls){
            xs[x]=val
          }
          return xs[x]
        }
      }, obj)
    let newobj = {...obj}
    return newobj
  } else {
    return null
  }
}

const log = console.log.bind(console);

function el(id){
  return document.getElementById(id)
}

const dog = ()=>{
  return 'girl'
}

const render = (pg, para)=>{
  ReactDOM.render(React.createElement(pg, para), document.getElementById('rt')) 
}

const parseQuery = (query)=>{
  var obj = {};
  query.split('&')
    .map((term)=>{
      var ar = term.split('=')
      obj[ar[0]]=ar[1]
    }
  )
  return obj
}

export {geta, dog, render, log, parseQuery, el, deepObjModify, getDateInfo, getDateOfWeek}  
