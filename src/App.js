import React, { useEffect, useState, lazy, Suspense } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Navbar from "./components/navbar/navbar";
import fetchUserProfileImage from "./services/fetchProfileImage";
import "./App.css";
import fetchUserDetails from "./services/fetchUserDetails";
import Loading from "./components/Loading/Loading";
import ShowAlert from "./components/Alert/Alert";

const Home = lazy(() => import("./view/Home"));
const Stream = lazy(() => import("./view/Stream/Index"));
const Login = lazy(() => import("./view/Login"));
const Signup = lazy(() => import("./view/Signup"));
const Tutorial = lazy(() => import("./view/Tutorial"));
const Profile = lazy(() => import("./view/Profile/Profile"));

function App() {
  const [accessToken, setAccessToken] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [loading, setLoading] = useState(false);
  const [alertVisible, setAlertVisible] = useState({
    show: false,
    message: '',
    severity: ''
  });

  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (localStorage.getItem("token")) {
      const fetchData = async () => {
        if (!imageSrc) {
          setLoading(true);
          try {
            await fetchUserProfileImage(setAlertVisible, setImageSrc);
            await fetchUserDetails(alertVisible, setAlertVisible, setUserData, setLoading);
            setLoading(false);
          } catch (error) {
            console.error("Error fetching user profile image", error);
            setLoading(false);
          }
        }
      };
      fetchData();
    }
  }, [accessToken]);

  return (
    <Router>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="nav-div">
            {alertVisible.show ? (
              <ShowAlert
                alertVisible={alertVisible}
                setAlertVisible={setAlertVisible}
              />
            ) : (
              ""
            )}
            <Navbar imageSrc={imageSrc} setImageSrc={setImageSrc} />
          </div>
          <div className="body-div">
            <Suspense fallback={<Loading />}>
              <Routes>
                <Route
                  path="/"
                  element={
                    <Home
                      imageSrc={imageSrc}
                      setImageSrc={setImageSrc}
                      setLoading={setLoading}
                      loading={loading}
                    />
                  }
                />
                <Route
                  path="/stream"
                  element={
                    <Stream
                      imageSrc={imageSrc}
                      userData={userData}
                      setAlertVisible={setAlertVisible}
                    />
                  }
                />
                {/* <Route path="/room" element={<User/>} /> */}
                <Route path="/tutorial" element={<Tutorial />} />
                <Route
                  path="/login"
                  element={
                    <Login
                      alertVisible={alertVisible}
                      setAlertVisible={setAlertVisible}
                      setLoading={setLoading}
                      loading={loading}
                      setAccessToken={setAccessToken}
                    />
                  }
                />
                <Route
                  path="/signup"
                  element={
                    <Signup
                      alertVisible={alertVisible}
                      setAlertVisible={setAlertVisible}
                      setLoading={setLoading}
                      loading={loading} />}
                />
                <Route
                  path="/profile"
                  element={
                    <Profile
                      alertVisible={alertVisible}
                      setAlertVisible={setAlertVisible}
                      setImageSrc={setImageSrc}
                      imageSrc={imageSrc}
                      userData={userData}
                      setUserData={setUserData}
                      setLoading={setLoading}
                    />
                  }
                />
              </Routes>
            </Suspense>
          </div>
        </>
      )}
    </Router>
  );
}

export default App;
