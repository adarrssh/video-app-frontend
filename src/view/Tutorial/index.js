import React from 'react'
import './index.css'
import Step01 from './Steps/Step01'
import Step02 from './Steps/Step02'
import Step03 from './Steps/Step03'
import Step04 from './Steps/Step04'
import VideoTutorial from './VideoTutorial'
const index = () => {
  return (
    <main className='tutoiral-body'>
      <div className='tutorial-main-comp'>
        <div>
          <h3>How to use?</h3>
        </div>
        <Step01 />
        <Step02 />
        <Step03 />
        <Step04 />
      </div>
      <VideoTutorial/>
    </main>
  )
}

export default index