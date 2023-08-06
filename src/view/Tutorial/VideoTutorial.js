import React from 'react'
import './VideoTutorial.css'
import Button from '../../components/button/button'
import HostBtnSvg from '../../utils/svg/HostBtnSvg'
import { Link } from 'react-router-dom'

const VideoTutorial = () => {
  return (
    <main className='video-tut-comp'>
        <div className='video-tut-heading'>
            <h3>Here’s a video tutorial</h3>
        </div>
        <div className='video-div'>
            <video src=""></video>
        </div>

        <div className='streaming-btn-div'>
          <Link to={'/stream'}>
            <Button svgIcon={<HostBtnSvg/>} text={'Start Streaming'} className={'start-streaming'}/>
          </Link>
        </div>
    </main>
  )
}

export default VideoTutorial