// UserB.js
import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import Button from '../../components/button/button';
import ChatBox from '../Stream/ChatBox';
import { useNavigate } from 'react-router-dom';
const socket = io(process.env.REACT_APP_SOCKET);


function UserB({socket,roomId}) {
  const navigate = useNavigate()
  const fileInputRef = useRef(null);
  // const [message, setMessage] = useState("")
  // const [chatMessage, setChatMessage] = useState([])
  const videoRef = useRef(null);
  // const [roomId, setRoomId] = useState('');
  const [isValidRoomId, setIsValidRoomId] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    socket.current.on('invalidRoomId', () => {
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

      if (videoRef.current) {
        console.log('broadcastTime', time);
        videoRef.current.currentTime = time;
      }
    };


    socket.current.on('playBroadcast', handlePlayBroadcast);
    socket.current.on('pauseBroadcast', handlePauseBroadcast);
    socket.current.on('broadcastTime', handleBroadcastTime);

    return () => {
      socket.current.off('invalidRoomId');
    };
  }, []);

  const handleJoinRoom = () => {
    socket.current.emit('joinRoom', roomId);
  };


  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedVideo(URL.createObjectURL(file))
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const leaveRoom = () => {
    // Disconnect from server
    socket.current.current.disconnect();

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
              <button onClick={handleJoinRoom}>Join Room</button>
            </div>

          ) : (
            <div className='video-div'>
              <video ref={videoRef}>
                <source src={selectedVideo} />
              </video>
              <div className='stream-end-div'>
                <Button text={"Leave lounge"} className="leave-btn" onClick={leaveRoom} />
              </div>
            </div>
          )}
        </div>
        <ChatBox socket={socket} roomId={roomId} />
      </main>
    </>
  );
}

export default UserB;


{/* <div>
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
</div> */}
