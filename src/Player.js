import React, { useState, useEffect, useRef } from 'react';
import { useParams  } from 'react-router-dom';
import io from 'socket.io-client';
const socket = io('https://video-app-g2dr.onrender.com/');
// const socket = io('http://localhost:4000/')
const Player = (props) => {
  const { id } = useParams();
  const videoRef = useRef(null);
  const [videoId, setVideoId] = useState(id);
  const [isPaused, setIsPaused] = useState(false);


  useEffect(() => {
    // Listen for 'videoPaused' event
    socket.on('videoPaused', () => {
        console.log('incoming videoPaused event');
    //   if (!videoRef.current.paused) {
        videoRef.current.pause();
        setIsPaused(true);
    //   }
    });

    // Listen for 'videoPlayed' event
    socket.on('videoPlayed', () => {
    //   if (videoRef.current.paused && isPaused) {
        console.log('video play event');
        videoRef.current.play();
        setIsPaused(false);
    //   }
    });

    // Emit 'videoPaused' event when the video is paused
    const handlePause = () => {
        console.log('paused');
      if (videoRef.current.paused) {
        socket.emit('videoPaused');
      }
    };

    // Emit 'videoPlayed' event when the video is played
    const handlePlay = () => {
    //   if (videoRef.current.paused && isPaused) {
        console.log('video played');
        socket.emit('videoPlayed');
    //   }
    };

    // listend for forward event 
    socket.on('forward video',()=>{
        console.log('forward event');
        // if (videoRef.current) {
            videoRef.current.currentTime += 10;
        //   }
    })
    // Attach event listeners to the video element
    if (videoRef.current) {
      videoRef.current.addEventListener('pause', handlePause);
      videoRef.current.addEventListener('play', handlePlay);
    }

    return () => {
      // Clean up event listeners and socket listeners when the component is unmounted
      if (videoRef.current) {
        videoRef.current.removeEventListener('pause', handlePause);
        videoRef.current.removeEventListener('play', handlePlay);
      }
      socket.off('videoPaused');
      socket.off('videoPlayed');
    };
  }, [isPaused]);

  const handleForward = () => {
    socket.emit('forward video')
    console.log('forward video');
    if (videoRef.current) {
      videoRef.current.currentTime += 10; // Forward by 10 seconds
    }
  };

  


    return (
        <div className="player"  style={{ width: '70%', height: '60%' }}>
            <header className="App-header">
                <video controls muted autoPlay ref={videoRef} style={{ width: '70%', height: '60%' }}>
                    <source src={`https://video-app-g2dr.onrender.com/video/${videoId}`} type="video/mp4"></source>
                </video>
                <button onClick={handleForward}>Forward 10 seconds</button>

            </header>
        </div>
    );
};

export default Player;
