import React, { useRef, useEffect, useState } from 'react';
import {io} from 'socket.io-client'
function LocalPlayer() {
  const videoRef = useRef(null);
  const socket  = io('https://video-app-g2dr.onrender.com')
  // const socket  = io('http://localhost:4000/')

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const videoURL = URL.createObjectURL(file);
    // console.log(videoURL);
    videoRef.current.src = videoURL;
  };
  

  useEffect(()=>{
    // Socket event listeners
    socket.on('connect', () => {
      console.log('Connected to server');
    });

    socket.on('playBroadcast',()=>{
      console.log('playBroadcast');
      if (videoRef.current && videoRef.current.paused) {
        videoRef.current.play();
      }
    })

    socket.on('pauseBroadcast',()=>{
      console.log('pauseBroadcast');
      if (videoRef.current && !videoRef.current.paused) {
        videoRef.current.pause()
      }
    })

    socket.on('broadcastTime',(time)=>{
      let difference = Math.abs(videoRef.current.currentTime - time)
      console.log(difference);
      if (videoRef.current &&  difference > 1 ) {
        console.log('broadcastTime',time);
        videoRef.current.currentTime = time;
      }
    })
    socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    // Clean up the socket connection
    return () => {
      socket.disconnect();
    };
  },[])

  const handleSeeked = () => {
    if(videoRef.current){
        // videoRef.current.pause()
        console.log('handleSeeked',videoRef.current.currentTime);
        socket.emit('timeChanged',videoRef.current.currentTime)
        
    }
  };
  const handlePlay = () => {
    console.log('handlePlay');
    socket.emit('play')
  }

  const handlePause = () => {
    console.log('handlePause');
    // if pauseSocketEvent is not true
    socket.emit('pause')
    
  }

  const handleMouseEnter = () => {
    if(videoRef.current){
      videoRef.current.pause()
    }
  }


  return (
    <div onMouseEnter={handleMouseEnter}>
      <input type="file" accept="video/*" onChange={handleFileChange} />
      <video ref={videoRef} controls 
      style={{height:'60%',width:'80%'}}

       onSeeked={handleSeeked} 
       onPlay={handlePlay}
      onPause={handlePause}
      />
    </div>
  );
}

export default LocalPlayer;
























    // socket.on('playBroadcast',()=>{
    //   // console.log('playBroadcast');
    //   if (videoRef.current) {
    //     videoRef.current.play();
    //   }
    // })

    // socket.on('broadcastTime',(time)=>{
    //   if (videoRef.current && (Math.abs(videoRef.current.currentTime-time)>1)) {
    //     // console.log('broadcastTime',time);
    //     setTimeChanged(true)
    //     videoRef.current.currentTime = time;
    //   }
    // })
    // socket.on('disconnect', () => {
    //   console.log('Disconnected from server');
    // });

    
  
  // const handleSeeked = () => {
  //   if(videoRef.current){
  //     // videoRef.current.pause()
  //     // console.log('handleSeeked',videoRef.current.currentTime);
  //     if(!timeChanged){
  //       socket.emit('timeChanged',videoRef.current.currentTime)
  //       // setTime(videoRef.current.currentTime)
  //     }
  //     setTimeChanged(false)
  //   }
  // };
