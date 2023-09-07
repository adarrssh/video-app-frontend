import React, { useState, useRef, useEffect } from 'react'
import "./index.css"
import Stream from './Stream'
import { io } from 'socket.io-client';
import Modal from './Modal';
import User from '../User/User';
import { useNavigate } from 'react-router-dom';

const Index = ({imageSrc, userData,setAlertVisible}) => {
    const navigate = useNavigate()
    const [room, setRoom] = useState(false)
    const [isHost, setIsHost] = useState(false)
    const isHostRef = useRef(isHost); 
    const [roomId, setRoomId] = useState('');
    const socket = useRef(null);


    useEffect(()=>{
        if(!localStorage.getItem('token')){
            navigate('/login')
        }
    })


      
    useEffect(() => {
        // Socket event listeners
        const handleConnect = () => {
            console.log('Connected to server');
        };

        socket.current = io(process.env.REACT_APP_SOCKET);

        socket.current.on('roomCreated', (data) => {
            const {users,roomId} = data
            setRoomId(roomId);
            localStorage.setItem('roomId',roomId)
            console.log('created room id', roomId);
        });


        

        const handleDisconnect = () => {
            console.log('Disconnected from server');
        };

        const userLeftRoom = (data)=>{
            const {user} = data
            alert(`${user} has left`)
            console.log(user);
          }
        socket.current.on('connect', handleConnect);
        socket.current.on('disconnect', handleDisconnect);
        socket.current.on("userDisconnected",userLeftRoom)
        
        
        
        // Clean up the socket connection
        return () => {
            socket.current.off('connect', handleConnect);
            socket.current.off('disconnect', handleDisconnect);
            socket.current.disconnect();
        };
    }, []);

    useEffect(()=>{
        isHostRef.current = isHost
    },[isHost])


    const handleCreateRoom = () => {
        setRoom(true)
        setIsHost(true)
        socket.current.emit('createRoom',userData);
    };
    const handleJoinRoom = () => {
        setRoom(true)
        console.log(roomId,userData);
        socket.current.emit('joinRoom', {roomId,userData});
    };


    return (
        <>
            {
                !room ?
                (

                    <Modal handleCreateRoom={handleCreateRoom} handleJoinRoom={handleJoinRoom} setRoomId={setRoomId} userData={userData}/>
                    )

                    : 
                    
                    ( isHost? 
                    
                    <Stream 
                        socket={socket}
                        roomId={roomId} 
                        imageSrc={imageSrc} 
                        userData={userData} 
                        isHostRef={isHostRef}
                        setAlertVisible={setAlertVisible}
                        />:
                    <User 
                        socket={socket} 
                        roomId={roomId} 
                        userData={userData} 
                        imageSrc={imageSrc} 
                        isHostRef={isHostRef}
                        setAlertVisible={setAlertVisible}
                        />) 
            }
        </>
    )
}

export default Index