import React, { useEffect, useState, lazy, Suspense } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import LoadingScreen from './utils/loading/LoadingScreen';
import Navbar from './components/navbar/navbar';
import fetchUserProfileImage from './services/fetchProfileImage';
import './App.css';

const Home = lazy(() => import('./view/Home'));
const Stream = lazy(() => import('./view/Stream/Index'));
const UserB = lazy(() => import('./view/JoinRoom/index'));
const Login = lazy(() => import('./view/Login'));
const Signup = lazy(() => import('./view/Signup'));
const Tutorial = lazy(() => import('./view/Tutorial'));
const Profile = lazy(() => import('./view/Profile/Profile'));

function App() {
  const [imageSrc, setImageSrc] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      console.log('app useEffect');
      const fetchData = async () => {
        if (!imageSrc) {
          setLoading(true);
          try {
            await fetchUserProfileImage(setImageSrc, setLoading);
          } catch (error) {
            console.error('Error fetching user profile image', error);
          }
          setLoading(false);
        }
      };
      fetchData();
    }
  }, []);

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
                  <Route path="/login" element={<Login setLoading={setLoading} loading={loading} />} />
                  <Route path="/signup" element={<Signup setLoading={setLoading} loading={loading} />} />
                  <Route path="/profile" element={<Profile setImageSrc={setImageSrc} />} />
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
