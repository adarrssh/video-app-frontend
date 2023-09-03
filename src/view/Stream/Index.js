import React, { useState, useRef, useEffect } from 'react'
import "./index.css"
import Stream from './Stream'
import Button from '../../components/button/button'
import { io } from 'socket.io-client';
import Modal from './Modal';
import User from '../User/User';
import { useNavigate } from 'react-router-dom';
import fetchSenderProfileImage from '../../services/fetchSenderProfileImage';

const Index = ({imageSrc, userData, setAlertVisible}) => {
    const navigate = useNavigate()
    const [room, setRoom] = useState(false)
    const [isHost, setIsHost] = useState(false)
    const isHostRef = useRef(isHost); 
    const [roomId, setRoomId] = useState('');
    const [senderProfileImage, setSenderProfileImage] = useState(null)
    const [senderUsername, setSenderUserName] = useState('user')
    const [totalUserInRoom, setTotalUserInRoom] = useState(1)
    const socket = useRef(null);
    // console.log(socket);
    const fetchSenderImage = async (users) =>{
        const email = isHost? users[1].email : users[0].email
        const data = await fetchSenderProfileImage(email,setSenderProfileImage)
    }  


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
            console.log('created room id', roomId);
        });

        socket.current.on('userJoined', ({users}) => {
            setTotalUserInRoom(users.length)
            if(isHostRef.current){
                console.log('is true');
                setSenderUserName(users[1].username)
            }else{
                console.log('isfalse');
                setSenderUserName(users[0].username)
            }
            // isHost ? setSenderUserName(users[1].username) : setSenderUserName(users[0].username)
            setAlertVisible({
                show:true,
                message:`${users[1].username} joined the room`,
                severity:'success'
              })

              fetchSenderImage(users)
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
                        senderProfileImage={senderProfileImage}
                        senderUsername={senderUsername}
                        isHost={isHost}
                        totalUserInRoom={totalUserInRoom}
                        />:
                    <User 
                        socket={socket} 
                        roomId={roomId} 
                        userData={userData} 
                        imageSrc={imageSrc} 
                        senderProfileImage={senderProfileImage}
                        senderUsername={senderUsername}
                        isHost={isHost}
                        totalUserInRoom={totalUserInRoom}
                        />) 
            }
        </>
    )
}

export default Index