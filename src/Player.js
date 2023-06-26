import React, { useState, useEffect, useRef } from 'react';
import { useParams  } from 'react-router-dom';
import io from 'socket.io-client'
const Player = () => {
  const { id:videoId } = useParams();
  const videoRef = useRef(null);

  const socket = io('https://video-app-g2dr.onrender.com'); // Replace with your server URL
  useEffect(() => {

    // Socket event listeners
    socket.on('connect', () => {
      console.log('Connected to server');
    });

    // socket.on('videoTimeChanged',(data)=>{
    //   console.log(data);
    //   videoRef.current.currentTime = data
    // })
    
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
    }
  };

  const handleSeeked = () => {
    console.log('User clicked on the video timeline '+videoRef.current.currentTime)
    // socket.emit('videoTimeChanged',videoRef.current.currentTime)
  };


    return (
        <div className="player"  style={{ width: '70%', height: '60%' }}>
            <header className="App-header">
                <video controls muted autoPlay ref={videoRef} 
                onSeeked={handleSeeked}
                 style={{ width: '70%', height: '60%' }}>
                    <source src={`https://video-app-g2dr.onrender.com/video/${videoId}`} type="video/mp4"></source>
                </video>
                <button onClick={handleForward}>forward</button>
            </header>
        </div>
    );
};

export default Player;
