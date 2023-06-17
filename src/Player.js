import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function VideoPlayer() {
  const [videoURL, setVideoURL] = useState('');
  const { id:videoId } = useParams();

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await fetch(`http://localhost:4000/video/${videoId}`, {
          headers: { Range: 'bytes=0-261120' },
        });
        let res =  response
        console.log(res);
        if (response.ok) {
          const contentRange = response.headers.get('Content-Range');
          const contentLength = contentRange? contentRange.split('/')[1]:'';
          const videoBlob = await response.blob();
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
  }, [videoId]);

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
