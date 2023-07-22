import React from 'react'
import './TopSection.css'
import Button from '../../components/button/button'
import HostBtnSvg from '../../svg/HostBtnSvg'
import KeyboadSvg from '../../svg/KeyboadSvg'

const TopSection = () => {
  return (
    <main className='top-main-comp'>
        <div className="heading-text">
            <p>Watch movies together</p>
            <p className='descp'>Binge Club is a free service which enables you to upload any video of <br/> your choice from your computer and watch socially in perfect sync.</p>
        </div>
        <div className='host-invite-btn-comp'>
            <Button svgIcon={<HostBtnSvg/>} className='host-btn' text={'Host a movie night'}/>
            <Button svgIcon={<KeyboadSvg/>} className='invite-link-btn' text={'Enter invite link or code'}/>
        </div>
    </main>
  )
}

export default TopSection