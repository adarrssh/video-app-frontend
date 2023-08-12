import React, { useEffect, useState } from 'react';
import {
  Route,
  BrowserRouter as Router,
  Routes
} from "react-router-dom";
import Home from './view/Home'
// import Stream from './view/Stream/Stream';
import Stream from './view/Stream/Index';
import UserB from './view/JoinRoom/index';
import Navbar from './components/navbar/navbar';
import Login from './view/Login';
import Signup from './view/Signup';
import Tutorial from './view/Tutorial'
import "./App.css"
import Profile from './view/Profile/Profile';
import fetchUserProfileImage from './services/fetchProfileImage';
import LoadingScreen from './utils/loading/LoadingScreen';
function App() {
  const [imageSrc, setImageSrc] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(()=>{
    if(localStorage.getItem('token')){
      console.log('in app');
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
    }
  },[])
  return (
    <Router>

          {
            loading? (<LoadingScreen/>):( 
              <>
              <div className="nav-div">
              <Navbar imageSrc={imageSrc} setImageSrc={setImageSrc} />
            </div>
              <div className="body-div">
            <Routes>
              <Route path="/" element={<Home imageSrc={imageSrc} setImageSrc={setImageSrc} setLoading={setLoading} loading={loading} />} />
              <Route exact path="/stream" element={<Stream />} />
              <Route exact path="/room" element={<UserB />} />
              <Route exact path="/tutorial" element={< Tutorial />} />
              <Route exact path="/login" element={<Login setLoading={setLoading}  loading={loading}  />} />
              <Route exact path="/signup" element={< Signup setLoading={setLoading} loading={loading} />} />
              <Route exact path="/profile" element={< Profile setImageSrc={setImageSrc} />} />
            </Routes>
          </div>
              </>
          )
          }
        
    </Router>
  );
}



export default App;
