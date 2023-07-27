import React from 'react'
import './BottomSection.css'
import Box from '../../components/Box/Box'
import { boxData } from '../../utils/data/box'
const BottomSection = () => {
  return (
    <main className='bottom-main-section'>
      <div className='bottom-heading'>
        <h4>What we got here</h4>
      </div>
      <div className='features'>
        {
          boxData.map((data)=> <Box data={data}/>)
        }
      </div>
    </main>
  )
}

export default BottomSection