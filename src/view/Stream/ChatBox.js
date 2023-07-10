import React from 'react'
import logo from '../../img/logo.png'
import './ChatBox.css'
const ChatBox = () => {
  return (
    <div className='stream-right'>

    <div className='stream-chat-box'>
      <div className='chatbox-header'>
        In lounge: no cuties
      </div>
      <div className="chatbox-body">
        <div className="chat-msg-left">
          <div className='profile-pic'>
            <img src={logo} alt="profile-pic" />
          </div>
          <div className='chat-msg'>
            hey hey cuties
          </div>
        </div>
        <div className='chat-msg-right'>
          <div className='profile-pic'>
            <img src={logo} alt="profile-pic" />
          </div>
          <div className='chat-msg'>
            hey hey cuties
          </div>
        </div>
        <div className="chat-msg-left">
          <div className='profile-pic'>
            <img src={logo} alt="profile-pic" />
          </div>
          <div className='chat-msg'>
            hey hey cuties
          </div>
        </div>
        <div className='chat-msg-right'>
          <div className='profile-pic'>
            <img src={logo} alt="profile-pic" />
          </div>
          <div className='chat-msg'>
            hey hey cuties
          </div>
        </div>
        <div className='chat-msg-right'>
          <div className='profile-pic'>
            <img src={logo} alt="profile-pic" />
          </div>
          <div className='chat-msg'>
            hey hey cuties
          </div>
        </div>
        <div className='chat-msg-right'>
          <div className='profile-pic'>
            <img src={logo} alt="profile-pic" />
          </div>
          <div className='chat-msg'>
            hey hey cuties
          </div>
        </div>
        <div className='chat-msg-right'>
          <div className='profile-pic'>
            <img src={logo} alt="profile-pic" />
          </div>
          <div className='chat-msg'>
            hey hey cuties
          </div>
        </div>
      </div>
      <div className="chatbox-msg">
        <input type="text"  defaultValue={"Chat here..."}/>
      </div>
    </div>
  </div>
  )
}

export default ChatBox