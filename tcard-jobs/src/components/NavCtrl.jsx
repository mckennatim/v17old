import React,{useState, useEffect} from 'react';
import {Routes, Route,Link, useNavigate} from 'react-router-dom';
import {Jobs} from './Jobs.jsx'
import{AddJob} from './AddJob.jsx'
import {fetchSettings, fetchAllJobs} from '../fetches'

function NavCtrl(props) {
  const{title}=props
  const blajobs = [{id:'', job:'', category:'', week:'', yr:''}]
  const[tings, settings]= useState({})
  const[allJobs, setAllJobs]=useState(blajobs)
  const[jobs2edit, setJobs2edit] = useState(blajobs)
  const[defaultFound, setDefaultFound] = useState([{id:0, job:'frog and cat'}])
  const navigate=useNavigate()
  
  useEffect(()=>{
    getSettings()
    getAllJobs()
  },[])

  const getAllJobs=()=>{
    fetchAllJobs()
      .then((res)=>{
        setAllJobs(res.jobs)
      })
  }

  const getSettings=()=>{
    fetchSettings()     
      .then((res)=>{
        settings({firstday: res.firstday, coid: res.coid, qmessage:res.qmessage, task:'jobs'})
      })
  }

  const handleJobs2edit =(j)=>{
    console.log('j: ', j)
    setJobs2edit(j)
    navigate("/addjob")
  }

  const dispDefaultFound=(editedJobs)=>{
    //setAllJobs(alljobs.concat(editedJobs)sort)
    setDefaultFound(editedJobs)
  }



  const renderNav =()=>{
    return(
      <div>
        <h4>{title}</h4>
        <nav>
          <Link to="/"> jobs </Link>
          <Link to="/addjob"> addjob </Link>
        </nav>
        <Routes>
          <Route path="/" element={<Jobs firstday={tings.firstday} allJobs={allJobs} sendJobs2edit={handleJobs2edit} defaultFound={defaultFound}/>} />
          <Route path="addjob" element={<AddJob jobs2edit={jobs2edit} dispEditedJobs={dispDefaultFound} />} />
        </Routes>
      </div>      
    )
  }
  
  return (
    <div>
      {renderNav()}
    </div>
  );
}
export{NavCtrl}
