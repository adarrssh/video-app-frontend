import React, { useRef, useEffect, useState } from 'react';
import "./Stream.css"
import ChatBox from './ChatBox';
import Button from '../../components/button/button';
// import { io } from 'socket.io-client';
import { useNavigate } from 'react-router-dom';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import PauseIcon from '@mui/icons-material/Pause';

function Stream({socket,roomId, imageSrc,userData,senderProfileImage}) {
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [showVideoControls, setShowVideoControls] = useState(false)
  const [fullScreen , setFullScreen] = useState(false)
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


  const handleSeeked = () => {
    if (videoRef.current) {
      console.log('handleSeeked', videoRef.current.currentTime);
      socket.current.emit('timeChanged', { roomId, time: videoRef.current.currentTime });
    }
  };

  const handlePlay = () => {
    console.log('handlePlay');
    videoRef.current.play()
    socket.current.emit('play', roomId);
    setIsPlaying(true)
  };

  const handlePause = () => {
    console.log('handlePause');
    videoRef.current.pause()
    socket.current.emit('pause', roomId);
    setIsPlaying(false)
  };

  const handleCreateRoom = () => {
    socket.current.emit('createRoom');
  };

  const leaveRoom = () => {
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
      console.log(videoRef.current.duration);
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
                onhandle
                onSeeked={handleSeeked} onPlay={handlePlay} onPause={handlePause}
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

                        <PauseIcon fontSize="large" className="play-pause" onClick={handlePause}/> :
                        <PlayArrowIcon  fontSize="large" className="play-pause" onClick={handlePlay}/> 
                        

                      }
                      <FullscreenExitIcon onClick={toggleFullScreen}   fontSize="large" className="full-screen-toggle-icon"/>
                      {notifyMsgInFullScreen && fullScreen?  <Button text={"msg"} className={'exit-fullScreen'} />: ''}
                     
                    </div>
                  </>
                  : ""}

              </div>
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
          setNotifyMsgInFulScreen={setNotifyMsgInFulScreen}
          fullScreen = {fullScreen}
          />
      </main>
    </>
  );
}

export default Stream;


{/* <div className='video-div'>
<video ref={videoRef} controls onSeeked={handleSeeked} onPlay={handlePlay} onPause={handlePause}>
  <source src={selectedVideo} />
</video>
<div className='stream-end-div'>
  <Button text={"Leave lounge"} className="leave-btn" onClick={leaveRoom} />
</div>
</div> */}