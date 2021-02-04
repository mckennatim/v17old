import React,{useContext, useState} from 'react';
//import {Routes, Route,Link} from 'react-router-dom';
import {AProvider, AContext} from '../contexts/acontext'

export const App=(props)=> {
  const[page, setPage] = useState('jobs')
  const{title}=props

  const renderContent=()=>{
    if (page=='addjob'){
      return(
        <div>
          {page}
          <AddJob/>
        </div>
      )
    }
    if (page=='jobs'){
      return(
        <div>
          {page}
          <Jobs/>
        </div>
      )
    }
    if (page=='both'){
      return(
        <div>
          {page}
          <Jobs/>
          <AddJob/>
        </div>
      )
    }
  }

  return (
    <AProvider>
      <div>
        <h1>{title}</h1>
        <ul>
            <li>
              <a onClick={()=>setPage('jobs')}>jobs</a>
            </li>
            <li>
              <a onClick={()=>setPage('addjob')}>addjob</a>
            </li>
            <li>
              <a onClick={()=>setPage('both')}>both</a>
            </li>
          </ul>
        {renderContent()}
        {/* <Routes>
          <Route path="/" element={<Jobs />} />
          <Route path="addjob" element={<AddJob />} />
        </Routes> */}
      </div>
    </AProvider>
  );
}


const Jobs =()=>{
  const{foundJobs, setFoundJobs, setJob2edit, job2edit} = useContext(AContext)
  const[job, setJob]=useState('')

  const onEnter =(e)=>{
    console.log('e.key: ', e.key)
    if (e.key === 'Enter') {
      setJob2edit(job)
    }
  }

  const renderJobs=()=>{
    return(
      <div>
        <div>{job2edit}</div>
        <input type="text" onKeyDown={onEnter}   onChange={(e)=>setJob(e.target.value)}/>
      </div>
    )
  }

  return(
    <div>Jobs
      {renderJobs()}
    </div>
  )
}

const AddJob = ()=>{
  const{foundJobs, setFoundJobs, setJob2edit, job2edit} = useContext(AContext)
  return(
    <div>AddJob
      <div>{job2edit}</div>
    </div>
  )
}