import React from 'react'
import Button from '../button/index'
import { navbarData } from '../../data/navbar'
import './index.css'
import { ReactComponent as MySVG } from '../../img/logo.svg';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className='nav'>
      <div className="left-nav">
        {/* <img src={logo} alt="logo" className='logo'/> */}
        <MySVG className='logo' />
        <div className='logo-text'>BINGE CLUB</div>
      </div>
      <div className="right-nav">
        {navbarData.map((el, key) => 
        <Link to={el.to}>
        <div className='right-nav-el' key={key}>{el.title}</div>
        </Link>
        )}
        <Link to={"/login"}>
          <Button text="Login" className='login-btn' to="/login" />
        </Link>
        <Button text="Sign-up" className="signup-btn" />
      </div>
    </nav>
  )
}

export default Navbar