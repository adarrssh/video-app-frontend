import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3001');

function App() {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    socket.on('play-video', () => {
      if (selectedVideo) {
        selectedVideo.play();
      }
    });

    socket.on('pause-video', () => {
      if (selectedVideo) {
        selectedVideo.pause();
      }
    });

    socket.on('seek-video', (timeStamp) => {
      if (selectedVideo) {
        selectedVideo.currentTime = timeStamp;
      }
    });

    return () => {
      socket.off('play-video');
      socket.off('pause-video');
      socket.off('seek-video');
    };
  }, [selectedVideo]);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    const response = await fetch('/videos');
    const data = await response.json();
    setVideos(data.videos);
  };

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
    socket.emit('play-video');
  };

  const handleUpload = async (event) => {
    event.preventDefault();
    const fileInput = event.target.querySelector('input[type="file"]');
    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append('video', file);
    formData.append('title', file.name);

    try {
      const response = await fetch('http://localhost:3001/upload', {
        method: 'POST',
        body: formData,
      });

      console.log(response);
      if (response.ok) {
        fetchVideos();
      }
    } catch (error) {
      console.error('Failed to upload video:', error);
    }
  };

  return (
    <div className="App">
      <h1>Videos</h1>
      <div>
        {videos.map((video) => (
          <button key={video._id} onClick={() => handleVideoClick(video)}>
            {video.title}
          </button>
        ))}
      </div>
      <h2>Upload Video</h2>
      <form onSubmit={handleUpload}>
        <input type="file" name="video" accept="video/mp4" />
        <button type="submit">Upload</button>
      </form>
      {selectedVideo && (
        <div>
          <video
            ref={(ref) => (selectedVideo = ref)}
            src={`/video/${selectedVideo.filename}`}
          ></video>
        </div>
      )}
    </div>
  );
}

export default App;
