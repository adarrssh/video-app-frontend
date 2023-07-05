import React, { useRef, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io(process.env.REACT_APP_SOCKET);

function LocalPlayer() {
  const videoRef = useRef(null);
  const [roomId, setRoomId] = useState('');
  console.log(process.env.REACT_APP_SOCKET);
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

    const handleDisconnect = () => {
      console.log('Disconnected from server');
    };

    socket.on('connect', handleConnect);
    socket.on('disconnect', handleDisconnect);

    // Clean up the socket connection
    return () => {
      socket.off('connect', handleConnect);
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
