import React from 'react';
import {
    Route,
    BrowserRouter as Router,
    Routes,
    Link,
} from "react-router-dom";
import Home from './Home';
import Player from './Player';
import UploadVideo from './Upload';
import UploadVideotoStorage from './uploadtoStorage';

function App() {
    return (
        <Router>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/upload">Upload Video</Link>
                    </li>
                    <li>
                        <Link to="/upload-to-localstorage">Upload Video</Link>
                    </li>
                    <li>
                        <Link to="/player/64984f12d320e100654ae778" target='_blank'>Video 1</Link>
                    </li>
                    <li>
                        <Link to="/player/6499bb067ee1e113c4ec3261" target='_blank'>Video 2</Link>
                    </li>
                </ul>
            </nav>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route exact path="/upload" element={<UploadVideo />} />
                <Route exact path="/upload-to-localstorage" element={<UploadVideotoStorage />} />
                <Route path="/player/:id" element={<Player />} />
            </Routes>
        </Router>
    );
}

export default App;
