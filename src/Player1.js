// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios'
// function VideoPlayer() {
//   const [videoURL, setVideoURL] = useState('');
//   const { id:videoId } = useParams();

//   useEffect(() => {
//     const fetchVideo = async () => {
//       try {
//         const response = await axios.get(`https://video-app-g2dr.onrender.com/video/${videoId}`, {
//           headers: { 'Range': 'bytes=0-' },
//           responseType: 'blob', // Set the response type to 'blob'
//         });
//         console.log(response);
//         if (response.status === 200) {
//           const videoBlob = new Blob([response.data], { type: response.headers['content-type'] });
//           const videoURL = URL.createObjectURL(videoBlob);
//           setVideoURL(videoURL);
//         } else {
//           console.error('Error fetching video:', response.status);
//         }
//       } catch (error) {
//         console.error('Error fetching video:', error);
//       }
//     };
//     fetchVideo();
//     return () => {
//       if (videoURL) {
//         URL.revokeObjectURL(videoURL);
//       }
//     };
//   }, [videoId, videoURL]);

//   return (
//     <div>
//       {videoURL ? (
//         <video controls>
//           <source src={videoURL} type="video/mp4" />
//           Your browser does not support the video tag.
//         </video>
//       ) : (
//         <p>Loading video...</p>
//       )}
//     </div>
//   );
// }


// export default VideoPlayer;
