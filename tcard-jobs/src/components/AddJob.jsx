import React,{useEffect, useState, useReducer} from 'react'
import {useNavigate} from 'react-router-dom'
import {fetchJob, postJob} from '../fetches'
import Form from 'muicss/lib/react/form';// eslint-disable-line 
import Input from 'muicss/lib/react/input';// eslint-disable-line 
import Button from 'muicss/lib/react/button';
import Checkbox from 'muicss/lib/react/checkbox';
// import {Jobs}from './Jobs'

const blajob = {job:'', categories:'[]', hrs:'', labor:'',archived:0,default:0, defcat:0}

const AddJob =({job2edit, displayEditedJobs})=>{
  console.log('job2edit: ', job2edit)
  const navigate=useNavigate()
  const [beingEdited, dispatchBeingEdited]=useReducer(beingEditedReducer, blajob)

  

  const updateJob =()=>{
    console.log('beingEdited: ', beingEdited)
    const retJobs = expandEditedJobs()
    if(retJobs.length==0){
      window.alert("You need at leas a name for the job to save")
    }else{
      displayEditedJobs(retJobs)
      saveJob()
      navigate("/")
    }
  }

  const expandEditedJobs=()=>{
    const recs = []
    if (beingEdited.job.length>1){
      if (beingEdited.jobwoCat || beingEdited.categories.length < 4){
        recs.push({job:beingEdited.job, category:'', default:beingEdited.default})
      }
      if (beingEdited.categories.length>4){
        const catarr = JSON.parse(beingEdited.categories)
        catarr.map(c=>{
          recs.push({job:beingEdited.job, category:c.cat, default:c.def})
        })
      }
    }
    return recs
  }

  const saveJob=()=>{
    postJob(beingEdited)
    .then((res)=>console.log('res: ', res))
  }
  

  useEffect(()=>{
    getJob()
  },[])

  const getJob=()=>{
    if(job2edit.length>0){
      fetchJob(job2edit)
      .then((res)=>{
        console.log('res: ', res)
        dispatchBeingEdited({type:'replace', payload:res.job})
      })
    }
  }

  const addRec=()=>{
    console.log('in addRec!!!!!')
    dispatchBeingEdited({type:'changeCatStr', payload:{cat:'', hrs:'', labor:'', def:0}})
    console.log('beingEdited.categories: ', beingEdited.categories)
  }
  
  const renderCategories=()=>{
    console.log('beingEdited.categories.length: ', beingEdited.categories.length)
    const catarr =JSON.parse(beingEdited.categories)
    const tablarr = catarr.map((c,i)=>{
      return(
      <tr  key={i}>
         <td width="10%" ><a name={i}
         onClick={(e)=>dispatchBeingEdited(
            {type:'deleteCat', payload:{idx:e.target.name}}
          )           
         }>x</a></td> 
        <td width="40%" ><Input name={i} placeholder='category'
        value={c.cat} 
        onChange={(e)=>dispatchBeingEdited(
          {type:'changeCat', payload:{idx:e.target.name, field:e.target.value}}
        )}/></td>
        <td width="15%" ><Input name={i} placeholder='hrs'
        value={c.hrs} 
        onChange={(e)=>dispatchBeingEdited(
          {type:'changeCatHrs', payload:{idx:e.target.name, field:e.target.value}}
        )}/></td>
        <td width="20%" ><Input name={i} placeholder='labor$'
        value={c.labor} 
        onChange={(e)=>dispatchBeingEdited(
          {type:'changeCatLabor', payload:{idx:e.target.name, field:e.target.value}}
        )}/></td>
        <td width="15%" ><Checkbox name={i} label="default"
        checked={c.def} 
        onChange={(e)=>dispatchBeingEdited(
          {type:'changeCatCk', payload:{idx:e.target.name, field:e.target.checked}}
        )}/></td>
      </tr>
      )
    })
    return(
      <div>
        <Button  variant='flat' onClick={addRec}><span>&#43; Category</span></Button>
        <span>
          {beingEdited.defcat}  incl.job w/o cat:
          <input type="checkbox" 
          checked={beingEdited.jobwoCat} 
          onChange={(e)=>dispatchBeingEdited(
            {type:'changeWoCat', payload:e.target.checked*1}
          )}
          />
        </span>
        {beingEdited.categories.length>3 && 
        <table className="mui-table">
          <tbody>
            {tablarr}
          </tbody>
        </table>
        }
      </div>
    )
  }



  const renderForm = ()=>{
    console.log('beingEdited: ', beingEdited)
    return(
      <div>
        {/* <Jobs firstday={1} allJobs={allJobs} sendJob2edit={handleJob2edit} defaultFound={defaultFound}/> */}
        <legend>Add or Update Job</legend>
        <table className="mui-table">
          <tbody><tr>
            <td width="85%">
            <Input placeholder="Job" value={beingEdited.job} onChange={(e)=>dispatchBeingEdited({type:'changeJob', payload:e.target.value})}/>
            </td>
            <td width="15%" ><Checkbox label="default"
            checked={beingEdited.default} 
            onChange={(e)=>dispatchBeingEdited(
              {type:'changeCk', payload:e.target.checked}
            )}/></td>
            </tr></tbody>
        </table>
        <table className="mui-table">
          <tbody>
          <tr>
          <td width="50%" key="0">
          <Input placeholder="Bid Hours " value={beingEdited.hrs==null ? '' :beingEdited.hrs} onChange={(e)=>dispatchBeingEdited({type:'changeHrs', payload:e.target.value})}/>
          </td><td width="50%" key="1">
          <Input placeholder="Bid Labor $" value={beingEdited.labor==null ? '' : beingEdited.labor} onChange={(e)=>dispatchBeingEdited({type:'changeLabor', payload:e.target.value})}/>
          </td>
          </tr></tbody>
        </table>
        
        {renderCategories()}
        
        <Button variant="raised" onClick={updateJob}>update</Button>
        <span> archive </span>
        <input type="checkbox" 
          checked={beingEdited.archived}
          onClick={(e)=>
            dispatchBeingEdited({type:'archive', payload:e.target.checked})
          }
        />  
      </div>
    )
  }

  return(
    <div style={style.outer}>
      {renderForm()}
    </div>
  )
}

