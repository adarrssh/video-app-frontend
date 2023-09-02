import React, { useState, useEffect } from 'react'
import './Profile.css'
import ProfileBgSvg from '../../utils/svg/ProfileBgSvg'
import DefaultProfileSvg from '../../utils/svg/DefaultProfileSvg'
import Button from '../../components/button/button'
import { useNavigate } from 'react-router-dom'
import updateUserDetails from '../../services/updateUserDetails'
import PencilSvg from '../../utils/svg/PencilSvg'
import axios from 'axios'
import EditIcon from '@mui/icons-material/Edit';
import fetchUserProfileImage from '../../services/fetchProfileImage'
const Profile = ({ alertVisible, setAlertVisible, setImageSrc, imageSrc, userData, setUserData, setLoading }) => {

    const fileInputRef = React.createRef();

    const navigate = useNavigate()

    const initialUserData = {
        username: userData.username,
        email: userData.email,
        password: userData.password
    }


    const [updateUserData, setUpdateUserData] = useState(initialUserData);
    const [isUserNameEditable, setIsUserNameEditable] = useState(false)
    const [isPasswordEditable, setIsPasswordEditable] = useState(false)

    const logout = () => {
        localStorage.clear('token')
        setImageSrc(null)
        navigate('/')
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target
        setUpdateUserData((prevData) => (
            {
                ...prevData,
                [name]: value
            }
        ))
    };


    const handleEditClick = () => {
            setUpdateUserData((prevData) => (
                {
                    ...prevData,
                    password: ''
                }
            ))
    };

    function areObjectsEqual(obj1, obj2) {
        const keys1 = Object.keys(obj1);
        const keys2 = Object.keys(obj2);

        if (keys1.length !== keys2.length) {
            return false;
        }

        for (const key of keys1) {
            if (obj1[key] !== obj2[key]) {
                return false;
            }
        }

        return true;
    }

    const handleFileChange = (event) => {
        const file = event.target.files[0]

        if (file) {
            handleUpload(file)
        }

    };

    const shouldShowButton = areObjectsEqual(userData, updateUserData);

    const handleUpload = async (file) => {
        const formData = new FormData();
        formData.append('avatar', file);
        setLoading(true)
        try {
            const response = await axios.post(`${process.env.REACT_APP_SOCKET}/user/upload/image`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': localStorage.getItem('token')
                },
            });
            if (response.status === 200) {
                console.log('here');
                await fetchUserProfileImage(setAlertVisible, setImageSrc)
            } else {
                  throw new Error('Error in updating profile image')
              }
              console.log('end');
            setLoading(false)
        } catch (error) {
            setLoading(false)
            setAlertVisible({
                show:true,
                message:error.message,
                severity:'error'
              })
            console.error('Error uploading profile image:', error);
        }
    };


    return (
        <main className='profile-main'>
            <div className="profile-content">
                <div className="left-profile">
                    <ProfileBgSvg />
                </div>
                <div className="profile-pic">
                    <input type="file" ref={fileInputRef} className='input-profile-img' onChange={handleFileChange} accept="image/*" />
                    <div className='edit-profil-pic-icon' onClick={() => { fileInputRef.current.click() }}>
                        <EditIcon fontSize='small' />
                    </div>
                    {imageSrc ? <img className='user-profile-pic' src={imageSrc} alt='image' /> : <DefaultProfileSvg />}
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
                            <div className="relative-ps m-t-10">
                                {
                                    isUserNameEditable? (
                                        <>
                                            <input className='input-css w-100' type="text" value={updateUserData.username} name='username' onChange={(e) => { handleInputChange(e, 'username') }} />
                                            <div className='user-data-edit-icon' onClick={() => { 
                                                 setIsUserNameEditable(false)
                                                 setUpdateUserData((prevData) => (
                                                    {
                                                        ...prevData,
                                                        username: initialUserData.username
                                                    }
                                                ))
                                                 }}>
                                                X
                                            </div>
                                        </>
                                    ) :
                                        (
                                            <>
                                                <input className='input-css w-100' type="text" value={updateUserData.username} name='username' readOnly />
                                                <div className="user-data-edit-icon" onClick={() => { setIsUserNameEditable(true) }} >
                                                    <PencilSvg />
                                                </div>
                                            </>
                                        )

                                }

                            </div>
                        </div>
                        <div className="m-t-30 w-80">
                            <div className="email-text input-heading">
                                Email address
                            </div>
                            <div className="relative-ps  m-t-10">
                                <input className='input-css  w-100 email-inp' type="text" value={updateUserData.email} name='email' readOnly />
                            </div>
                        </div>
                        <div className=" m-t-30 w-80">
                            <div className="passwoed-text input-heading">
                                password
                            </div>
                            <div className="relative-ps m-t-10">
                                {
                                    isPasswordEditable ? (
                                        <>
                                            <input className='input-css  w-100' type="password" value={updateUserData.password} name='password' onChange={(e) => { handleInputChange(e, 'password') }} />
                                            <div className='user-data-edit-icon'
                                             onClick={() => { 
                                                setIsPasswordEditable(false)
                                                setUpdateUserData((prevData) => (
                                                    {
                                                        ...prevData,
                                                        password: initialUserData.password
                                                    }
                                                ))

                                             }}>
                                                X
                                            </div>
                                        </>
                                    ) :
                                        (
                                            <>
                                                <input className='input-css  w-100' type="password" value={updateUserData.password} name='password' onChange={(e) => { handleInputChange(e, 'password') }} readOnly />
                                                <div className="user-data-edit-icon"
                                                 onClick={() => {
                                                    setIsPasswordEditable(true) 
                                                    handleEditClick() }}>
                                                    <PencilSvg />
                                                </div>
                                            </>
                                        )

                                }
                            </div>
                        </div>
                        <div className='m-t-30 w-80 log-out-div'>
                            {
                                !shouldShowButton ? <Button className={'log-out'} text={'update'} onClick={() => updateUserDetails(setAlertVisible, setUserData, updateUserData, setLoading)} /> : <Button className={'log-out'} text={'log out'} onClick={logout} />
                            }
                        </div>
                    </div>
                </div>

            </div>
        </main>
    )
}

export default Profile