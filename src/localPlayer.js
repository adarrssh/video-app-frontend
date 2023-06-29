import React, { useRef, useEffect, useState } from 'react';
import {io} from 'socket.io-client'
function LocalPlayer() {
  const [pause,setPause] = useState(true)
  const [time,setTime] = useState(0)
  const [timeChanged,setTimeChanged] = useState(true)
  const videoRef = useRef(null);
  const socket  = io('https://video-app-g2dr.onrender.com')
  // const socket  = io('http://localhost:4000/')

  // useEffect(() => {
  //   // Socket event listeners
  //   socket.on('connect', () => {
  //     console.log('Connected to server');
  //   });

  //   socket.on('videoForward',(data)=>{
  //     console.log('socket videoForward event '+data);
  //     setTimeChanged(videoRef.current.currentTime)
  //     videoRef.current.currentTime = data
  //   })

  //   socket.on('videoTimeChanged',(data)=>{
  //     console.log('socket videoTimeChanged event '+ data);
  //     setTimeChanged(videoRef.current.currentTime)
  //     videoRef.current.currentTime = data

  //   })

  //   socket.on('pauseVideo',()=>{
  //     videoRef.current.pause();
  //   })

  //   socket.on('playVideo',()=>{
  //     videoRef.current.play()
  //   })
  //   const handlePause = () => {
  //     console.log('Video paused');
  //     socket.emit('videoPaused')
  //     // Emit a socket event or perform any other actions
  //   };

  //   const handlePlay = () => {
  //     console.log('Video resumed');
  //     socket.emit('videoResumed')
  //     // Emit a socket event or perform any other actions
  //   };


  //   // Add event listener for 'pause' event
  //   videoRef.current.addEventListener('pause', handlePause);

  //   // Add event listener for 'play' event
  //   videoRef.current.addEventListener('play', handlePlay)

  //   socket.on('disconnect', () => {
  //     console.log('Disconnected from server');
  //   });

  //   // Clean up the socket connection
  //   return () => {
  //     socket.disconnect();
  //   };
  // }, []);

  useEffect(()=>{
    // Socket event listeners
    socket.on('connect', () => {
      console.log('Connected to server');
    });

    socket.on('pauseBroadcast',()=>{
      console.log('pauseBroadcast');
      if (videoRef.current) {
        videoRef.current.pause();
      }
    })

    socket.on('playBroadcast',()=>{
      console.log('playBroadcast');
      if (videoRef.current) {
        videoRef.current.play();
      }
    })

    socket.on('broadcastTime',(time)=>{
      if (videoRef.current && (Math.abs(videoRef.current.currentTime-time)>1)) {
        console.log('broadcastTime',time);
        setTimeChanged(true)
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

  // useEffect(()=>{
  //   socket.emit('timeChanged',time)
  // },[time])

  const handleSeeked = () => {
    if(videoRef.current){
      // videoRef.current.pause()
      console.log('handleSeeked',videoRef.current.currentTime);
      if(!timeChanged){
        socket.emit('timeChanged',videoRef.current.currentTime)
        // setTime(videoRef.current.currentTime)
      }
      setTimeChanged(false)
    }
  };


    
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const videoURL = URL.createObjectURL(file);
    console.log(videoURL);
    videoRef.current.src = videoURL;
  };
  
  const handlePause = () => {
    console.log('handlePause');
    socket.emit('pause')
  }

  const handlePlay = () => {
    console.log('handlePlay');
    socket.emit('play')
  }

  return (
    <div>
      <input type="file" accept="video/*" onChange={handleFileChange} />
      <video ref={videoRef} controls 
       onSeeked={handleSeeked} 
       onPause={handlePause}
       onPlay={handlePlay}
       style={{height:'60%',width:'80%'}}/>
       {/* <button onClick={()=>setPlay(!play)}>button</button> */}
    </div>
  );
}

export default LocalPlayer;
