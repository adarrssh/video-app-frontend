import React from 'react';
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
function App() {
    return (
      <Router>
            <div className="nav-div">
              <Navbar />
            </div>
            <div className="body-div">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route exact path="/stream" element={<Stream />} />
                <Route exact path="/room" element={<UserB />} />
                <Route exact path="/tutorial" element={< Tutorial/>} />
                <Route exact path="/login" element={<Login/>} />
                <Route exact path="/signup" element={< Signup/>} />
              </Routes>
            </div>
      </Router>
    );
  }
  
  

export default App;
