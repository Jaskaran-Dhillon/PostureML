import React, { useContext, useState, useEffect, useRef } from "react";
import Webcam from 'react-webcam'
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import Grow from '@material-ui/core/Grow';
import { Context } from "./Store";
import './Webcam_app.css';

var apiUrl = process.env.REACT_APP_API_URL;
var apiKey = process.env.REACT_APP_API_KEY;

const videoConstraints = {
  width: 720,
  height: 480,
  aspectRatio: 1
};

function dataURLtoFile(dataurl, filename) { //Necessary to convert base64 encoded string image to proper image file for Microsoft Azure
  var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}

async function postData(url = '', data = {}) {
  const response = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/octet-stream',
      "Prediction-Key": apiKey,
      'Access-Control-Allow-Origin':'*'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: data
  });
  return response.json();
}

function Webcam_app() {
  const [dispatch] = useContext(Context);
  const webcamRef = useRef(null);
  const imgRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null); //Holds the image that will be analyzed by Azure
  const [timerRef, setTimerRef] = useState(null); //Holds the 7 seconds main timer
  const [posture, setPosture] = useState({ //Tracks if current session is active, the posture state, posture issue, and the # of hits for the linechart
    Session: "stop",
    PostureState: "good",
    Err_msg: "Neck Tilt"
  })

  const audioWarning = () => {
    var msg = new SpeechSynthesisUtterance(); //Text to speech warning
    msg.text = "Please fix your posture";
    window.speechSynthesis.speak(msg);
  };

  const capture = React.useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setImgSrc(imageSrc);
    }
  }, [webcamRef, setImgSrc]);

  function changeSession() {
    setPosture(prevPosture => {
      if (timerRef === null) { //If starting...
        let timer = setInterval(function () {

          capture();
        }, 7000);
        setTimerRef(timer) //Set the state to a time interval which runs every 7 seconds
      }
      else {
        clearInterval(timerRef); //If stopping session then clear interval and set state to null
        setTimerRef(null); //This effectively removes the timer
      }
      return {
        ...prevPosture,
        Session: (posture.Session === "Start") ? "Stop" : "Start"
      };
    });
  }

  useEffect(() => { //Whenever the timer hits 7 seconds, a new image will be taken and the following analysis is done
    if (imgRef.current) {
      var fileData = dataURLtoFile(imgSrc, "imageName.jpg");

      postData(apiUrl, fileData)
        .then(data => {
          if (posture.PostureState === "good" && data.predictions[0].tagName !== "Good Posture") {
            dispatch({ type: data.predictions[0].tagName, data: null })

            setPosture(prevPosture => {
              return {
                ...prevPosture,
                PostureState: "bad",
                Err_msg: data.predictions[0].tagName
              };
            });

            audioWarning();

            setTimeout(() => {
              capture()
            }, 2000); //Here we begin a faster timer to allow the user to fix their posture and remove their warning
          }
          else if (posture.PostureState === "bad" && data.predictions[0].tagName === "Good Posture") {
            setPosture(prevPosture => {
              return {
                ...prevPosture,
                PostureState: "good"
              };
            });
          }

        });
    }
  }, [imgSrc])

  return (
    <div >
      <Grow in={posture.PostureState === "bad"} >
        <Alert variant="filled"
          severity="error"
          className="alert">
          {"Warning! Following bad posture detected: " + posture.Err_msg + ". Please fix immediately"}
        </Alert>
      </Grow>
      <Webcam videoConstraints={videoConstraints}
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg" />
      <div />
      <Button variant="contained"
        color="primary"
        onClick={changeSession}>
        {(posture.Session === "Start") ? "Stop" : "Start"}
      </Button>
      {imgSrc && <img id="image" className="invis" ref={imgRef} src={imgSrc} alt="" />}
    </div >
  )
}

export default Webcam_app;