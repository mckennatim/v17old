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
  console.log('page: ', page)

  const renderNav = ()=>{
    return(
    <nav style ={styles.nav.nav}>
      <span>{title}</span>
      <ul style ={styles.nav.ul}>
        <li style ={styles.nav.li}>
          <a onClick={changePage('/jobs')}>jobs</a>
        </li>
        <li style ={styles.nav.li}>
          <a onClick={changePage('/addjob')}>addjob</a>
        </li>
        <li style ={styles.nav.li}>
          <a onClick={changePage('/both')}>both</a>
        </li>
      </ul>
    </nav>
    )
  }

  const renderContent=()=>{
    console.log('page: ', page)
    if (page=='/addjob'){
      return(
        <div style ={styles.container}>
          <AddJob/>
        </div>
      )
    }
    if (page=='/jobs' || page==undefined){
      console.log('default is /jobs')
      return(
        <div style ={styles.container} >
          <Jobs/>
          <Help/>
        </div>
      )
    }
    if (page=='/both'){
      return(
        <div style ={styles.container}>
          <Jobs/>
          <AddJob/>
          <Help/>
        </div>
      )
    }
  }



  return(
  <div> 
    {renderNav()}
    {renderContent()}
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
    <div style ={styles.jobs.div0} >
      Jobs
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
    <div style ={styles.addjob.div0}>
      AddJob
      <div>{job2edit}</div>

      <button onClick={update}>update</button>
    </div>
  )
}

const Help = ()=>{
  return(
    <div style ={styles.help.div0}>
      <span>
      Shares of GameStop — the company at the center of an online buying binge that captured the imagination of the world last week — crashed another 42 percent on Thursday, leaving it at a small fraction of the value it held just a few days ago.

It was the third plunge in four trading sessions for the stock, which had become the symbolic heart of an online crusade against some of Wall Street’s most sophisticated investors.

Shares of GameStop closed at $53.50, almost 90 percent below their peak of $483 on Thursday morning last week.

The video game retailer’s stock is down 84 percent this week, and the rout has convinced many who favored the stock that the ride is over.

“GME is dead,” one user, BoBo_HUST, wrote on Reddit’s WallStreetBets forum, using GameStop’s ticker symbol. Then the commenter wondered aloud about the prospects of one of the other so-called meme stocks, BlackBerry. “Can BB save us?”

BlackBerry, the once-dominant maker of mobile device
      </span>
    </div>
  )
}

const adata = {
  afJobs: [],
  aJob2Edit:''
}

const styles ={
  page:{
    backgroundColor: '#aa9898'
  },
  container:{
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    backgroundColor: '#ece6ed'
  },
  nav: {
    nav:{
      backgroundColor: 'whitesmoke',
    },
    ul:{
      textAlign: 'left',
      listStyleType: 'none',
      paddingLeft: '12px'
    },
    li:{
      display: 'inline',
      padding: '2px',
      paddingRight: '4px',
      background: 'whitesmoke'
    },
  },
  jobs:{
    div0:{
      backgroundColor: '#aa9898'
    }
  },
  addjob:{
    div0:{
      backgroundColor: '#c6a7a7'
    }
  },
  help:{
    div0:{
      backgroundColor: '#c7b1c9'
    }
  }
}