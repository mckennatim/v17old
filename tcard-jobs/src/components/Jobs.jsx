import React,{useState, useEffect, useReducer} from 'react'
import {getDateInfo, getDateOfWeek} from '../utilities/wfuncs'
import {fetchJobs4week, postJob, postJobs} from '../fetches'
import {AddJob} from './AddJob.jsx'

const Jobs =({firstday,allJobs,sendJob2edit,defaultFound})=>{
   
  const blajobs = [{id:'', job:'', category:'', week:'', yr:''}]
  const [foundJobs, setFoundJobs] = useState(defaultFound)
  const [searchStr, setSearchStr] =useState('')
  const[jobs4week, setJobs4week]=useState(blajobs)
  const[dateInfo, dispatchDateInfo] = useReducer(dateInfoReducer, getDateInfo(new Date))

  function dateInfoReducer(state,action){
    switch (action.type){
      case 'changeWeek':
        return {...state, week:action.payload}
      case 'changeYear':
        return {...state, yr:action.payload}
      case 'changeDateStr':
        return {...state, datestr:action.payload}
      default:  
        throw new Error()    
    }
  }

  useEffect(()=>{//once firstday resolves from getSettings
    const nv= getDateOfWeek(dateInfo.week, dateInfo.yr)
    dispatchDateInfo({type:'changeDateStr', payload:nv})
  },[firstday])

  useEffect(()=>{
    getJobs4week(dateInfo.week, dateInfo.yr)
  }, [dateInfo.week, dateInfo.yr]  )

  function getJobs4week(wk, yr) {
    const nv = getDateOfWeek(wk, yr)
    dispatchDateInfo({ type: 'changeDateStr', payload: nv })
    fetchJobs4week(wk, yr)
      .then((res) => {
        const ajobs = res.jobs.map((a)=>{
          a.active=1
          return a
        })
        console.log('ajobs: ', ajobs)
        setJobs4week(ajobs)
      })
  }

  const onChecked=(e)=>{
    console.log('e.target.name, e.target.checked: ', e.target.name, e.target.checked)
    const j4w = [...jobs4week]
    j4w[e.target.name].active = e.target.checked
    // const idx = ojob
    // .findIndex((o)=>o.id==a.id)
    // ojob[idx].active = !a.active*1
    setJobs4week(j4w)
  }

  const save2week=()=>{
    console.log('save2week')
    const savejobs =jobs4week
    .filter(j=>j.active)
    .map((d)=>{
      delete d.id
      delete d.default
      delete d.coid
      d.active=1
      d.week = dateInfo.week
      d.year = dateInfo.yr
      return d
    })
    console.log('savejobs,dateInfo.week,dateInfo.yr: ', savejobs,dateInfo.week,dateInfo.yr)
    postJobs(savejobs, dateInfo.week, dateInfo.yr).then(()=>{
      setJobs4week(savejobs)
    })
  }

  const editJob=(e)=>()=>{
    console.log('foundJobs.filter(j=>j.job==e.kob): ', foundJobs.filter(j=>j.job==e.job))
    const jobs2edit = e.job
    console.log(jobs2edit)
    sendJob2edit(jobs2edit)
  }

  // const onCheckedFound=(j)=>(e)=>{
  //   console.log('j.job, e.target.checked: ', j.job, e.target.checked, e.target.name)
  //   const njobs = [...foundJobs]
  //   njobs[e.target.name].default=e.target.checked
  //   setFoundJobs(njobs)
  //   if(category.length>0){

  //   }
  //   postJob({job:j.job, default:e.target.checked})
  // }

  const search=(e)=>{
    const sel = e.target.value.toLowerCase()
    setSearchStr(sel)
    if(sel.length>1){
      const foundJobs = allJobs.filter((j)=>{
        return j.job.toLowerCase().includes(sel)
      }) 
      setFoundJobs(foundJobs) 

    }else{
      setFoundJobs([])
    }    
  }

  const moveUp=(a)=>()=>{
    const isdup = jobs4week.filter(j=>j.job==a.job && j.category==a.category).length>0
    if (!isdup){
      const b = {...a}
      b.active=1
      setJobs4week([...jobs4week, b])
    }
  }

  const renderHeader = ()=>{
    const{week,yr,firstdow, datestr} = dateInfo
    return(
      <div style={style.he}>
        <div style={style.he.yw}>
          <input type="number" value={yr} style={style.he.yr} onChange={(e)=>dispatchDateInfo({type:'changeYear', payload:e.target.value})}/> 
          wk 
          <input type="number" value={week} 
            onChange={(e)=>dispatchDateInfo({type:'changeWeek', payload:e.target.value})} 
            style={style.he.wk}
          /> 
          <span>
             starting on {firstdow} {datestr}
          </span>
        </div>
        <div> 
          <div style={style.he.get}>
            <button className="btn" onClick={save2week} >sav2wk</button>
          </div>
          <div style={style.he.act}>
          </div>
        </div>
      </div>      
    )
  }

  const renderJobs4week=()=>{
    return(
      <div style={style.myli.od}> 
      <ul style={style.myli.ul}>
      {jobs4week
        //.filter((ajob)=>this.fil(ajob))
        .map((ajob,i)=>{
        return (
        <li  key={i} style={style.myli.li}>
          <div style={style.myli.idx}>
          </div>
          <div style={style.myli.job}> 
             {ajob.job} 
          </div>
          <div style={style.myli.cat}>
            {ajob.category}</div>
          <div style={style.myli.act}>
            <input name={i} style={style.myli.ck} type="checkbox" checked= {ajob.active} onChange={onChecked}></input>
          </div>
        </li >)
      })}
      </ul>
    </div>
    )
  }

  const renderSearched=()=>{
    const jobs = foundJobs.map((ajob,i)=>{
      return (
        <li  key={i} style={style.myli.li}>
          <div style={style.myli.idx}>
            <span style={style.myli.idxsp} onClick={editJob(ajob)}>&#9998;</span>   
          </div>
          <div style={style.myli.job}> 
            <span>{ajob.job} </span>
            {ajob.default==1 && <span style={style.myli.sc}>def</span>}
          </div>
          <div style={style.myli.cat}>
            {ajob.category}</div>

          {/* <div style={style.myli.act}>
            <input name={i} style={style.myli.ck} type="checkbox" checked= {ajob.default} onChange={onCheckedFound(ajob)}></input>
          </div> */}
          <div style={style.myli.up}>
            <span style={style.myli.ar} onClick={moveUp(ajob)}>&#8593;</span>
          </div>
        </li >)
    })
    return(
      <div style={style.myli.ul}>
        <input type="text" placeholder="&#128270; all jobs" value={searchStr} onChange={search}/>
        <ul style={style.myli.ul}>
          {jobs}
        </ul>
      </div>
    )
  }

  return(
    <div>
      {renderHeader()}
      {renderJobs4week()}
      {renderSearched()}
    </div>
  )
}

