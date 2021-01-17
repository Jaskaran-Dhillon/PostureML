import React, {Component} from 'react';
import './Information.css';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


  
   export class Information extends Component {
     render() {
    return (
    <div> 
      <h1 className = "logo_login">PostureML</h1>
      

      <p className = "flex-box-home">
          PostureML allows you to monitor your posture through 
          real time video posture analysis.<br />Get notified on your 
          poster today.
      </p>
       <div className = "flex-box-homes">

       </div>

      </div>
    );
  }
}


export default Information;