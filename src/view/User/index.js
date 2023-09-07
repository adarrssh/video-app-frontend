// import React, { useState, useRef, useEffect } from 'react'
// import JoinRoom from './User'
// import Button from '../../components/button/button'
// import { io } from 'socket.io-client';

// const Index = () => {
//   const [room, setRoom] = useState(false)
//   const [roomId, setRoomId] = useState('');

//   const socket = useRef(null);

//   useEffect(() => {
//     const handleConnect = () => {
//       console.log('Connected to server');
//     };

//     socket.current = io(process.env.REACT_APP_SOCKET);

//     const handleDisconnect = () => {
//       console.log('Disconnected from server');
//     };

//     socket.current.on('connect', handleConnect);
//     socket.current.on('disconnect', handleDisconnect);

//     // Clean up the socket connection
//     return () => {
//       socket.current.off('connect', handleConnect);
//       socket.current.off('disconnect', handleDisconnect);
//       socket.current.disconnect();
//     };
//   }, []);


//   const handleJoinRoom = () => {
//     setRoom(roomId)
//     socket.current.emit('joinRoom', roomId);
//   };

//   return (
//     <>
//       {
//         !room ?
//           <>
//             <input
//               type="text"
//               value={roomId}
//               onChange={(e) => {
//                 setRoomId(e.target.value);
//               }}
//               placeholder="Enter Room ID"
//             />
//             <Button className="create-room-btn" onClick={handleJoinRoom} text={"Enter Room Id"} />
//           </>

//           : <JoinRoom socket={socket} roomId={roomId} />
//       }
//     </>
//   )
// }

// export default Index