import React, { useState, useRef, useEffect } from 'react'
import "./index.css"
import Stream from './Stream'
import Button from '../../components/button/button'
import { io } from 'socket.io-client';
import Modal from './Modal';

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

        socket.current.on('roomCreated', (roomId) => {
            setRoomId(roomId);
            console.log('created room id', roomId);
        });

        socket.current.on('userJoined', (id) => {
            console.log(id, ' joined the room');
        });

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

    const handleCreateRoom = () => {
        setRoom(true)
        socket.current.emit('createRoom');
    };

    return (
        <>
            {/* {
                !room ? <Button className="create-room-btn" onClick={handleCreateRoom} text={"Create Room"} />

                    : <Stream socket={socket} roomId={roomId} />
            } */}
            <Modal/>
        </>
    )
}

export default Index