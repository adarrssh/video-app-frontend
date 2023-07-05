import React, { useRef, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('https://video-app-g2dr.onrender.com');
// const socket = io('http://localhost:4000/');

function LocalPlayer() {
  const videoRef = useRef(null);
  const [roomId, setRoomId] = useState('');

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

    socket.on('roomCreated', (roomId) => {
      setRoomId(roomId);
      console.log('created room id',roomId);
    });

    socket.on('userJoined',(id)=>{
      console.log(id, ' joined the room');
    })
    // const handlePlayBroadcast = () => {
    //   console.log('playBroadcast');
    //   if (videoRef.current && videoRef.current.paused) {
    //     videoRef.current.play();
    //   }
    // };

    // const handlePauseBroadcast = () => {
    //   console.log('pauseBroadcast');
    //   if (videoRef.current && !videoRef.current.paused) {
    //     videoRef.current.pause();
    //   }
    // };

    // const handleBroadcastTime = (time) => {
    //   const difference = Math.abs(videoRef.current.currentTime - time);
    //   console.log(difference);
    //   if (videoRef.current && difference > 1) {
    //     console.log('broadcastTime', time);
    //     videoRef.current.currentTime = time;
    //   }
    // };

    const handleDisconnect = () => {
      console.log('Disconnected from server');
    };

    socket.on('connect', handleConnect);
    // socket.on('playBroadcast', handlePlayBroadcast);
    // socket.on('pauseBroadcast', handlePauseBroadcast);
    // socket.on('broadcastTime', handleBroadcastTime);
    socket.on('disconnect', handleDisconnect);

    // Clean up the socket connection
    return () => {
      socket.off('connect', handleConnect);
      // socket.off('playBroadcast', handlePlayBroadcast);
      // socket.off('pauseBroadcast', handlePauseBroadcast);
      // socket.off('broadcastTime', handleBroadcastTime);
      socket.off('disconnect', handleDisconnect);
      socket.disconnect();
    };
  }, []);

  const handleSeeked = () => {
    if (videoRef.current) {
      console.log('handleSeeked', videoRef.current.currentTime);
      socket.emit('timeChanged', {roomId,time:videoRef.current.currentTime});
    }
  };

  const handlePlay = () => {
    console.log('handlePlay');
    socket.emit('play',roomId);
  };

  const handlePause = () => {
    console.log('handlePause');
    socket.emit('pause',roomId);
  };

  const handleCreateRoom = () => {
    socket.emit('createRoom');
  };

  return (
    <>
      <input type="file" accept="video/*" onChange={handleFileChange} />
      <div style={{background:'grey'}}>
        <video
          ref={videoRef}
          controls
          style={{ height: '60%', width: '80%' }}
          onSeeked={handleSeeked}
          onPlay={handlePlay}
          onPause={handlePause}
        />
      </div>
      <button onClick={handleCreateRoom}>Create Room</button>
    </>
  );
}

export default LocalPlayer;
