import React, { useState } from 'react';
import AWS from 'aws-sdk';

const UploadVideoPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (!selectedFile) {
      alert('Please select a video file.');
      return;
    }

    // Configure AWS SDK with your credentials and region
    AWS.config.update({
      accessKeyId: '',
      secretAccessKey: '',
      region: 'ap-south-1',
    });

    const s3 = new AWS.S3();

    // Upload the video file to S3
    const params = {
      Bucket: 'streamyourvideo',
      Key: `videos/${Date.now()}_${selectedFile.name}`, // Provide a unique key for the uploaded file
      Body: selectedFile,
      ContentType: selectedFile.type,
    };

    s3.upload(params, (err, data) => {
      if (err) {
        console.error('Error uploading video:', err);
        alert('Error uploading video. Please try again.');
      } else {
        console.log('Video uploaded successfully. URL:', data.Location);
        alert('Video uploaded successfully.');
        setSelectedFile(null); // Clear the selected file state after upload
      }
    });
  };

  return (
    <div>
      <h2>Upload Video</h2>
      <input type="file" accept="video/*" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default UploadVideoPage;
