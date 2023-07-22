import React from 'react'
import "./index.css"
import TopSection from './TopSection'
import MiddleSection from './MiddleSection'
import BottomSection from './BottomSection'

const index = () => {
  return (
    <main className='home-main-comp'>
        <TopSection/>
        <MiddleSection/>
        <BottomSection/>
    </main>
  )
}

export default index