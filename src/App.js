import React from 'react';
import {
    Route,
    BrowserRouter as Router,
    Routes
} from "react-router-dom";
// import Home from './Home';
import Player from './Player';
import './App.css';
import UploadVideo from './Upload';
// import VideoPlayer from './Player1';

function App() {
    return (
        <Router>
            <Routes>
            {/* <Route exact path="/" element={<Home/>}></Route> */}
            <Route exact path="/upload" element={<UploadVideo/>}></Route>
            <Route  path="/player/:id" element={<Player/>}></Route>
            {/* <Route  path="/player1/:id" element={<VideoPlayer/>}></Route> */}
            </Routes>
        </Router>
    );
}
export default App;