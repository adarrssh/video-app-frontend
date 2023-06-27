import React, { useRef, useEffect, useState } from 'react';
import {io} from 'socket.io-client'
function LocalPlayer() {
  const [timeChanged,setTimeChanged] = useState(0)
  const videoRef = useRef(null);
  const socket  = io('https://video-app-g2dr.onrender.com')
  // const socket  = io('http://localhost:4000/')

  useEffect(() => {
    // Socket event listeners
    socket.on('connect', () => {
      console.log('Connected to server');
    });

    socket.on('videoForward',(data)=>{
      console.log('socket videoForward event '+data);
      setTimeChanged(videoRef.current.currentTime)
      videoRef.current.currentTime = data
    })

    socket.on('videoTimeChanged',(data)=>{
      console.log('socket videoTimeChanged event '+ data);
      setTimeChanged(videoRef.current.currentTime)
      videoRef.current.currentTime = data

    })
    socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    // Clean up the socket connection
    // return () => {
    //   socket.disconnect();
    // };
  }, []);


  
  const syncVideo = () => {
    if (videoRef.current) {
      console.log('syncVideo ' + videoRef.current.currentTime);
      setTimeChanged(videoRef.current.currentTime)
      socket.emit('videoForward',videoRef.current.currentTime)
    }
  };

  const handleSeeked = () => {
    if(videoRef.current.currentTime !== timeChanged){
      console.log('User clicked on the video timeline ' + videoRef.current.currentTime);
      setTimeChanged(videoRef.current.currentTime)
      socket.emit('videoTimeChanged',videoRef.current.currentTime)
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
      <video ref={videoRef} controls 
       onSeeked={handleSeeked} 
       style={{height:'60%',width:'80%'}}/>
      <button onClick={syncVideo}>sync video</button>

    </div>
  );
}

export default LocalPlayer;
