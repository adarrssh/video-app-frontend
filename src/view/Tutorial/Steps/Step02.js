import React from 'react'
import './Step02.css'
import Step02svg1 from '../../../utils/svg/Tutorial/Step02svg1'
import Step02svg2 from '../../../utils/svg/Tutorial/Step02svg2'

const Step02 = () => {
    return (
        <main className='step-02'>
            <div className="left-02">
                <div className="step-02-svg-div">
                    <div>
                        <Step02svg1 />
                    </div>
                    <div className='step-02-svg'>
                        <Step02svg2 />
                    </div>
                </div>
            </div>
            <div className="right-02">
                <div className='right-02-text'>
                    <h4>02</h4>
                    <p>Upload any video of your choice from your <br /> computer. </p>
                </div>
            </div>
        </main>
    )
}

export default Step02