import React from 'react'
import './Step03.css'
import Step03svg from '../../../utils/svg/Tutorial/Step03svg'
const Step03 = () => {
    return (
        <main className='step-03'>
            <div className="left-03">
                <div className='left-03-text'>
                    <h4>03</h4>
                    <p>Invite your friends to your room through <br />
                     the link provided in the chat box.
                    </p>
                </div>
            </div>
            <div className="right-03">
                <div className="w-80">
                    <Step03svg />
                </div>
            </div>
        </main>
    )
}

export default Step03