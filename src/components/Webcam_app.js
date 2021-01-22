import React, { useContext,useState } from "react";
import Webcam from 'react-webcam'
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import Grow from '@material-ui/core/Grow';
import './Webcam_app.css';
import {Context} from "./Store";
var apiurl= "[Your API url here]";
var apikey="[Your API key here]";

const videoConstraints = { //image size displayed on page
    width: 720,
    height: 480,
    aspectRatio: 1
};

function dataURLtoFile(dataurl, filename) { //Necessary to convert base64 encoded string image to proper image file for Microsoft Azure
  var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
  bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
  while(n--){
  u8arr[n] = bstr.charCodeAt(n);
  }
return new File([u8arr], filename, {type:mime});
}

async function postData(url = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/octet-stream',
      "Prediction-Key": apikey
     },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: data
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

function Webcam_app() {
  //Refs to make sure the webcam and imgsrc do not provide null
    const [state,dispatch]=useContext(Context);
    const webcamRef = React.useRef(null); 
    const imgRef = React.useRef(null);
    const [imgSrc, setImgSrc] = React.useState(null); //Holds the image that will be analyzed by Azure
    const [timerRef, setTimerRef] = React.useState(null); //Holds the 7 seconds main timer
    const [posture, setPosture] = useState({ //Tracks if current session is active, the posture state, posture issue, and the # of hits for the linechart
      Session: "stop",
      PostureState: "good",
      Err_msg: "Neck Tilt" 
  })
  
  //Left in case future updates incorporate login
  // const [userSettings, setUserSettings] = useState({
  //     Text_to_speech: false,
  //     AlarmSound: "alarm",
  //     ColourTheme: light,
  //     IntervalTimer: 1000
  // })

  const capture = React.useCallback(() => {
    if (webcamRef.current) { //Correct way to use refs, must check if it is ready before accessing  
        const imageSrc = webcamRef.current.getScreenshot();
        setImgSrc(imageSrc);
    }
},[webcamRef, setImgSrc]);

function changeSession() {
    setPosture(prevPosture => {
      if (timerRef===null){ //If starting...
       let timer =  setInterval(function() {

        capture();
       }, 7000); 
       setTimerRef(timer) //Set the state to a time interval which runs every 7 seconds
      }
      else{
         clearInterval(timerRef); //If stopping session then clear interval and set state to null
         setTimerRef(null); //This effectively removes the timer
      }
      return {
            ...prevPosture,
            Session: (posture.Session === "Start") ? "Stop" : "Start"
            
        };
    });
}

React.useEffect(() => { //Whenever the timer hits 7 seconds, a new image will be taken and the following analysis is done
if (imgRef.current ){ 
var fileData = dataURLtoFile(imgSrc, "imageName.jpg"); //Image Conversion to file

postData(apiurl, fileData) //Post request to Azure
.then(data => {
console.log(data.predictions[0].tagName); 
if (posture.PostureState==="good" && data.predictions[0].tagName!=="Good Posture"){
 
  switch(data.predictions[0].tagName) {//Update global state
    case "Head Tilt":
      dispatch({type: "Head Tilt", x:0});
      break;
    case "Hunching":
      dispatch({type:"Hunching",x:0})
      break;
      case "Reclining Back":
        dispatch({type:"Reclining Back",x:0})
      break;
      case "Resting Head on Hand":
        dispatch({type:"Resting Head on Hand",x:0})
      break;
    default:
      
  } 
  
  setPosture(prevPosture => { //Flip the current state
          return {
            Session: prevPosture.Session,
            PostureState: "bad", 
            Err_msg: data.predictions[0].tagName 
          };
           });
           
  var msg = new SpeechSynthesisUtterance(); //Text to speech warning
  msg.text = "Please fix your posture";
  window.speechSynthesis.speak(msg);

  setTimeout(()=>{
    capture()
  }, 2000); //Here we begin a faster timer to allow the user to fix their posture and remove their warning
}
else if (posture.PostureState==="bad" && data.predictions[0].tagName==="Good Posture"){

  setPosture(prevPosture => {//Flip the current state
          return {
                Session: prevPosture.Session,
                PostureState: "good",
                Err_msg:prevPosture.Err_msg
                
                };
            });
           }
       });     
     }
}, [imgSrc])

return (
    <div >
        <Grow in = {posture.PostureState === "bad"} >
        <Alert variant = "filled"
        severity = "error"
        className = "alert"> 
        { "Warning! Following bad posture detected: " + posture.Err_msg + ". Please fix immediately" } 
        </Alert> 
        </Grow>
        <Webcam videoConstraints = {videoConstraints}
        audio = {false}
        ref = {webcamRef}
        screenshotFormat = "image/jpeg"/>
        <div />
        <Button variant = "contained"
        color = "primary"
        onClick = { changeSession }> 
        {(posture.Session === "Start") ? "Stop" : "Start"} 
        </Button>
        {imgSrc && <img id="image" className="invis" ref={imgRef} src={imgSrc} />}
      </div >
    )
}
export default Webcam_app;