import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function VideoPlayer() {
  const [videoURL, setVideoURL] = useState('');
  const { id } = useParams();

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await fetch(`http://localhost:4000/video/${id}`, {
          headers: { Range: 'bytes=0-1048575' },
        });
        console.log(response);
        if (response.ok) {
          const contentRange = response.headers.get('Content-Range');
          const contentLength = contentRange.split('/')[1];
          const videoBlob = await response.blob();
          const videoURL = URL.createObjectURL(videoBlob);
          setVideoURL(videoURL);

          const sourceBuffer = await getSourceBuffer(videoURL, 'video/mp4');
          await appendDataToBuffer(sourceBuffer, videoURL, contentLength);
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
  }, [id]);

  const getSourceBuffer = async (videoURL, mimeType) => {
    const mediaSource = new MediaSource();
    const video = document.createElement('video');
    video.src = videoURL;
    video.controls = true;
    video.muted = true;
    video.play();

    const sourceBuffer = mediaSource.addSourceBuffer(mimeType);
    sourceBuffer.mode = 'sequence';
    video.src = URL.createObjectURL(mediaSource);
    mediaSource.addEventListener('sourceopen', () => {
      sourceBuffer.appendBuffer(new Uint8Array());
    });

    return sourceBuffer;
  };

  const appendDataToBuffer = async (sourceBuffer, videoURL, contentLength) => {
    const response = await fetch(videoURL, {
      headers: { Range: `bytes=${sourceBuffer.buffered.end(0)}-${contentLength}` },
    });

    if (response.ok) {
      const videoBuffer = await response.arrayBuffer();
      sourceBuffer.appendBuffer(videoBuffer);
    } else {
      console.error('Error fetching video:', response.status);
    }
  };

  return (
    <div>
      {videoURL ? (
        <video id="videoPlayer" controls>
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
