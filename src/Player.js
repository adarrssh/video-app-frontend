import React, { useState, useEffect, useRef } from 'react';
import { useParams  } from 'react-router-dom';
import io from 'socket.io-client';
const socket = io('https://video-app-g2dr.onrender.com/');

const Player = (props) => {
  const { id } = useParams();
  const videoRef = useRef(null);
  const [videoId, setVideoId] = useState(id);

    useEffect(()=>{
        socket.on('sync',()=>{
        Forward()
        })
    },[])
    const handleForward = () => {
      if (videoRef.current) {
        videoRef.current.currentTime += 10; // Forward by 10 seconds
        socket.emit('sync',{time:10})
      }
    };
    
    const Forward = () => {
          videoRef.current.currentTime += 10; // Forward by 10 seconds
      };


    return (
        <div className="App">
            <header className="App-header">
                <video controls muted autoPlay ref={videoRef} style={{ width: '70%', height: '60%' }}>
                    <source src={`https://video-app-g2dr.onrender.com/video/${videoId}`} type="video/mp4"></source>
                </video>
                <button onClick={handleForward}>Forward 10 seconds</button>

            </header>
        </div>
    );
};

export default Player;
