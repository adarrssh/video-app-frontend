import React, { useEffect, useState } from 'react'
import Button from '../button/button'
import { navbarData } from '../../utils/data/navbar'
import './navbar.css'
import { ReactComponent as MySVG } from '../../utils/img/logo.svg';
import { Link, useNavigate } from 'react-router-dom';
import NavLogoSvg from '../../utils/svg/NavLogoSvg';
import axios from 'axios';

const Navbar = () => {
  const navigate = useNavigate()
  const [imageSrc, setImageSrc] = useState(null)
  const fetchUserDetails = async () => {
    if (localStorage.token) {
      try {
        const response = await fetch(`${process.env.REACT_APP_SOCKET}/user/`, {
          method: 'GET',
          headers: {
            'Authorization': localStorage.getItem('token'),
            'Content-Type': 'application/json'
          }
        });
        let body = await response.json()
        console.log(response);
        console.log(body);
        // if (response.ok) {
        //   // Handle success, e.g., show a success message
        //   alert(body.message);
        // } else {
        //   // Handle error, e.g., show an error message
        //   alert(body.error);
        // }
      } catch (error) {
        alert('error')
        console.error('An error occurred', error);
      }
    }
  }

  const fetchUserProfileImage = async () => {
    if (localStorage.token) {
      try {
        const response = await axios.get(`${process.env.REACT_APP_SOCKET}/user/download/image`, {
          headers: {
            'Authorization': localStorage.getItem('token')
          },
          responseType: 'arraybuffer'
        });
        const imageBlob = new Blob([response.data], { type: 'image/jpeg' }); // Change the type if needed
        const imageUrl = URL.createObjectURL(imageBlob);
        setImageSrc(imageUrl);
        // if (response.ok) {
        //   // Handle success, e.g., show a success message
        //   alert(body.message);
        // } else {
        //   // Handle error, e.g., show an error message
        //   alert(body.error);
        // }
      } catch (error) {
        alert('error')
        console.error('An error occurred', error);
      }
    }

    console.log(imageSrc);
  }

  useEffect(() => {
    fetchUserDetails()
    fetchUserProfileImage()
  }, [])
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