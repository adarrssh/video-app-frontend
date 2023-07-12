// UserB.js
import React, { useState, useEffect,useRef } from 'react';
import { io } from 'socket.io-client';

const socket = io(process.env.REACT_APP_SOCKET);


function UserB() {
  console.log('join room');
  const videoRef = useRef(null);
  const [roomId, setRoomId] = useState('');
  const [isValidRoomId, setIsValidRoomId] = useState(true);

  useEffect(() => {
    socket.on('invalidRoomId', () => {
      setIsValidRoomId(false);
    });

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

      if (videoRef.current ) {
        console.log('broadcastTime', time);
        videoRef.current.currentTime = time;
      }
    };

    socket.on('playBroadcast', handlePlayBroadcast);
    socket.on('pauseBroadcast', handlePauseBroadcast);
    socket.on('broadcastTime', handleBroadcastTime);

    return () => {
      socket.off('invalidRoomId');
    };
  }, []);

  const handleJoinRoom = () => {
    socket.emit('joinRoom', roomId);
  };

  
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const videoURL = URL.createObjectURL(file);
    videoRef.current.src = videoURL;
  };


  return (
    <div>
      <input
        type="text"
        value={roomId}
        onChange={(e) => {
          setRoomId(e.target.value);
          setIsValidRoomId(true);
        }}
        placeholder="Enter Room ID"
      />
      <button onClick={handleJoinRoom}>Join Room</button>
      {!isValidRoomId && <p>Invalid Room ID</p>}

      <div>
      <video
        ref={videoRef}
        
          style={{ height: '60%', width: '80%' }}
        />
              <input type="file" accept="video/*" onChange={handleFileChange} />

      </div>
    </div>
  );
}

export default UserB;
