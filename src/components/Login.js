import React, {Component} from 'react';
import '../Login.css';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


  
   export class Login extends Component {
     render() {
    return (
    <div className = "flex-box-login">
    <div  className = "flex-box-login">
      <h1 className = "logo_login">PostureML</h1>
      
       <form className = "login-form-box">
          <div className = "login-form-box">
       <TextField type = "text"  className = "username_login" id="standard-basic" label="Username" />
       <TextField type = "password" className = "password_login" id="standard-basic" label="Password" />
       </div>
       <Button variant="outlined" className = "submit_login" color="primary">Login</Button>
       </form>
      </div>
      </div>
    );
  }
  
   }


export default Login;