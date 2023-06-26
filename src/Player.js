import React, { useState, useEffect, useRef } from 'react';
import { useParams  } from 'react-router-dom';
const Player = () => {
  const { id:videoId } = useParams();
  const videoRef = useRef(null);


    return (
        <div className="player"  style={{ width: '70%', height: '60%' }}>
            <header className="App-header">
                <video controls muted autoPlay ref={videoRef} style={{ width: '70%', height: '60%' }}>
                    <source src={`http://localhost:4000/video/${videoId}`} type="video/mp4"></source>
                </video>
            </header>
        </div>
    );
};

export default Player;
