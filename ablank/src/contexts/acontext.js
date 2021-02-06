import React, { createContext, useReducer, useState } from 'react';
import { createHashHistory } from 'history';
let history = createHashHistory();

const aInitState = {
  job2edit:'',
  foundJobs:[],
  dev:{},
  page:''
}



export const AContext = createContext(aInitState)



export const AReducer= (state,action)=>{
  switch(action.type){
    case 'sETjOB2eDIT':
      return{...state, job2edit:action.payload}
    case 'sETfOUNDjOBS':
      return {...state, foundJobs:action.payload}
    case 'sETdEV' :
      let ws = window.innerWidth
      let idx
      const types= [
        {dev:'watch', panes:1}, 
        {dev:'phone', panes:1}, 
        {dev:'phonel', panes:2}, 
        {dev:'tablet', panes:2}, 
        {dev:'tabletL', panes:3}, 
        {dev:'laptop', panes:3}, 
        {dev:'monitor', panes:4} 
      ]
      const sizes= [300, 500, 600, 800, 900, 1800, 3000]
      sizes.reduce((prev, curr, i)=>{ 
        if(prev < ws && ws <= curr){idx = i}
        return curr 
      }, 0);
      return {...state, dev:types[idx]
  }}
}

export const AProvider = ({children})=>{
  const [state, dispatch] = useReducer(AReducer, aInitState)
  const [devInfo,setDevInfo] =useState({dev:'phone', panes:1})
  const[page, setPage] = useState()

  const getDevInfo = ()=> {
    let ws = window.innerWidth
    let idx
    const types= [
      {dev:'watch', panes:1}, 
      {dev:'phone', panes:1}, 
      {dev:'phonel', panes:2}, 
      {dev:'tablet', panes:2}, 
      {dev:'tabletL', panes:3}, 
      {dev:'laptop', panes:3}, 
      {dev:'monitor', panes:4} 
    ]
    const sizes= [300, 500, 600, 800, 900, 1800, 3000]
    sizes.reduce((prev, curr, i)=>{ 
      if(prev < ws && ws <= curr){idx = i}
      return curr 
    }, 0);
    return types[idx]
  }

  const handlePage=(p)=>()=>{
    console.log('p: ', p)
    history.push(p)
    setPage(p)
  }

  window.onresize=()=>{
    setDevInfo(getDevInfo())
  }
  window.onhashchange = ()=>{
    console.log('window.location.hash: ', window.location.hash)
    setPage(window.location.hash)
  }

  function setJob2edit(job2edit) {
    dispatch({
        type: 'sETjOB2eDIT',
        payload: job2edit
    });
  }

  function setFoundJobs(foundJobs){
    dispatch({
      type: 'sETfOUNDjOBS',
      payload: foundJobs
    })
  }

  return(
    <AContext.Provider value={{
      foundJobs: state.foundJobs,
      job2edit: state.job2edit,
      devInfo:devInfo,
      page:page,
      handlePage,
      setFoundJobs,
      setJob2edit
    }}>
      {children}
    </AContext.Provider>
  )
}