import React, { useRef, useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io('https://video-app-g2dr.onrender.com');
// const socket = io('http://localhost:4000/');

function LocalPlayer() {
  const videoRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const videoURL = URL.createObjectURL(file);
    videoRef.current.src = videoURL;
  };

  useEffect(() => {
    // Socket event listeners
    const handleConnect = () => {
      console.log('Connected to server');
    };

    const handlePlayBroadcast = () => {
      console.log('playBroadcast');
      if (videoRef.current && videoRef.current.paused) {
        videoRef.current.play();
      }
    };

    const handlePauseBroadcast = () => {
      console.log('pauseBroadcast');
      if (videoRef.current && !videoRef.current.paused) {
        videoRef.current.pause();
      }
    };

    const handleBroadcastTime = (time) => {
      const difference = Math.abs(videoRef.current.currentTime - time);
      console.log(difference);
      if (videoRef.current && difference > 1) {
        console.log('broadcastTime', time);
        videoRef.current.currentTime = time;
      }
    };

    const handleDisconnect = () => {
      console.log('Disconnected from server');
    };

    socket.on('connect', handleConnect);
    socket.on('playBroadcast', handlePlayBroadcast);
    socket.on('pauseBroadcast', handlePauseBroadcast);
    socket.on('broadcastTime', handleBroadcastTime);
    socket.on('disconnect', handleDisconnect);

    // Clean up the socket connection
    return () => {
      socket.off('connect', handleConnect);
      socket.off('playBroadcast', handlePlayBroadcast);
      socket.off('pauseBroadcast', handlePauseBroadcast);
      socket.off('broadcastTime', handleBroadcastTime);
      socket.off('disconnect', handleDisconnect);
      socket.disconnect();
    };
  }, []);

  const handleSeeked = () => {
    if (videoRef.current) {
      console.log('handleSeeked', videoRef.current.currentTime);
      socket.emit('timeChanged', videoRef.current.currentTime);
    }
  };

  const handlePlay = () => {
    console.log('handlePlay');
    socket.emit('play');
  };

  const handlePause = () => {
    console.log('handlePause');
    socket.emit('pause');
  };

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  return (
    <>
      <input type="file" accept="video/*" onChange={handleFileChange} />
      <div onMouseEnter={handleMouseEnter}>
        <video
          ref={videoRef}
          controls
          style={{ height: '60%', width: '80%' }}
          onSeeked={handleSeeked}
          onPlay={handlePlay}
          onPause={handlePause}
        />
      </div>
    </>
  );
}

export default LocalPlayer;
