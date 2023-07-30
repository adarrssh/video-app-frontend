import React from 'react'
import Button from '../button/button'
import { navbarData } from '../../utils/data/navbar'
import './navbar.css'
import { ReactComponent as MySVG } from '../../utils/img/logo.svg';
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
          <Link to={el.to} key={key}>
            <div className='right-nav-el'>{el.title}</div>
          </Link>
        )}
        <Link to={"/login"}>
          <Button text="Login" className='login-btn' to="/login" />
        </Link>
        <Link to="/signup">
          <Button text="Sign-up" className="signup-btn" />
        </Link>
      </div>
    </nav>
  )
}

export default Navbar