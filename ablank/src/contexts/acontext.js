import React, { createContext, useReducer } from 'react';

const aInitState = {
  job2edit:'',
  foundJobs:[]
}

export const AContext = createContext(aInitState)

export const AReducer= (state,action)=>{
  switch(action.type){
    case 'sETjOB2eDIT':
      return{...state, job2edit:action.payload}
    case 'sETfOUNDjOBS':
      return {...state, foundJobs:action.payload}
  }
}

export const AProvider = ({children})=>{
  const [state, dispatch] = useReducer(AReducer, aInitState)

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
      setFoundJobs,
      setJob2edit
    }}>
      {children}
    </AContext.Provider>
  )
}