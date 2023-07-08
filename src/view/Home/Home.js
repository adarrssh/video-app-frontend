import React from 'react'
import "./Home.css"
import Macbook from '../../img/Macbook1.png'
const Home = () => {
  return (
    <main className='home-main-comp'>
      <div className='home-left'>
        <div>
          <p className='heading'>Watch movies together <br /> with your loved ones</p>
        </div>
        <div>
          <p className='mid-para'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio, laudantium? Eligendi tempore ipsa quos nemo, architecto volu</p>
        </div>
        <div>
          <button className='host-btn'>Host a movie night</button>
        </div>
      </div>
      <div className='home-right'>
        <div className='home-right-img-div'>
          <img  src={Macbook} alt="" />
        </div>
      </div>
    </main>
  )
}

export default Home