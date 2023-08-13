import React, { useEffect, useState, lazy, Suspense } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import LoadingScreen from './utils/loading/LoadingScreen';
import Navbar from './components/navbar/navbar';
import fetchUserProfileImage from './services/fetchProfileImage';
import './App.css';
import fetchUserDetails from './services/fetchUserDetails';

const Home = lazy(() => import('./view/Home'));
const Stream = lazy(() => import('./view/Stream/Index'));
const UserB = lazy(() => import('./view/JoinRoom/index'));
const Login = lazy(() => import('./view/Login'));
const Signup = lazy(() => import('./view/Signup'));
const Tutorial = lazy(() => import('./view/Tutorial'));
const Profile = lazy(() => import('./view/Profile/Profile'));

function App() {
  const [accessToken, setAccessToken] = useState(null)
  const [imageSrc, setImageSrc] = useState(null);
  const [loading, setLoading] = useState(false);

  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: ''
  });


  useEffect(() => {
    console.log('App useEffect');
    if (localStorage.getItem('token')) {
      const fetchData = async () => {
        if (!imageSrc) {
          setLoading(true)
          try {
            await fetchUserProfileImage(setImageSrc, setLoading);
            await fetchUserDetails(setUserData,setLoading)
            setLoading(false)
          } catch (error) {
            console.error('Error fetching user profile image', error);
            setLoading(false)
          }
        }
      };
      fetchData();
    }
  }, [accessToken]);

  return (
    <Router>
      {
        loading ? (<LoadingScreen />) : (
          <>
            <div className="nav-div">
              <Navbar imageSrc={imageSrc} setImageSrc={setImageSrc} />
            </div>
            <div className="body-div">
              <Suspense fallback={<LoadingScreen />}>
                <Routes>
                  <Route path="/" element={<Home imageSrc={imageSrc} setImageSrc={setImageSrc} setLoading={setLoading} loading={loading} />} />
                  <Route path="/stream" element={<Stream />} />
                  <Route path="/room" element={<UserB />} />
                  <Route path="/tutorial" element={<Tutorial />} />
                  <Route path="/login" element={<Login setLoading={setLoading} loading={loading} setAccessToken={setAccessToken} />} />
                  <Route path="/signup" element={<Signup setLoading={setLoading} loading={loading} />} />
                  <Route path="/profile" element={<Profile setImageSrc={setImageSrc} userData={userData} setUserData={userData} />} />
                </Routes>
              </Suspense>
            </div>
          </>
        )
      }
    </Router>
  );
}

export default App;
