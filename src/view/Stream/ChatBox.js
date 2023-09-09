import React, { useEffect, useRef, useState } from 'react'
import logo from '../../utils/img/logo.png'
import './ChatBox.css'
import PinSvg from '../../utils/svg/PinSvg'
import fetchSenderImage from '../../services/fetchSenderImage'

const ChatBox = ({ socket, roomId ,imageSrc,userData, setNotifyMsgInFulScreen, isHostRef,setAlertVisible}) => {
  const [message, setMessage] = useState("")
  const [chatMessage, setChatMessage] = useState([])
  const [totalUserInRoom, setTotalUserInRoom] = useState(1)
  const [senderUsername, setSenderUserName] = useState('user')
  const [senderProfileImage, setSenderProfileImage] = useState(null)

  const messageEl = useRef(null)

  const sendMessage = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();

     
      setChatMessage([...chatMessage, { messgeRecieved: false, message }])
      socket.current.emit('send-message', { roomId, message })

      setMessage('');
    }
  };

  useEffect(()=>{
    if(messageEl){
      messageEl.current.addEventListener('DOMNodeInserted', event => {
        const {currentTarget: target} = event
        target.scroll({top:target.scrollHeight})
      })
    }
  },[])
  
  useEffect(()=>{

    const printMessage = (message) => {
      setNotifyMsgInFulScreen(true)
      setChatMessage(prevChatMessage => [
        ...prevChatMessage,
        { messgeRecieved: true, message }
      ]);
    };

    const userJoined = ({users}) =>{
      setTotalUserInRoom(users.length)

      if(isHostRef.current){
          setSenderUserName(users[1].username)
      }else{
          setSenderUserName(users[0].username)
      }

      setAlertVisible({
          show:true,
          message:`${users[1].username} joined the room`,
          severity:'success'
      })

        fetchSenderImage(users,isHostRef,setSenderProfileImage)
    }

    const userLeftRoom = (data)=>{
      const {user} = data
      alert(`${user} has left`)
      setChatMessage(prevChatMessage => [
        ...prevChatMessage,
        { userLeft: true, message: `${user} has left` }
      ]);
  }

    socket.current.on('messageBroadcast', printMessage)
    socket.current.on('userJoined', userJoined);
    socket.current.on("userDisconnected",userLeftRoom)
  },[])

  const AppendMessage = ({ item }) => {
    if(item.userJoined || item.userLeft){
      return (
      <div className="chat-msg-left">
        <div className='chat-msg'>
          {item.message}
        </div>
      </div>
      )
    }
    else if (item.messgeRecieved) {

      return (<div className="chat-msg-left">
        <div className='chat-profile-pic'>
          <img src={senderProfileImage||logo} alt="profile-pic" />
          <p>{senderUsername}</p>
        </div>
        <div className='chat-msg'>
          {item.message}
        </div>
      </div>)

    } else {
      return (
        <div className='chat-msg-right'>
          <div className='chat-profile-pic'>
            <p>{userData?.username}</p>
            <img src={imageSrc} alt="profile-pic" />
          </div>
          <div className='chat-msg'>
            {item.message}
          </div>
        </div>
      )

    }
  }

  return (
    <div className='stream-right'>

      <div className='stream-chat-box'>
        <div className='chatbox-header'>
          In lounge: {totalUserInRoom} cuties
        </div>
          <div className='room-id-div'>
            <div className='room-id'>

            <div >
            roomId : {roomId ? roomId:"loading ..."}
            </div>
            <div>
              <PinSvg/>
            </div>
            </div>
          </div>
        <div className="chatbox-body" ref={messageEl}>
          {chatMessage.map((item, index) =>
            <>
              <AppendMessage key={index.toString()} item={item} />
            </>

          )
          }
        </div>
        <div className="chatbox-msg">
          <input
            type="text"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            onKeyDown={sendMessage}
            placeholder='Chat here...'
          />
        </div>
      </div>
    </div>
  )
}

export default ChatBox