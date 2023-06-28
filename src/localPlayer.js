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

    socket.on('pauseVideo',()=>{
      videoRef.current.pause();
    })

    socket.on('playVideo',()=>{
      videoRef.current.play()
    })
    const handlePause = () => {
      console.log('Video paused');
      socket.emit('videoPaused')
      // Emit a socket event or perform any other actions
    };

    const handlePlay = () => {
      console.log('Video resumed');
      socket.emit('videoResumed')
      // Emit a socket event or perform any other actions
    };


    // Add event listener for 'pause' event
    videoRef.current.addEventListener('pause', handlePause);

    // Add event listener for 'play' event
    videoRef.current.addEventListener('play', handlePlay)

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
    console.log(videoRef.current.currentTime, timeChanged);
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
