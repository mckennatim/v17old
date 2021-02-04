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
  const[job2edit, setJob2edit] = useState('')
  const[defaultFound, setDefaultFound] = useState([])
  const[multi, setMulti]=useState(1)
  const navigate=useNavigate()
  
  useEffect(()=>{
    getSettings()
    getAllJobs()
  },[])

  const getAllJobs=()=>{
    fetchAllJobs()
      .then((res)=>{
        console.log('res: ', res)
        setAllJobs(res.jobs)
      })
  }

  const getSettings=()=>{
    fetchSettings()     
      .then((res)=>{
        settings({firstday: res.firstday, coid: res.coid, qmessage:res.qmessage, task:'jobs'})
      })
  }

  const handleJob2edit =(j)=>{
    console.log('j: ', j)
    setJob2edit(j)
    navigate("/addjob")
  }

  const dispDefaultFound=(editedJobs)=>{
    //setAllJobs(alljobs.concat(editedJobs)sort)
    setDefaultFound(editedJobs)
  }

  const toggleMulti=()=>{
    setMulti(!multi)
    console.log('multi: ', multi)
  }
  

  const renderNav =()=>{
    return(
      <div>
        <h4>{title}</h4>
        <nav>
          <Link to="/"> jobs </Link>
          <Link to="/addjob"> addjob </Link>
          <a href="" onClick={toggleMulti} >toggleMulti</a>
        </nav>

        <Routes>
          <Route path="/" element={<Jobs firstday={tings.firstday} allJobs={allJobs} sendJob2edit={handleJob2edit} defaultFound={defaultFound}/>} />
          <Route path="addjob" element={<AddJob job2edit={job2edit} displayEditedJobs={dispDefaultFound} />} />
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
