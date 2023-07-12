import { io } from 'socket.io-client';

const socket = io(process.env.REACT_APP_SOCKET);

const handleConnect = () => {
    console.log('Connected to server');
};

const handleDisconnect = () => {
    console.log('Disconnected from server');
};

const createRoom = () => {
    socket.emit('createRoom');
};

const initializeSocket = (handlePause, handlePlay, handleSeeked) => {
  socket.on('roomCreated', (roomId) => {
    console.log('created room id', roomId);
  });

  socket.on('userJoined', (id) => {
    console.log(id, ' joined the room');
  });

  socket.on('connect', handleConnect);
  socket.on('disconnect', handleDisconnect);

  socket.on('pause', (roomId) => {
    handlePause(roomId);
  });

  socket.on('play', (roomId) => {
    handlePlay(roomId);
  });

  socket.on('timeChanged', ({ roomId, time }) => {
    handleSeeked(roomId, time);
  });
};

const disconnectSocket = () => {
  socket.off('connect', handleConnect);
  socket.off('disconnect', handleDisconnect);
  socket.disconnect();
};

export { socket, createRoom, initializeSocket, disconnectSocket };
