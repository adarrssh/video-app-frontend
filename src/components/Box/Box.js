import React from 'react'
import './Box.css'
const Box = (prop) => {
    const {heading, svg:svgComponent,description_line1,description_line2} = prop.data
    return (
        <div className='box'>
            <div>
                {svgComponent}
            </div>
            <div className='box-text'>
                <p className='box-text-heading'>{heading}</p>
                <p className='box-text-descp'>{description_line1} <br />{description_line2}</p>
            </div>
        </div>
    )
}

export default Box