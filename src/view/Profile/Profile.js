import React from 'react'
import './Profile.css'
import ProfileBgSvg from '../../utils/svg/ProfileBgSvg'
import DefaultProfileSvg from '../../utils/svg/DefaultProfileSvg'
const Profile = () => {
    return (
        <main className='profile-main'>
            <div className="profile-content">
                <div className="left-profile">
                    <ProfileBgSvg/>
                </div>
                <div className="right-profile">
                    <div className="profile-details">
                        <div className="profile-heading text-left w-80">
                            Account details
                        </div>
                        <div className="m-t-40 w-80">
                            <div className="username-text input-heading">
                                Username
                            </div>
                            <div className="username-inp m-t-10">
                                <input className='input-css w-100' type="text" placeholder='Swarna' />
                            </div>
                        </div>
                        <div className="m-t-20 w-80">
                            <div className="email-text input-heading">
                                Email address
                            </div>
                            <div className="email-inp m-t-10">
                                <input className='input-css  w-100' type="text" placeholder='adarsh00502@gmail.com' />
                            </div>
                        </div>
                        <div className="m-t-20 w-80">
                            <div className="passwoed-text input-heading">
                                password
                            </div>
                            <div className="m-t-10">
                                <input className='input-css  w-100' type="text" placeholder='******************' />

                            </div>
                        </div>
                    </div>
                </div>
                <div className="profile-pic">
                    <DefaultProfileSvg/>
                </div>
            </div>
        </main>
    )
}

export default Profile