import React,{useEffect} from 'react'
import "./index.css"
import TopSection from './TopSection'
import MiddleSection from './MiddleSection'
import BottomSection from './BottomSection'
import VideoTutorial from '../Tutorial/index'
import fetchUserProfileImage from '../../services/fetchProfileImage'
import LoadingScreen from '../../utils/loading/LoadingScreen'

const Index = ({imageSrc,setImageSrc,setLoading,loading}) => {
  
  useEffect(()=>{
    console.log('useEffect');
  
  const fetchData = async () => {
    if(!imageSrc){

      setLoading(true)
      try {
        await fetchUserProfileImage(setImageSrc, setLoading);
      } catch (error) {
        console.error('Error fetching user profile image', error);
      }
      setLoading(false)
    }
  };
  
  fetchData();
  },[])


  return (
    <main className='home-main-comp'>
    {loading ? (
      <LoadingScreen />
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