import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom'

const AddJob =({jobs2edit, dispEditedJobs})=>{
  console.log('jobs2edit: ', jobs2edit)
  const job2edit = contractCats(jobs2edit)
  const navigate=useNavigate()
  const [beingEdited, setBeingEdited]=useState({...job2edit})

  const updatejob =()=>{
    console.log('beingEdited: ', beingEdited)
    beingEdited.job=beingEdited.job+'-phase 2'
    dispEditedJobs([beingEdited])
    navigate("/")
  }

  const expandCats=(ajob)=>{
    const cats = ajob.categories.split(',')
    const na = []
    const exjob = cats.map((j)=>{
    })
  }

  function contractCats(jobs){
    if(!jobs){
      jobs=[{job:'new', category:''}]
    }
    jobs[0].categories=''
    console.log('jobs: ', jobs)
    const job = jobs.reduce((acc, j, i)=>{
      console.log('acc,j: ', acc,j)
      acc.categories = `${acc.categories},${j.category}`
      console.log('acc: ', acc)

    },[jobs[0]])
    console.log('jobs: ', jobs)
    return jobs
  }

  const renderForm = ()=>{
    return(
      <div>
        <h1>addjobs for {beingEdited.job}</h1>
        <button onClick={updatejob}>updatejob</button>
      </div>      
    )
  }

  return(
    <div>
      {renderForm()}
    </div>
  )
}

export{AddJob}