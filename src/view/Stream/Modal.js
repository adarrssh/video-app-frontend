import React, { useState } from 'react'
import './Modal.css'
import Button from '../../components/button/button'
import HostBtnSvg from '../../utils/svg/HostBtnSvg'
import KeyboadSvg from '../../utils/svg/KeyboadSvg'

const HorizontalDivider = () => {
    return (
        <svg width="125" height="2" viewBox="0 0 271 2" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1H270" stroke="white" strokeOpacity="0.2" strokeLinecap="round" />
        </svg>
    );
};

const Modal = ({ handleCreateRoom }) => {

    const [inputValue, setInputValue] = useState('');
    const [showButton, setShowButton] = useState(false);

    const handleInputChange = (event) => {
        const value = event.target.value;
        setInputValue(value);

        // Show the button if the input has some value
        setShowButton(value.trim() !== '');
    };

    const handleInputFocus = () => {
        // Show the button when the input receives focus
        setShowButton(true);
    };

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
                    <HorizontalDivider />
                    <div className='or-text'>or</div>
                    <HorizontalDivider />
                </div>
                <div className='stream-invite-link'>
                    <div className={showButton?'stream-input-content w-60':'stream-input-content'}>
                        <div className='w-20 center-element'>
                            <KeyboadSvg />
                        </div>
                        <div className='w-80'>
                            <input className='stream-input' placeholder='Enter invite link or code' onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <div className={showButton ? 'w-40 center-element' : 'hide-btn'}>
                        {showButton && <Button className={'join-room-btn'} text={'Join'}/>}
                    </div>
                </div>
                <div className='descp2'>
                    <p>
                    Enter the invite link to your friend’s room.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Modal