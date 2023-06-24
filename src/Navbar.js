import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
         <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/upload">About</Link>
        </li>
        <li>
          <Link to={'/player/648e83e55775a6195b3402c1'}>video1</Link>
        </li>
        <li>
          <Link to={'/player/648e9404937b98892d8fd0b4'}>video2</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar