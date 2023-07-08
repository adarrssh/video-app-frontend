import React from 'react'
import "./index.css"
const Button = ({text,className}) => {
  console.log(className);
  return (
    <button className={`btn ${className}`}>
        {text}
    </button>
  )
}

export default Button