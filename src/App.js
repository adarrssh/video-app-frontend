import React from 'react';
import {
    Route,
    BrowserRouter as Router,
    Routes
} from "react-router-dom";
import Home from './Home';
import Player from './Player';
import UploadVideo from './Upload';

function App() {
    return (
        <Router>
            <Routes>
            <Route  path="/" element={<Home/>}></Route>
            <Route exact path="/upload" element={<UploadVideo/>}></Route>
            <Route  path="/player/:id" element={<Player/>}></Route>
            </Routes>
        </Router>
    );
}
export default App;