import React, { useState } from 'react';

const UploadVideo = () => {
  const [videoFile, setVideoFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setVideoFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (videoFile) {
      const formData = new FormData();
      formData.append('video', videoFile);

      try {
        const response = await fetch('http://localhost:4000/upload', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Video uploaded successfully');
          console.log('File ID:', data.fileId);
          // Handle successful upload
        } else {
          console.log('Error uploading video:', response.statusText);
          // Handle upload error
        }
      } catch (error) {
        console.log('Error uploading video:', error);
        // Handle upload error
      }
    }
  };

  return (
    <div>
      <h1>Upload Video</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input type="file" accept="video/*" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default UploadVideo;
