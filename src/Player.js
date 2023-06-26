import React, { useState, useEffect, useRef } from 'react';
import { useParams  } from 'react-router-dom';
import io from 'socket.io-client'
const Player = () => {
  const { id:videoId } = useParams();
  const videoRef = useRef(null);

  useEffect(() => {
    const socket = io('https://video-app-g2dr.onrender.com'); // Replace with your server URL

    // Socket event listeners
    socket.on('connect', () => {
      console.log('Connected to server');
    });

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

    return (
        <div className="player"  style={{ width: '70%', height: '60%' }}>
            <header className="App-header">
                <video controls muted autoPlay ref={videoRef} style={{ width: '70%', height: '60%' }}>
                    <source src={`https://video-app-g2dr.onrender.com/video/${videoId}`} type="video/mp4"></source>
                </video>
                <button onClick={handleForward}>forward</button>
            </header>
        </div>
    );
};

export default Player;
