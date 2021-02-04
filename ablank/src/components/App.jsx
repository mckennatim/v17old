import React,{useContext, useEffect, useState} from 'react';
import {AProvider, AContext} from '../contexts/acontext'
import { createHashHistory } from 'history';
let history = createHashHistory();

export const App=(props)=> {
  console.log('APP RUN')
  console.log('window.location.hash: ', window.location.hash)
  const[page, setPage] = useState()
  const{title}=props

  window.onhashchange = ()=>{
    console.log('window.location.hash: ', window.location.hash)
    setPage(window.location.hash.substring(1))
  }

  const handlePage=(p)=>()=>{
    console.log('p: ', p)
    history.push(p)
    setPage(p)
  }

  return (
    <AProvider>
      <div>
        <Ctrl title={title} page={page} changePage={handlePage}/>
      </div>
    </AProvider>
  );
}

const Ctrl=(props)=>{
  console.log('CTRL RUN')
  console.log('window.location.hash: ', window.location.hash)
  const{title, page, changePage}=props

  const renderContent=()=>{
    if (page=='/addjob'){
      // history.push('/addjob')
      return(
        <div>
          {page}
          <AddJob/>
        </div>
      )
    }
    if (page=='/jobs'){
      // history.push('/jobs')
      return(
        <div>
          {page}
          <Jobs/>
        </div>
      )
    }
    if (page=='/both'){
      // history.push('/both')
      return(
        <div>
          {page}
          <Jobs/>
          <AddJob/>
        </div>
      )
    }
  }
  return(
    <div>
    <h1>{title}</h1>
    <ul>
        <li>
          <a onClick={changePage('/jobs')}>jobs</a>
        </li>
        <li>
          <a onClick={changePage('/addjob')}>addjob</a>
        </li>
        <li>
          <a onClick={changePage('/both')}>both</a>
        </li>
      </ul>
    {renderContent()}
    {/* <Routes>
      <Route path="/" element={<Jobs />} />
      <Route path="addjob" element={<AddJob />} />
    </Routes> */}
  </div>    
  )
}

const Jobs =()=>{
  const{foundJobs, setFoundJobs, setJob2edit, job2edit} = useContext(AContext)
  const[job, setJob]=useState('')

  const onEnter =(e)=>{
    if (e.key === 'Enter') {
      setJob2edit(job)
    }
  }

  const renderJobs=()=>{
    const jobs = foundJobs.map((j,i)=>{
      return (
        <li key={j}>
          <span> {j.job} </span>
          <span> {j.category} </span>
        </li>
      )
    })
    return(
      <div>
        <div>{job2edit}</div>
        <input type="text" onKeyDown={onEnter}   onChange={(e)=>setJob(e.target.value)}/>
        <ul>
          {jobs}
        </ul>
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

  const update =()=>{
    setFoundJobs([
      {job:job2edit, category:''},
      {job:job2edit, category:'maintain'},
      {job:job2edit, category:'treework'}
    ])
  }
  return(
    <div>AddJob
      <div>{job2edit}</div>

      <button onClick={update}>update</button>
    </div>
  )
}



const adata = {
  afJobs: [],
  aJob2Edit:''
}