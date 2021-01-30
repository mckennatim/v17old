import React from 'react';
import {Routes, Route,Link} from 'react-router-dom';

function App(props) {
  const{title}=props
  return (
    <div>
      <h1>{title}</h1>
      <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
      </Routes>
    </div>
  );
}
export{App}

const Home =()=>{
  return(
    <div>home</div>
  )
}

const About = ()=>{
  return(
    <div>about</div>
  )
}