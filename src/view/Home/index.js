import React,{useEffect} from 'react'
import "./index.css"
import TopSection from './TopSection'
import MiddleSection from './MiddleSection'
import BottomSection from './BottomSection'
import VideoTutorial from '../Tutorial/index'
import fetchUserProfileImage from '../../services/fetchProfileImage'
import Loading from '../../components/Loading/Loading'

const Index = ({imageSrc,setImageSrc,setLoading,loading}) => {
  
  return (
    <main className='home-main-comp'>
    {loading ? (
      <Loading />
    ) : (
      <>
        <TopSection />
        <MiddleSection />
        <BottomSection />
        <VideoTutorial />
      </>
    )}
  </main>
    
  )
}

export default Index