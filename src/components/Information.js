import React, { Component } from 'react';
import './Information.css';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';



export class Information extends Component {
  render() {
    return (
    <div >
      <h1 className="logo_login" > Posture <span className = "p"> ML</span> </h1>


            <p className="flex-box-home" >
          PostureML allows you to monitor your posture through real time video posture analysis. < br /> Get notified on your poster today. 
          </p>
             <div className = "image">
               
               </div> 
                   
                    <img src="https://i.pinimg.com/originals/e4/26/70/e426702edf874b181aced1e2fa5c6cde.gif"/>
                    <p className="flex-box-home"> In times of pandemic, and work from home situation, this is a must have tool. </p>
                    <p className = "helo"> Powered by Azure</p>
            </div>
  
        );
    }
}


export default Information;

