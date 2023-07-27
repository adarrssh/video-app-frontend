import React from 'react'
import './index.css'
import Step01 from './Steps/Step01'
const index = () => {
  return (
    <div className='tutorial-main-comp'>
      <div>
        <h3>How to use?</h3>
      </div>
      <Step01 />
    </div>
  )
}

export default index