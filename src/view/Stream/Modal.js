import React from 'react'
import './Modal.css'
import Button from '../../components/button/button'
import HostBtnSvg from '../../svg/HostBtnSvg'
import KeyboadSvg from '../../svg/KeyboadSvg'

const HorizontalDivider = () => {
    return (
      <svg width="125" height="2" viewBox="0 0 271 2" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 1H270" stroke="white" strokeOpacity="0.2" strokeLinecap="round" />
      </svg>
    );
  };

const Modal = ({handleCreateRoom}) => {
    return (
        <div className='stram-modal-parent'>
            <div className="stream-modal-content">
                <div className="stream-modal-heading">
                    <h3>Start Streaming</h3>
                </div>
                <div>
                    <Button onClick={handleCreateRoom} svgIcon={<HostBtnSvg />} className='stream-host-btn' text={'Host a movie night'} />
                </div>
                <div className='descp1'>
                    <p>Create a new room and invite your friends</p>
                </div>
                <div className="partition">
                    <HorizontalDivider/>
                    <div className='or-text'>or</div>
                    <HorizontalDivider/>
                </div>
                <div>
                    <Button svgIcon={<KeyboadSvg />} className='stream-invite-link-btn' text={'Enter invite link or code'} />
                </div>
                <div className='descp2'>
                    Enter the invite link to your friend’s room.
                </div>
            </div>
        </div>
    )
}

export default Modal