export{AddJob}

const beingEditedReducer=(state,action)=>{
  let catarr =[]
  let catstr=''
  console.log('state: ', state)
  console.log('action: ', action)
  switch (action.type){
    case 'replace':
      return action.payload
    case 'changeJob':
      return {...state, job:action.payload}
    case 'changeHrs':
      return {...state, hrs:action.payload}
    case 'changeLabor':
      return {...state, labor:action.payload}
    case 'changeCk':
      return {...state, default:action.payload*1}
    case 'changeWoCat' : 
      return {...state, jobwoCat:action.payload}
    case 'archive':
      if(action.payload){
        window.alert('check archive and job will no longer show in this app')
      }
      return {...state, archived:action.payload*1}  
    case 'changeCatStr':
      catarr = JSON.parse(state.categories)
      console.log('catarr', catarr)
      console.log('catstr: ', catstr)
      catarr.push(action.payload)
      catstr =JSON.stringify(catarr)
      console.log('catarr', catarr)
      console.log('catstr: ', catstr)
      state.categories = catstr
      console.log('state: ', state)
      action.type=''
      return {...state}
    case 'changeCat':
      catarr = JSON.parse(state.categories)
      catarr[action.payload.idx].cat=action.payload.field
      catstr =JSON.stringify(catarr)
      return {...state, categories:catstr}
    case 'changeCatHrs':
      catarr = JSON.parse(state.categories)
      catarr[action.payload.idx].hrs=action.payload.field
      catstr =JSON.stringify(catarr)
      return {...state, categories:catstr}
    case 'changeCatLabor':
      catarr = JSON.parse(state.categories)
      catarr[action.payload.idx].labor=action.payload.field
      catstr =JSON.stringify(catarr)
      return {...state, categories:catstr}  
    case 'changeCatCk':
      catarr = JSON.parse(state.categories)
      catarr[action.payload.idx].def=action.payload.field*1
      const dc = isCkCat(catarr)
      catstr =JSON.stringify(catarr)
      return {...state, categories:catstr, defcat:dc*1}  
    case 'deleteCat':
      catarr = JSON.parse(state.categories)
      const newarr = catarr.filter((c,i)=>i!=action.payload.idx)
      const rc = isCkCat(newarr)
      catstr =JSON.stringify(newarr)
      return {...state, categories:catstr, defcat:rc*1}  
    default:  
      return state    
  }
}

const isCkCat =(arr)=>{
  const f = arr.filter(a=>a.def)
  console.log('f: ', f)
  return f.length>0
}

const style = {
  outer:{
    overflow:'hidden',
    margin: '2px 10px 10px 10px',
    padding: '4px',
    background: '#99CCFF'
  },
  info:{
    div:{
      float:'right',
      textAlign:'right'
    },
    span:{
      fontSize: '200%',
      color: 'orange'
    }
  },
  myli :{
    od:{
      overflow:'hidden',
      width: '100%',
      border: '1px solid #ccc'
    },
    ul:{
      textAlign: 'left',
      listStyleType: 'none',
      paddingLeft: '12px'
    },
    li:{
      background: '#99CCCC',
      padding: '6px',
      overflow: 'hidden',
      border: 'solid 1px black'
    },
    idx:{
      float: 'left',
      width: '7%',
      padding: '5px'
    },
    icon:{
      fontSize: '18px'
    },
  }
}

  // const expandCats=(ajob)=>{
  //   const cats = ajob.categories.split(',')
  //   const na = []
  //   const exjob = cats.map((j)=>{
  //   })
  // }

  // function contractCats(jobs){
  //   if(!jobs){
  //     jobs=[{job:'new', category:''}]
  //   }
  //   jobs[0].categories=''
  //   console.log('jobs: ', jobs)
  //   const job = jobs.reduce((acc, j, i)=>{
  //     console.log('acc,j: ', acc,j)
  //     acc.categories = `${acc.categories},${j.category}`
  //     console.log('acc: ', acc)

  //   },[jobs[0]])
  //   console.log('jobs: ', jobs)
  //   return jobs
  // }