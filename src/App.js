
import './App.css';
//import Navbar from './components/Navbar'
import Webcam_app from './components/Webcam_app'
import { GraphModel } from '@tensorflow/tfjs';
//import Login from './components/Login'
//import Start_page from './components/Start_page'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import React from 'react';
import Navbar from './components/Navbar'
import Information from './components/Information'
import LineChart from "./components/LineChart";


function App() {
  return (
    <div className="App"> 

<header className="App-header">
        
        
        <Router>
        <Navbar/>
       <Route path = "/" exact component={Information}/>
       <Route path = "/app" exact component={Webcam_app}/>
  
     
      </Router>
      
      
     

           </header>
      </div>
    
  );
}

export default App;
