import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import Button from "../../components/button/button";
import ChatBox from "../Stream/ChatBox";
import { useNavigate } from "react-router-dom";
import "./User.css";
const socket = io(process.env.REACT_APP_SOCKET);

function User({ socket, roomId, userData, imageSrc, senderProfileImage }) {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  // const [message, setMessage] = useState("")
  // const [chatMessage, setChatMessage] = useState([])
  const videoRef = useRef(null);
  // const [roomId, setRoomId] = useState('');
  const [isValidRoomId, setIsValidRoomId] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [totalDuration, setTotalDuration] = useState(0);
  const [fullScreen, setFullScreen] = useState(false)
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



  // useEffect(()=>{
  //   if(selectedVideo !== null && videoRef.current){
  //     console.log(videoRef.current);
  //   }
  // },[selectedVideo])


  useEffect(() => {
    // Hide the button after 3 seconds
    setTimeout(() => {
      setFullScreen(false)
    }, 5000)

  }, [fullScreen]);


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

  const formatTime = (timeInSeconds) => {
    if (isNaN(timeInSeconds)) {
      return "00:00:00";
    }
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${hours}:${String(minutes).padStart(2, "0")}:${String(
      seconds
    ).padStart(2, "0")}`;
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
    setFullScreen(true)
    if (!document.fullscreenElement) {
      fullscreenApi.call(container);
    } else {
      document.exitFullscreen();
    }
  };


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
              <div onClick={() => setFullScreen(true)} className="video-div" id="video-div-fullScreen">
                <video
                  ref={videoRef}
                  onTimeUpdate={updateTime}
                  onLoadedMetadata={setVideoDuration}
                >
                  <source src={selectedVideo} />
                </video>
                <div className="video-controls">
                  {fullScreen ?
                    <>
                      <div className="">
                        <Button onClick={toggleFullScreen} text={"fullScreen"} className={'exit-fullScreen'} />
                        <Button onClick={()=>{videoRef.current.pause()}} text={"pause"} className={'exit-fullScreen'} />
                        <Button onClick={()=>{videoRef.current.play()}} text={"play"} className={'exit-fullScreen'} />
                      </div>
                      <div className="video-timeline">
                        <input
                          type="range"
                          min={0}
                          max={totalDuration}
                          value={currentTime}
                          className="timeline"
                        />
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
          socket={socket}
          roomId={roomId}
          userData={userData}
          imageSrc={imageSrc}
          senderProfileImage={senderProfileImage}
        />
      </main>
    </>
  );
}

export default User;
