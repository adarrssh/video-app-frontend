import React from 'react'
import './Profile.css'
import ProfileBgSvg from '../../utils/svg/ProfileBgSvg'
import DefaultProfileSvg from '../../utils/svg/DefaultProfileSvg'
import Button from '../../components/button/button'
import { useNavigate } from 'react-router-dom'
const Profile = ({setImageSrc,userData}) => {
    const navigate = useNavigate()
    const logout = () =>{
        localStorage.clear('token')
        setImageSrc(null)
        navigate('/')
    }
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
                                <input className='input-css w-100' type="text" value={userData.username} />
                            </div>
                        </div>
                        <div className="m-t-30 w-80">
                            <div className="email-text input-heading">
                                Email address
                            </div>
                            <div className="email-inp m-t-10">
                                <input className='input-css  w-100' type="text"  value={userData.email}/>
                            </div>
                        </div>
                        <div className="m-t-30 w-80">
                            <div className="passwoed-text input-heading">
                                password
                            </div>
                            <div className="m-t-10">
                                <input className='input-css  w-100' type="text"  value={userData.password} />
                            </div>
                        </div>
                        <div className='m-t-30 w-80 log-out-div'>
                            <Button className={'log-out'} text={'log out'} onClick={logout}/>
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