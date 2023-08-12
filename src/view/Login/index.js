import React, { useState } from 'react'
import './index.css'
import Button from '../../components/button/button'
import HostBtnSvg from '../../utils/svg/HostBtnSvg'
import KeyboadSvg from '../../utils/svg/KeyboadSvg'
import GoogleIconSvg from '../../utils/svg/GoogleIconSvg'
import { useNavigate } from 'react-router-dom'

const HorizontalDivider = () => {
  return (
    <svg width="125" height="2" viewBox="0 0 271 2" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 1H270" stroke="white" strokeOpacity="0.2" strokeLinecap="round" />
    </svg>
  );
};


const Login = () => {

  const navigate = useNavigate()

   const [formData, setFormData] = useState({
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
      const response = await fetch(`${process.env.REACT_APP_SOCKET}/auth/login`, {
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
        localStorage.setItem('token',body.token)
        alert(body.message);
        navigate('/')
      } else {
        // Handle error, e.g., show an error message
        alert(body.error);
      }
    } catch (error) {
      alert('error')
      console.error('An error occurred', error);
    }
  };


  return (
    <div className='login-modal-parent'>
      <div className="login-modal-content">
        <div className="login-modal-heading">
          <h3>Log In</h3>
        </div>
        <div className='input-email-div'>
          <input type="text" className='input-el' name="email" value={formData.email} onChange={handleChange} />
          <div className='inp-email-placeholder'>Email address</div>
        </div>
        <div className='input-pwd-div'>
          <input type="text" className='input-el pwd-inp-margin'  name="password" value={formData.password} onChange={handleChange}
           />
          <div className='inp-pwd-placeholder'>Password</div>
        </div>
        <div className='fg-pwd-div'>
          <p>
           Forgot password?
          </p>
        </div>
        <div className='login-div'>
          <Button text={"Log In"} className='login-div-btn' onClick={handleSubmit} />
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
          <h3>Don’t have an account?<span className='signup-span-el'> Sign up!</span></h3>
        </div>
      </div>
    </div>
  )
}

export default Login