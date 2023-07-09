import React from 'react'
import "./button.css"
const Button = ({text,className}) => {
  console.log(className);
  return (
    <button className={`btn ${className}`}>
        {text}
    </button>
  )
}

export default Button