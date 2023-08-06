import React, { useState, useRef, useEffect } from 'react'
import "./index.css"
import Stream from './Stream'
import Button from '../../components/button/button'
import { io } from 'socket.io-client';
import Modal from './Modal';
import UserB from '../JoinRoom/JoinRoom';

const Index = () => {
    const [room, setRoom] = useState(false)
    const [isHost, setIsHost] = useState(false)
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
        setIsHost(true)
        socket.current.emit('createRoom');
    };

    const handleJoinRoom = () => {
        setRoom(true)
        console.log(roomId);
        socket.current.emit('joinRoom', roomId);
    };

    return (
        <>
            {
                !room ?
                (

                    <Modal handleCreateRoom={handleCreateRoom} handleJoinRoom={handleJoinRoom} setRoomId={setRoomId}/>
                    )

                    : 
                    
                    ( isHost? <Stream socket={socket} roomId={roomId}/>: <UserB socket={socket} roomId={roomId}/>) 
            }
        </>
    )
}

export default Index