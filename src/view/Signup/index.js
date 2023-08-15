import React, { useState } from 'react'
import './index.css'
import Button from '../../components/button/button'
import HostBtnSvg from '../../utils/svg/HostBtnSvg'
import KeyboadSvg from '../../utils/svg/KeyboadSvg'
import GoogleIconSvg from '../../utils/svg/GoogleIconSvg'
import { useNavigate } from 'react-router-dom'
import LoadingScreen from '../../utils/loading/LoadingScreen'

const HorizontalDivider = () => {
  return (
    <svg width="125" height="2" viewBox="0 0 271 2" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 1H270" stroke="white" strokeOpacity="0.2" strokeLinecap="round" />
    </svg>
  );
};


const Signup = ({setLoading,loading}) => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    // e.preventDefault();

    try {
      setLoading(true)
      const response = await fetch(`${process.env.REACT_APP_SOCKET}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      let body = await response.json()
      console.log(response);
      console.log(body);
      if (response.ok) {
        // Handle success, e.g., show a success message
        alert(body.message);
        navigate('/login')
      } else {
        // Handle error, e.g., show an error message
        alert(body.error);
      }
      setLoading(false)
    } catch (error) {
      alert('error')
      console.error('An error occurred', error);
      setLoading(false)
    }
  };


  return (
    <>
    {loading? (
      <LoadingScreen/>
    ):
    (
    <div className='signup-modal-parent'>
      <div className="signup-modal-content">
        <div className="signup-modal-heading">
          <h3>Sign Up</h3>
        </div>
        <div className='input-name-div'>
          <input type="text" className='input-el' name="username" value={formData.username} onChange={handleChange} autoComplete='off' />
          <div className='inp-name-placeholder'>Full Name</div>
        </div>
        <div className='input-email-div'>
          <input type="text" className='input-el' name="email" value={formData.email} onChange={handleChange} autoComplete='off'/>
          <div className='inp-email-placeholder'>Email address</div>
        </div>
        <div className='input-pwd-div'>
          <input type="text" className='input-el pwd-inp-margin' name="password" value={formData.password} onChange={handleChange} autoComplete='off'/>
          <div className='inp-pwd-placeholder'>Password</div>
        </div>
        <div>
          <Button text={"Create an account"} className={'signup-div-btn'} onClick={handleSubmit}/>
        </div>
        <div className="btn-partition">
          <HorizontalDivider />
          <div className='or-text'>OR</div>
          <HorizontalDivider />
        </div>
        <div>
          <Button className={'google-btn'} text={'Continue with google'} svgIcon={<GoogleIconSvg />} />
        </div>
        <div className='sign-up-text'>
          <h3>Already have an account? <span className='login-span-el'>Log In!</span></h3>
        </div>
      </div>
    </div>
    )
    }
    </>

  )
}

export default Signup