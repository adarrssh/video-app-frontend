import React from 'react'
import './TopSection.css'
import Button from '../../components/button/button'
import HostBtnSvg from '../../utils/svg/HostBtnSvg'
import KeyboadSvg from '../../utils/svg/KeyboadSvg'
import { Link } from 'react-router-dom'
const TopSection = () => {
  return (
    <main className='top-main-comp'>
        <div className="heading-text">
            <p>Watch movies together</p>
            <p className='descp'>Binge Club is a free service which enables you to upload any video of <br/> your choice from your computer and watch socially in perfect sync.</p>
        </div>
        <div className='host-invite-btn-comp'>
          <Link to={'/stream'} className='remove-outline'>
            <Button svgIcon={<HostBtnSvg/>} className='host-btn' text={'Host a movie night'}/>
          </Link>
          <Link to={'/stream'} className='remove-outline'>
            <Button svgIcon={<KeyboadSvg/>} className='invite-link-btn' text={'Enter invite link or code'}/>
          </Link>
        </div>
    </main>
  )
}

export default TopSection