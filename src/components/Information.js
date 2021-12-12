import React, { Component } from 'react';
import './Information.css';

export class Information extends Component {
  render() {
    return (
    <div >
   <h1 className="logo_login" > Posture <span className = "p"> ML</span> </h1>
    <p className="flex-box-home" >
    PostureML allows you to monitor your posture through real-time video analysis. < br /> Start improving your posture today!
    </p>
    <div className = "image">
      </div> 
      <img src="https://i.pinimg.com/originals/e4/26/70/e426702edf874b181aced1e2fa5c6cde.gif" alt=""/>
      <p className="flex-box-home"> In times of pandemic and work from home situations, this is a must-have tool. </p>
      <p className = "powered"> Powered by Azure</p>
    </div>
        );
    }
}


export default Information;