export{Jobs}

const style = {
  btn:{

  },
  he:{
    margin: '2px 10px 10px 10px',
    height:'70px',
    yw:{
      padding: '1px 1px 10px 1px'
    },
    yr:{
      width: '45px',
      background: 'silver'
    },
    wk:{
      width:'44px',
      background: 'whitesmoke'
    },
    img:{
      
      float:'right',
      width: '30px'
    },
    act:{
      float: 'right'
    },
    get:{
      float:'left'
    },
    but:{
      ac:{
        margin: '4px',
        padding: '4px'
      },
      ia:{
        margin: '4px',
        padding: '4px'
      },
      al:{
        margin: '4px',
        padding: '4px'
      }
    },
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
    sc:{
      fontSize: '9px',
      fonntWeight: 'bold',
      fontVariant: "small-caps",
      background: 'whitesmoke',
      color: 'blue'
    },
    idx:{
      float: 'left',
      width: '7%',
      padding: '5px'
    },
    icon:{
      fontSize: '18px'
    },
    ck:{
      transform: 'scale(1.5)',
      msTransform: 'scale(1.5)',
      WebkitTransform: 'scale(1.5)',
      padding: '10px',
      border: '2px solid black'
    },
    job:{
      padding: '3px',
      width: '40%',
      float: 'left',
      background: '#99CCCC'
    },
    cat:{
      padding: '3px',
      width: '20%',
      float: 'left',
      background: '#99CCCC'
  
    },
    act:{
      width: '10%',
      float: 'right',
      background: '#99CCCC'  
    },
    up:{
      width: '10%',
      float: 'right',
      background: '#99CCCC'  
    },
    ar:{
      border: 'solid 1px black',
      fontSize: '24px',
      fontWeight:'bold',
      background: '#99CCFF'
    }
  }
}