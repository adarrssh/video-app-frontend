import React from 'react'
import "./button.css"
const Button = ({text,className,onClick}) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <button className={`btn ${className}`} onClick={handleClick}>
        {text}
    </button>
  )
}

export default Button