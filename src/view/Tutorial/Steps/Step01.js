import React from 'react'
import './Step.css'
import Step01svg from '../../../utils/svg/Tutorial/Step01svg'
import Arrow from '../../../utils/svg/Tutorial/Arrowsvg'
const Step01 = () => {
    return (
        <main className='step-01'>
            <div className="left-01">
                <div className='left-01-text'>
                    <h4>01</h4>
                    <p>Click on the Host a movie night button, <br />
                        you can either create a room or join an existing room.</p>
                </div>
            </div>
            <div className="right-01">
                <div className="w-80">
                    <Step01svg />
                </div>
            </div>
            <div className="arrow">
                <Arrow/>
            </div>
        </main>
    )
}

export default Step01