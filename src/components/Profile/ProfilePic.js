import React from 'react'
import profile from '../../img/logo.png'
import "./Profile.css"
const ProfilePic = () => {
  return (
    <div className='profile-pic'>
        <img src={profile} alt="profile-pic" />
    </div>
  )
}

export default ProfilePic