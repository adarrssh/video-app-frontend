import React, { useRef, useState } from 'react';

function VideoPlayer() {
  const videoRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);

  const handleSeek = () => {
    const timeInSeconds = parseInt(videoRef.current.currentTime, 10);
    setCurrentTime(timeInSeconds);
  };

  const handlePlay = () => {
    videoRef.current.play();
  };

  const handlePause = () => {
    videoRef.current.pause();
  };

  const handleSeekToTime = () => {
    videoRef.current.currentTime = currentTime;
  };

  return (
    <div>
      <video
        ref={videoRef}
        src="path/to/video.mp4"
        onTimeUpdate={handleSeek}
      />
      <div>
        <button onClick={handlePlay}>Play</button>
        <button onClick={handlePause}>Pause</button>
      </div>
      <div>
        <input
          type="number"
          value={currentTime}
          onChange={(e) => setCurrentTime(e.target.value)}
        />
        <button onClick={handleSeekToTime}>Seek</button>
      </div>
    </div>
  );
}

export default VideoPlayer;
