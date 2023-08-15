import React, { useState,useEffect } from 'react'
import './Profile.css'
import ProfileBgSvg from '../../utils/svg/ProfileBgSvg'
import DefaultProfileSvg from '../../utils/svg/DefaultProfileSvg'
import Button from '../../components/button/button'
import { useNavigate } from 'react-router-dom'
import updateUserDetails from '../../services/updateUserDetails'
import PencilSvg from '../../utils/svg/PencilSvg'
import axios from 'axios'
const Profile = ({setImageSrc,imageSrc,userData,setUserData,setLoading}) => {

    const fileInputRef = React.createRef();

    const navigate = useNavigate()

    const initialUserData = {
        username: userData.username,
        email: userData.email,
        password: userData.password
    }

    console.log(initialUserData);

    const [updateUserData, setUpdateUserData] = useState(initialUserData);
    const [editableField, setEditableField] = useState(null);
    const [updatedData, setUpdatedData] = useState(initialUserData);

    const logout = () =>{
        localStorage.clear('token')
        setImageSrc(null)
        navigate('/')
    }

    const handleInputChange = (event, fieldName) => {
        const {name,value} = event.target
        console.log(name,value);
        setUpdateUserData((prevData)=>(
            {
                ...prevData,
                [name]:value
            }
        ))
      };

    const resetUserData = (name)=>{
        console.log(userData);
        setEditableField(null)
        setUpdateUserData((prevData)=>(
            {
                ...prevData,
                [name]: userData[name]
            }
        ))
    }  

      const handleEditClick = (fieldName) => {
        console.log(fieldName);
        setEditableField(fieldName);
        if(fieldName === 'password'){
            setUpdateUserData((prevData)=>(
                {
                    ...prevData,
                    password: ''
                }
            ))
        }else{
            setUpdatedData(userData); // Reset updated data to current data
        }
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

        if(file){
            handleUpload(file)
        }

      };

  const shouldShowButton = areObjectsEqual(userData, updateUserData);

  const handleUpload = async (file) => {
    const formData = new FormData();
    formData.append('avatar', file);

    try {
      const response = await axios.post(`${process.env.REACT_APP_SOCKET}/user/upload/image`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization':  localStorage.getItem('token')
        },
      });
      console.log(response);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };


    return (
        <main className='profile-main'>
            <div className="profile-content">
                <div className="left-profile">
                    <ProfileBgSvg/>
                </div>
                <div className="profile-pic">
                    <input type="file" ref={fileInputRef} className='input-profile-img' onChange={handleFileChange} accept="image/*" />
                    <div className='edit-profil-pic-icon' onClick={()=>{fileInputRef.current.click()}}>
                        <PencilSvg/>
                    </div>
                    {imageSrc?<img className='user-profile-pic' src={imageSrc}/>:   <DefaultProfileSvg/>}   
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
                                    editableField === 'username'?  (
                                        <>
                                        <input className='input-css w-100' type="text" value={updateUserData.username} name='username' onChange={(e)=>{handleInputChange(e,'username')}}  />
                                        <div className='user-data-edit-icon' onClick={()=>{resetUserData('username')}}>
                                            X
                                        </div>
                                        </>
                                    ):
                                    ( 
                                        <>
                                        <input className='input-css w-100' type="text" value={updateUserData.username} name='username' readOnly/>
                                        <div className="user-data-edit-icon"  onClick={()=>{handleEditClick('username')}} >
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
                                {
                                    editableField === 'email' ?  (
                                        <>
                                        <input className='input-css  w-100' type="text"  value={updateUserData.email} name='email'  onChange={(e)=>{handleInputChange(e,'username')}} />
                                        <div className='user-data-edit-icon'  onClick={()=>{resetUserData('email')}}>
                                            X
                                        </div>
                                        </>
                                    ):
                                    ( 
                                        <>
                                        <input className='input-css  w-100' type="text"  value={updateUserData.email} name='email' readOnly />
                                        <div className="user-data-edit-icon" onClick={()=>{handleEditClick('email')}}>
                                        <PencilSvg />
                                        </div>
                                        </>
                                    )

                                }
                            </div>
                        </div>
                        <div className=" m-t-30 w-80">
                            <div className="passwoed-text input-heading">
                                password
                            </div>
                            <div className="relative-ps m-t-10">
                                {
                                    editableField === 'password'?  (
                                        <>
                                        <input className='input-css  w-100' type="password"   value={updateUserData.password} name='password'   onChange={(e)=>{handleInputChange(e,'password')}} />
                                        <div className='user-data-edit-icon'  onClick={()=>{resetUserData('password')}}>
                                            X
                                        </div>
                                        </>
                                    ):
                                    ( 
                                        <>
                                        <input className='input-css  w-100' type="password"   value={updateUserData.password} name='password'   onChange={(e)=>{handleInputChange(e,'password')}} readOnly />
                                        <div className="user-data-edit-icon" onClick={()=>{handleEditClick('password')}}>
                                        <PencilSvg />
                                        </div>
                                        </>
                                    )

                                }
                            </div>
                        </div>
                        <div className='m-t-30 w-80 log-out-div'>
                            {
                                !shouldShowButton ?    <Button className={'log-out'} text={'update'} onClick={()=>updateUserDetails(setUserData,updateUserData,setLoading)}/> :                             <Button className={'log-out'} text={'log out'} onClick={logout}/>
                            }
                        </div>
                    </div>
                </div>

            </div>
        </main>
    )
}

export default Profile