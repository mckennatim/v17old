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
> fields: coid, job, categories[{cat:'',hrs:'',labor:''}], address, contacts[{name:phones[{mobile: 8883334444}], email:''}] startdate, enddate, active, archived, hrs, labor, material, sub, ovhprf
> index: (coid,job), startdate, endate, active, archived

## jobs page
Jobs displays that jobs4week
 which is adjusted by any change in either  week or year. By default it displays a list of this jobs4week
. Jobs coming from the database are checked.  

Save2week button takes all the checkes jobs in jobs4week
 and inserts or replaces that data at the server. 

Below jobs4week
 ish a search box that draws on allJobs to displays search results. 

SearchResults has an edit pencil for each list item which takes you to addjobs populated with that job's info. 

## addjobs page
Updating or deleting a job takes you back to the jobs page updating both the database and the allJobs array. When editing the job.name if you change it then update creates a new record with the new job.name. If categories change it just 
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