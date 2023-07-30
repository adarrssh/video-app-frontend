import React, { useState } from 'react'
import './Login.css'
import Button from '../../components/button/button'
import HostBtnSvg from '../../utils/svg/HostBtnSvg'
import KeyboadSvg from '../../utils/svg/KeyboadSvg'
import GoogleIconSvg from '../../utils/svg/GoogleIconSvg'

const HorizontalDivider = () => {
  return (
      <svg width="125" height="2" viewBox="0 0 271 2" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 1H270" stroke="white" strokeOpacity="0.2" strokeLinecap="round" />
      </svg>
  );
};


const Modal = ({ handleCreateRoom }) => {


  return (
    <div className='login-modal-parent'>
      <div className="login-modal-content">
        <div className="login-modal-heading">
          <h3>Log In</h3>
        </div>
        <div className='input-email-div'>
          <input type="text" className='input-el' />
          <div className='inp-email-placeholder'>Email address</div>
        </div>
        <div className='input-pwd-div'>
          <input type="text" className='input-el pwd-inp-margin' />
          <div className='inp-pwd-placeholder'>Password</div>
        </div>
        <div className='fg-pwd'>
          <p>Forgot password?</p>
        </div>
        <div>
          <Button text={"Log In"} className={'login-div-btn'} />
        </div>
        <div className="btn-partition">
          <HorizontalDivider />
          <div className='or-text'>OR</div>
          <HorizontalDivider />
        </div>
        <div>
          <Button className={'google-btn'} text={'Continue with google'} svgIcon={<GoogleIconSvg/>}/>
        </div>
        <div className='sign-up-text'>
          <h3>Don’t have an account? Sign up!</h3>
        </div>
      </div>
    </div>
  )
}

export default Modal