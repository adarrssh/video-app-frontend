import React, { useState, useRef, useEffect } from 'react'
// import "./index.css"
// import Stream from './Stream'
import JoinRoom from './JoinRoom'
import Button from '../../components/button/button'
import { io } from 'socket.io-client';

const Index = () => {
    const [room, setRoom] = useState(false)
    const [roomId, setRoomId] = useState('');

    const socket = useRef(null);
    // console.log(socket);
    useEffect(() => {
        // Socket event listeners
        const handleConnect = () => {
            console.log('Connected to server');
        };

        socket.current = io(process.env.REACT_APP_SOCKET);

        // socket.current.on('roomCreated', (roomId) => {
        //     setRoomId(roomId);
        //     console.log('created room id', roomId);
        // });

        // socket.current.on('userJoined', (id) => {
        //     console.log(id, ' joined the room');
        // });

        const handleDisconnect = () => {
            console.log('Disconnected from server');
        };

        socket.current.on('connect', handleConnect);
        socket.current.on('disconnect', handleDisconnect);

        // Clean up the socket connection
        return () => {
            socket.current.off('connect', handleConnect);
            socket.current.off('disconnect', handleDisconnect);
            socket.current.disconnect();
        };
    }, []);

    
      const handleJoinRoom = () => {
        setRoom(roomId)
        socket.current.emit('joinRoom', roomId);
      };
    
    return (
        <>
            {
                !room ?
                <>
                <input
                type="text"
                value={roomId}
                onChange={(e) => {
                  setRoomId(e.target.value);
                }}
                placeholder="Enter Room ID"
              />
                <Button className="create-room-btn" onClick={handleJoinRoom} text={"Enter Room Id"} />
                </>

                    : <JoinRoom socket={socket} roomId={roomId} />
            }
        </>
    )
}

export default Index