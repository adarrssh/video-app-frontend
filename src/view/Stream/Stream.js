import React, { useRef, useEffect, useState } from 'react';
import "./Stream.css"
import ChatBox from './ChatBox';
import Button from '../../components/button/button';
import { io } from 'socket.io-client';
const socket = io(process.env.REACT_APP_SOCKET);

function Stream() {
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const [roomId, setRoomId] = useState('');
  const [selectedVideo, setSelectedVideo] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedVideo(URL.createObjectURL(file));
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  useEffect(() => {
    // Socket event listeners
    const handleConnect = () => {
      console.log('Connected to server');
    };

    socket.on('roomCreated', (roomId) => {
      setRoomId(roomId);
      console.log('created room id', roomId);
    });

    socket.on('userJoined', (id) => {
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
      socket.emit('timeChanged', { roomId, time: videoRef.current.currentTime });
    }
  };

  const handlePlay = () => {
    console.log('handlePlay');
    socket.emit('play', roomId);
  };

  const handlePause = () => {
    console.log('handlePause');
    socket.emit('pause', roomId);
  };

  const handleCreateRoom = () => {
    socket.emit('createRoom');
  };

  return (
    <>
      {/* <input type="file" accept="video/*" onChange={handleFileChange} />
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
      <button onClick={handleCreateRoom}>Create Room</button> */}


      <main className='stream-main-comp'>
        <div className='stream-left'>

          {!selectedVideo ? <div className="stream-video-div">
            <input type="file"
              style={{ display: 'none' }}
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="video/*" />
            <Button className="choose-btn" onClick={handleButtonClick} text={"Choose your video"} />
          </div> :
            <div className='video-div'>
              <video controls
              ref={videoRef}
                onSeeked={handleSeeked}
                onPlay={handlePlay}
                onPause={handlePause}>
                <source src={selectedVideo} type="video/mp4" />
              </video>
              <div className='stream-end-div'>
                <Button text={"Leave lounge"} className="leave-btn" />
              </div>
            </div>

          }
        </div>
        <ChatBox />
      </main>



    </>
  );
}

export default Stream;



