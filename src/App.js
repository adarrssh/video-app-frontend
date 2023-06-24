import React from 'react';
import {
    Route,
    BrowserRouter as Router,
    Routes
} from "react-router-dom";
import Home from './Home';
import Player from './Player';
import UploadVideo from './Upload';
import Navbar from './Navbar';

function App() {
    return (
        <>
        <Router>
        <Navbar/>
            <Routes>
            <Route  path="/" element={<Home/>}></Route>
            <Route exact path="/upload" element={<UploadVideo/>}></Route>
            <Route  path="/player/:id" element={<Player/>}></Route>
            </Routes>
        </Router>
        </>
    );
}
export default App;