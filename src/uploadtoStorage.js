import React ,{useState} from 'react'

const UploadVideotoStorage = () => {
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
          const response = await fetch('https://video-app-g2dr.onrender.com/upload-to-localstorage', {
            method: 'POST',
            body: formData,
          });
          console.log(response);
          if (response.ok) {
            console.log('Video uploaded successfully');
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
}

export default UploadVideotoStorage