import React from 'react'
import "./button.css"
const Button = ({text,className,onClick,svgIcon}) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <button className={`btn ${className}`} onClick={handleClick}>
        {
        svgIcon && <span className='svg-icon'>{svgIcon}</span>}
        {text}
    </button>
  )
}

export default Button