import React, { useRef, useEffect } from 'react';
import {io} from 'socket.io-client'
function LocalPlayer() {
  const videoRef = useRef(null);
  // const socket  = io('http://localhost:4000/')
  const socket  = io('https://video-app-g2dr.onrender.com')

  useEffect(() => {
    // Socket event listeners
    socket.on('connect', () => {
      console.log('Connected to server');
    });

    socket.on('videoForward',(data)=>{
      console.log('time changed'+data);
      videoRef.current.currentTime = data
    })
    
    socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    // Clean up the socket connection
    return () => {
      socket.disconnect();
    };
  }, []);


  const handleForward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime += 10; // Forward by 10 seconds
      console.log('video forward to ' + videoRef.current.currentTime);
      socket.emit('videoForward',videoRef.current.currentTime)
    }
  };

    
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const videoURL = URL.createObjectURL(file);
    console.log(videoURL);
    videoRef.current.src = videoURL;
  };
  

  return (
    <div>
      <input type="file" accept="video/*" onChange={handleFileChange} />
      <video ref={videoRef} controls  style={{height:'60%',width:'80%'}}/>
      <button onClick={handleForward}>forward</button>

    </div>
  );
}

export default LocalPlayer;
