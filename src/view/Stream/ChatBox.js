import React, { useEffect, useState } from 'react'
import logo from '../../utils/img/logo.png'
import './ChatBox.css'
const ChatBox = ({ socket, roomId }) => {
  const [message, setMessage] = useState("")
  const [chatMessage, setChatMessage] = useState([])

  const sendMessage = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();

      // Add your code to send the message to the server or perform any desired action
      console.log('Sending message:', message);
      setChatMessage([...chatMessage, { messgeRecieved: false, message }])
      socket.current.emit('send-message', { roomId, message })

      // Clear the input field after sending the message
      setMessage('');
    }
  };
  
  useEffect(()=>{

    const printMessage = (message) => {
      setChatMessage(prevChatMessage => [
        ...prevChatMessage,
        { messgeRecieved: true, message }
      ]);
    };
    socket.current.on('messageBroadcast', printMessage)
  },[])

  const AppendMessage = ({ item }) => {

    if (item.messgeRecieved) {

      return (<div className="chat-msg-left">
        <div className='chat-profile-pic'>
          <img src={logo} alt="profile-pic" />
        </div>
        <div className='chat-msg'>
          {item.message}
        </div>
      </div>)

    } else {
      return (
        <div className='chat-msg-right'>
          <div className='chat-profile-pic'>
            <img src={logo} alt="profile-pic" />
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
          In lounge: no cuties
        </div>
        <div className="chatbox-body">
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




{/* <div className="chat-msg-left">
<div className='profile-pic'>
  <img src={logo} alt="profile-pic" />
</div>
<div className='chat-msg'>
  {text}
</div>
</div>  */}



{/* <div className='chat-msg-right'>
<div className='profile-pic'>
  <img src={logo} alt="profile-pic" />
</div>
<div className='chat-msg'>
  {text}
</div>
</div> */}


