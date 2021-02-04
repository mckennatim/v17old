# tcard-jobs
###  nav and control
nav: jobs, addjobs and help

state
> all: tings({}), allJobs(blajobs), job2edit(blajobs[0]), defaultJobs([])

> (passed as props): job2edit

> (returned from child): defaultJobs

props

controls (functions passed as props) 
>handleJob2edit(), dispdefaultJobs()

useEffect: navcontrol
>init[]: getAllJobs(), getSettings()

functions
>getAllJobs: ->setAllJobs

>getSettings: fetchSettings->settings

>handleJob2edit: setJob2edit ->nav2 AddJob

>dispDefaultJobs(<-editedJobs) -> by running setDefaultJobs and concat them to allJobs

### jobs (allJobs and foundJobs are props)
state
>all: foundJobs(defaultFound),searchStr(''), jobs4week(blajobs), dateInfo(getDataInf(new Date))

onload jobs:
>use new Date initalize state of week,year create blank jobs4week
Array

useEffect jobs:
> [dateInfo.wk,dateInfo.yr]: when either of these change db->getjobs4week

> [firstday]: getDateOfWeek() then dispatchDateInfo() to create datestr **firstday does nothing now assumes monday**

functions jobs4week section:
>dispatchDateInfo for week & yr *inputs* and in getJobs4week(): runs dateInfoReducer

>save2week: just saves to server, no update to component. Filter for checked and the db updateWk(wk, year) put weekArray where db deletes od data and replaces with new

>onChecked: changes state of jobs4week[?].active then setjobs4week

functions: foundjobs section
>search: changes state of foundJobs array

>moveUp: appends to jobs4week array

>onCheckedFound: props.updateJob() or local?????

>editJob: sends array of job with the same name as a prop to addJobs while deleting them from allJobs. Then navigate to addjob

### addJobs 
props: job2edit, dispEditedJobs()

state: beingEdited({...job2edit})

useEffect addjobs:
>init[]: run once place job and category info from props into state. Load bidhrs and labor$ from bid combine categories for editing

functions: addjobs
>onChange: update local state 

>expandCats(job)->jobs

>contractCats(jobs)->job called befor renderForm

>update: prepare to save to db. Check if job name has changed.   create jobarray.  If jobnamehaschanged expand(job2edit pushing each onto jobarray). Expand then push beingEdited on to jobarray. Server will delete for job/coid for first job name in array and insert everything in the array ito jobcatact and then return those same records with record numbers. 

## data architecture
### jobcatact 
>fields: coid, job, category, week, yr

>index: (coid,job,category), week, yr, job, category coid

### jobs
> fields: coid, job, categories[{cat:'',hrs:'',labor:'',default:0}], address, contacts[{name:phones[{mobile: 8883334444}], email:''}] startdate, enddate, archived, hrs, labor, material, sub, ovhprf total
> index: (coid,job), startdate, endate, default, catdefault

### work done on the server
current tcard.js for getting default jobs

    if(jobs.length ==0){
      var q5 = conn.query('SELECT `job`, `category` FROM jobcatact WHERE `active`=1 AND week=0 AND coid=? ORDER BY idx, category
becomes 

    SELECT * FROM jobs WHERE coid=? and (default = 1 defcat =1)
    
    const djobs = results.reduce((acc,r)=>{
      if (r.default){
        const rec = {job:r.job, category:''}
        acc.push(rec)
      }
      if (defcat){
        const cats = j.categories.map((c)=>{
          if(c.default){
            acc.push({job:r.job, category:c.category})
          }
        })
      }
    }[])
    res.jsonp={wk:2k, wkarr:wkarr, jobs:djobs, wstat=wstat[0]}

fetching allJobs becomes

    SELECT * FROM jobs WHERE coid=? AND archived = 0 
    const djobs = results.reduce((acc,r)=>{
      if (r.default){
        const rec = {job:r.job, category:''}
        acc.push(rec)
      }
      if (defcat){
        const cats = j.categories.map((c)=>{
          if(c.default){
            acc.push({job:r.job, category:c.category})
          }
        })
      }
    }[])
    res.jsonp={alljobs:djobs} 

updating from foundJobs default checkbox

    req.body = {job:'jobname', category:'ifiscategorystr',default:def}
    const {job,cat,def}=req.body
    If (category.length ==0){
      UPDATE jobs SET default=def WHERE coid=? AND job=?
    }else{
      SELECT categories FROM jobs WHERE coid=? AND job=?
        const cats = results[0].map((c)=>{
          if(c.category==cat){
            c.default=def
          }
        })
        UPDATE jobs SET categories=cats WHERE coid=? AND job=?
    }
    
fecthing for modjobs become 

    SELECT * FROM jobs WHERE coid=? AND job=?

### work to be done on the app

    const AddJob =({jobName, dispEditedJobs})=>{
      const [ajob, setaJob] = useState({})
      const [beingEdited, setBeingEdited]=useState({})

      useEffect(()=>{
        getaJob(jobName)
      },[])

      const getAjob=(jn)=>{
        fetchaJob(jn)
      .then((res)=>{
        setaJob({...res})
        setBeingEdited({...res})
      })
      }    
    }
# responsive design
https://www.digitalocean.com/community/tutorials/react-crud-context-hooks

On laptop, allow multiple components to display at the same time with live data. On phone, only one page component displays at a time.

One problem is data since data is typically passed through props so the data flow in a responsive app is very different.

Most of the communication is between jobs and addjob. whenver the jobs edit button is pressed, addjobs should switch to that job. When update is pressed on addjob, the foundJobs array should be replaced with the edited job entries. 

So foundJobs and job2edit need to be settable and any change to either should update both jobs and addjobs.

# app narative
A slimmed down version of things in jobcosts
## navctrl
init: 
> pulls up `jobs4week` for current week from `jobcatact`. If no jobs pulls up defaults from jobs
> pulls up un-archived `jobs` from `jobs`, creating and `allJobs` array with just job and category and default.

## jobs page
Jobs displays that jobs4week which is adjusted by any change in either  week or year. By default it displays a list of this jobs4week. Jobs coming from the database are checked but that check is not in the db. It just effects the local jobs4week array, indicating which jobs should be saved back for that week. 

Save2week button takes all the checked jobs in jobs4week and inserts or replaces that data at the server. 

Below jobs4week is a search box that draws on allJobs to displays search results. 

Searching

foundJobs contains job, category, default. It has an `edit pencil` for each. The job name at the pencil is sent to `modjobs`. `Default` is a db jobs field that for alljobs that you want to show up every week by default. Changing it changes db jobs by finding the job, if there is a category, changing the category default, else change the job's default.

## modjobs page
After updating a job you are taken back to the jobs page updating db jobs and the foundjobs array. When editing the job.name if you change it then update creates a new record with the new job.name. 

If categories change it just 

* Does searchResults update when allJobs changes? do I care?

Also in search jobs is a button that places a copy of that job in the jobs4week
 array.

## date functions without moment
https://www.epochconverter.com/weeks/2021
### getWeek 
https://stackoverflow.com/questions/6117814/get-week-of-year-in-javascript-like-in-php


### getDateFromWeek
https://stackoverflow.com/questions/16590500/javascript-calculate-date-from-week-number
## recurring problems

pay goes berserk Thinking in a loop if the tax rates for the new year are not in the database

## log
### 1/27/21 dateinfo is fucked, firstday is in props but doesn't show up
NavCtrl gets the settings so it is undefined until the settings arrive