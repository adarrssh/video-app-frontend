import React from 'react'
import "./index.css"
import TopSection from './TopSection'
import MiddleSection from './MiddleSection'
import BottomSection from './BottomSection'
import VideoTutorial from '../Tutorial/index'

const index = () => {
  return (
    <main className='home-main-comp'>
        <TopSection/>
        <MiddleSection/>
        <BottomSection/>
        <VideoTutorial/>
    </main>
  )
}

export default index