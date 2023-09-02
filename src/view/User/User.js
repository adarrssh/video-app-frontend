import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import Button from "../../components/button/button";
import ChatBox from "../Stream/ChatBox";
import { useNavigate } from "react-router-dom";
import "./User.css";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import PauseIcon from '@mui/icons-material/Pause';
import NotificationAddIcon from '@mui/icons-material/NotificationAdd';


// const socket = io(process.env.REACT_APP_SOCKET);

function User({ socket, roomId, userData, imageSrc, senderProfileImage, senderUsername,isHost }) {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  // const [message, setMessage] = useState("")
  // const [chatMessage, setChatMessage] = useState([])
  // const [roomId, setRoomId] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isValidRoomId, setIsValidRoomId] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [showVideoControls, setShowVideoControls] = useState(false)
  const [fullScreen, setFullScreen] = useState(false)
  const [notifyMsgInFullScreen, setNotifyMsgInFulScreen] = useState(false)


  useEffect(() => {
    socket.current.on("invalidRoomId", () => {
      setIsValidRoomId(false);
    });

    const handlePlayBroadcast = () => {
      console.log("playBroadcast");
      if (videoRef.current && videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      }
    };

    const handlePauseBroadcast = () => {
      console.log("pauseBroadcast");
      if (videoRef.current && !videoRef.current.paused) {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    };

    const handleBroadcastTime = (time) => {
      if (videoRef.current) {
        console.log("broadcastTime", time);
        videoRef.current.currentTime = time;
      }
    };

    socket.current.on("playBroadcast", handlePlayBroadcast);
    socket.current.on("pauseBroadcast", handlePauseBroadcast);
    socket.current.on("broadcastTime", handleBroadcastTime);

    return () => {
      socket.current.off("invalidRoomId");
    };
  }, []);



  const handleJoinRoom = () => {
    console.log(userData);
    alert("hi");
    socket.current.emit("joinRoom", roomId);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedVideo(URL.createObjectURL(file));
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const leaveRoom = () => {
    // Disconnect from server
    socket.current.current.disconnect();

    // Navigate to home page or desired route
    navigate("/");
  };



  const updateTime = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const setVideoDuration = () => {
    if (videoRef.current) {
      console.log(videoRef.current.duration);
      setTotalDuration(videoRef.current.duration);
    }
  };

  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = Math.floor(timeInSeconds % 60);

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const toggleFullScreen = async () => {
    const container = document.getElementById("video-div-fullScreen");
    const fullscreenApi =
      container.requestFullscreen ||
      container.webkitRequestFullScreen ||
      container.mozRequestFullScreen ||
      container.msRequestFullscreen;
    setShowVideoControls(true)
    if (!document.fullscreenElement) {
      fullscreenApi.call(container);
      setFullScreen(true)
      setNotifyMsgInFulScreen(false)
    } else {
      document.exitFullscreen();
      setShowVideoControls(false)
      setFullScreen(false)
      setNotifyMsgInFulScreen(false)
    }
  };

  useEffect(() => {
    // Hide the button after 3 seconds
    const timer = setTimeout(() => {
      setShowVideoControls(false);
    }, 5000);

    return () => {
      clearTimeout(timer); // Clear the timer when the effect is cleaned up
    };

  }, [showVideoControls]);

  useEffect(() => {
    // Hide the button after 3 seconds
    const timer = setTimeout(() => {
      setNotifyMsgInFulScreen(false);
    }, 5000);

    return () => {
      clearTimeout(timer); // Clear the timer when the effect is cleaned up
    };

  }, [notifyMsgInFullScreen]);


  return (
    <>
      <main className="stream-main-comp">
        <div className="stream-left">
          {!selectedVideo ? (
            <div className="stream-video-div">
              <input
                type="file"
                style={{ display: "none" }}
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="video/*"
              />
              <Button
                className="choose-btn"
                onClick={handleButtonClick}
                text={"Choose your video"}
              />
              <button onClick={handleJoinRoom}>Join Room</button>
            </div>
          ) : (
            <>
              <div onClick={() => setShowVideoControls(true)} className="video-div" id="video-div-fullScreen">
                <video
                  ref={videoRef}
                  onTimeUpdate={updateTime}
                  onLoadedMetadata={setVideoDuration}
                >
                  <source src={selectedVideo} />
                </video>
                <div className="video-controls">
                  {showVideoControls ?
                    <>
                      <div className="video-timeline">
                        <input
                          type="range"
                          min={0}
                          max={totalDuration}
                          value={currentTime}
                          className="timeline"
                        />
                      </div>
                      <div className="video-controls-btn">
                        {
                          isPlaying ?

                            <PauseIcon fontSize="large" className="play-pause" /> :
                            <PlayArrowIcon fontSize="large" className="play-pause" />


                        }
                        <div className="video-time">
                          <span>{formatTime(currentTime)}</span> / <span>{formatTime(totalDuration)}</span>
                        </div>
                        <FullscreenExitIcon onClick={toggleFullScreen} fontSize="large" className="full-screen-toggle-icon" />
                      </div>
                    </>
                    : ""}

                </div>
                {notifyMsgInFullScreen && fullScreen ? <NotificationAddIcon fontSize='large' className='notificaton-msg' /> : ''}
              </div>
              <div className="stream-end-div">
                <Button
                  text={"Leave lounge"}
                  className="leave-btn"
                  onClick={leaveRoom}
                />
              </div>
            </>
          )}
        </div>
        <ChatBox
          socket={socket}
          roomId={roomId}
          userData={userData}
          imageSrc={imageSrc}
          senderProfileImage={senderProfileImage}
          showVideoControls={showVideoControls}
          setNotifyMsgInFulScreen={setNotifyMsgInFulScreen}
          fullScreen={fullScreen}
          senderUsername={senderUsername}
          isHost={isHost}
        />
      </main>
    </>
  );
}

export default User;
