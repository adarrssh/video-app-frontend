import React, { useRef, useEffect, useState } from 'react';
import "./Stream.css"
import ChatBox from './ChatBox';
import Button from '../../components/button/button';
// import { io } from 'socket.io-client';
import { useNavigate } from 'react-router-dom';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import PauseIcon from '@mui/icons-material/Pause';
import NotificationAddIcon from '@mui/icons-material/NotificationAdd';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function Stream({ socket, roomId, imageSrc, userData, senderProfileImage,isHostRef, setAlertVisible }) {
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [showVideoControls, setShowVideoControls] = useState(false)
  const [fullScreen, setFullScreen] = useState(false)
  const [notifyMsgInFullScreen, setNotifyMsgInFulScreen] = useState(false)
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedVideo(URL.createObjectURL(file));
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };


  const handleSeeked = (e) => {
    if (videoRef.current) {
      videoRef.current.currentTime = e.target.value;
      socket.current.emit('timeChanged', { roomId, time: videoRef.current.currentTime });
    }
  };

  const handlePlay = () => {
    videoRef.current.play()
    socket.current.emit('play', roomId);
    setIsPlaying(true)
  };

  const handlePause = () => {
    videoRef.current.pause()
    socket.current.emit('pause', roomId);
    setIsPlaying(false)
  };

  const leaveRoom = () => {  
    socket.current.emit('userLeft',{userData,roomId})
    socket.current.disconnect();
    navigate('/');
  };

  const updateTime = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const setVideoDuration = () => {
    if (videoRef.current) {
      setTotalDuration(videoRef.current.duration);
    }
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



  useEffect(() => {
  }, [notifyMsgInFullScreen])

  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = Math.floor(timeInSeconds % 60);

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
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
                          onChange={(e) => {
                            handleSeeked(e)
                          }}
                          className="timeline"
                        />
                      </div>
                      <div className="video-controls-btn">
                        {
                          isPlaying ?

                            <PauseIcon fontSize="large" className="play-pause" onClick={handlePause} /> :
                            <PlayArrowIcon fontSize="large" className="play-pause" onClick={handlePlay} />

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
          imageSrc={imageSrc}
          socket={socket}
          roomId={roomId}
          userData={userData}
          senderProfileImage={senderProfileImage}
          showVideoControls={showVideoControls}
          notifyMsgInFullScreen={notifyMsgInFullScreen}
          setNotifyMsgInFulScreen={setNotifyMsgInFulScreen}
          fullScreen={fullScreen}
          isHostRef={isHostRef}
          setAlertVisible={setAlertVisible}
        />
      </main>
    </>
  );
}

export default Stream;
