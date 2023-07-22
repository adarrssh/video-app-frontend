import React from 'react'
import MacBookLargeSvg from '../../svg/MacBook/MacBookLargeSvg'
import './MiddleSection.css'
import MacBookMediumSvg from '../../svg/MacBook/MacBookMediumSvg'
import MacBookSmallSvg from '../../svg/MacBook/MacBookSmallSvg'
const MiddleSection = () => {
  return (
    <div className='middle-main-section'>
      <MacBookLargeSvg/>
      <MacBookMediumSvg/>
      <MacBookSmallSvg/>
    </div>
  )
}

export default MiddleSection