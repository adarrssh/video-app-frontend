import React, { useRef, useEffect, useState } from 'react';
import "./Stream.css"
import ChatBox from './ChatBox';
import Button from '../../components/button/button';
// import { io } from 'socket.io-client';
import { useNavigate } from 'react-router-dom';

function Stream({socket,roomId}) {
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  // const [roomId, setRoomId] = useState('');
  const [selectedVideo, setSelectedVideo] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedVideo(URL.createObjectURL(file));
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  // useEffect(() => {
  //   // Socket event listeners
  //   const handleConnect = () => {
  //     console.log('Connected to server');
  //   };

  //   socket.current = io(process.env.REACT_APP_SOCKET);

  //   socket.current.on('roomCreated', (roomId) => {
  //     setRoomId(roomId);
  //     console.log('created room id', roomId);
  //   });

  //   socket.current.on('userJoined', (id) => {
  //     console.log(id, ' joined the room');
  //   });

  //   const handleDisconnect = () => {
  //     console.log('Disconnected from server');
  //   };

  //   socket.current.on('connect', handleConnect);
  //   socket.current.on('disconnect', handleDisconnect);

  //   // Clean up the socket connection
  //   return () => {
  //     socket.current.off('connect', handleConnect);
  //     socket.current.off('disconnect', handleDisconnect);
  //     socket.current.disconnect();
  //   };
  // }, []);

  const handleSeeked = () => {
    if (videoRef.current) {
      console.log('handleSeeked', videoRef.current.currentTime);
      socket.current.emit('timeChanged', { roomId, time: videoRef.current.currentTime });
    }
  };

  const handlePlay = () => {
    console.log('handlePlay');
    socket.current.emit('play', roomId);
  };

  const handlePause = () => {
    console.log('handlePause');
    socket.current.emit('pause', roomId);
  };

  const handleCreateRoom = () => {
    socket.current.emit('createRoom');
  };

  const leaveRoom = () => {
    // Disconnect from server
    socket.current.disconnect();

    // Navigate to home page or desired route
    navigate('/');
  };

  return (
    <>
      <main className='stream-main-comp'>
        <div className='stream-left'>
          {!selectedVideo ? (
            <div className="stream-video-div">
              <input type="file"
                style={{ display: 'none' }}
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="video/*" />
              <Button className="choose-btn" onClick={handleButtonClick} text={"Choose your video"} />
            </div>
          ) : (
            <div className='video-div'>
              <video ref={videoRef} controls onSeeked={handleSeeked} onPlay={handlePlay} onPause={handlePause}>
                <source src={selectedVideo} />
              </video>
              <div className='stream-end-div'>
                <Button text={"Leave lounge"} className="leave-btn" onClick={leaveRoom} />
              </div>
            </div>
          )}
        </div>
        <ChatBox />
      </main>
    </>
  );
}

export default Stream;
