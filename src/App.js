import './App.css';
import Webcam_app from './components/Webcam_app'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import React from 'react';
import Navbar from './components/Navbar'
import Information from './components/Information'
import LineChart from "./components/LineChart";
import Store from "./components/Store";


function App() {
  return (
    <Store>
      <div className="App">
        <header className="App-header">
          <Router>
            <Navbar />
            <Route path="/" exact component={Information} />
            <Route path="/app" exact component={Webcam_app} />
            <Route path="/graph" exact component={LineChart} />
          </Router>
        </header>
      </div>
    </Store>
  );
}

export default App;
