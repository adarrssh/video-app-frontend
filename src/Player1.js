import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'
function VideoPlayer() {
  const [videoURL, setVideoURL] = useState('');
  const { id:videoId } = useParams();

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await axios.get(`https://video-app-g2dr.onrender.com/video/${videoId}`, {
          headers: { 'Range':'bytes=0-261120'},
        });
        console.log(response);
        if (response.ok) {
          // const contentRange = response.headers.get('Content-Range');
          // const contentLength = contentRange ? contentRange.split('/')[1] : '';
          const videoBlob = await response.blob();
          console.log(videoBlob);
          const videoURL = URL.createObjectURL(videoBlob);
          setVideoURL(videoURL);
        } else {
          console.error('Error fetching video:', response.status);
        }
      } catch (error) {
        console.error('Error fetching video:', error);
      }
    };
    fetchVideo();
    return () => {
      if (videoURL) {
        URL.revokeObjectURL(videoURL);
      }
    };
  }, [videoId,videoURL]);

  return (
    <div>
      {videoURL ? (
        <video controls>
          <source src={videoURL} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <p>Loading video...</p>
      )}
    </div>
  );
}

export default VideoPlayer;
