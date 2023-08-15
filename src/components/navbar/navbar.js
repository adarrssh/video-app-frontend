import React, { useEffect, useState } from 'react'
import Button from '../button/button'
import { navbarData } from '../../utils/data/navbar'
import './navbar.css'
import { Link, useNavigate } from 'react-router-dom';
import NavLogoSvg from '../../utils/svg/NavLogoSvg';

const Navbar = ({imageSrc}) => {
  const navigate = useNavigate()
  

  return (
    <nav className='nav'>
      .      <Link to={"/"} className='remove-hover-text-underline'>
        <div className="left-nav">
          <NavLogoSvg className='logo' />
          <div className='logo-text'>Binge Club</div>
        </div>
      </Link>
      <div className="right-nav">
        {navbarData.map((el, key) =>
          <Link to={el.to} key={key} className='remove-hover-text-underline'>
            <div className='right-nav-el'>{el.title}</div>
          </Link>
        )}

        {imageSrc ? (
          <div className='profile-info' onClick={()=>{navigate('/profile')}}>
             <img className='nav-profile-img' src={imageSrc} alt="Profile" />
          </div>
        ) : (
          <>
            <Link to={"/login"} className='remove-hover-text-underline'>
              <Button text={"Login"} className={'login-btn'} />
            </Link>
            <Link to="/signup" className='remove-hover-text-underline'>
              <Button text={"Sign-up"} className={"signup-btn"} />
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar