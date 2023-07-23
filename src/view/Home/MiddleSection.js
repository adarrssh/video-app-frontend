import React,{useEffect,useState} from 'react'
import './MiddleSection.css'
import MacBookSvg from '../../svg/MacBookSvg'
const MiddleSection = () => {
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  return (
    <div className='middle-main-section'>
      <MacBookSvg width={viewportWidth}/>
    </div>
  )
}

export default MiddleSection