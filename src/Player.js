import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Player = (props) => {
  const { id } = useParams();
    const [videoId, setVideoId] = useState(id);
    const [videoData, setVideoData] = useState({});

    useEffect(() => {
        const fetchVideoData = async () => {
            try {
                const res = await fetch(`https://video-app-g2dr.onrender.com/video/${videoId}`,{headers:{'Range':'bytes=0-261120'}});
                const data = await res.json();
                setVideoData(data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchVideoData();
    }, [videoId]);

    return (
        <div className="App">
            <header className="App-header">
                <video controls muted autoPlay>
                    <source src={`https://video-app-g2dr.onrender.com/video/${videoId}`} type="video/mp4"></source>
                </video>
                <h1>{videoData.name}</h1>
            </header>
        </div>
    );
};

export default Player;
