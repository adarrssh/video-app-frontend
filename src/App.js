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
import LocalPlayer from './localPlayer';

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
                        <Link to="/play">go to player</Link>
                    </li>
                </ul>
            </nav>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route exact path="/upload" element={<UploadVideo />} />
                <Route path="/player/:id" element={<Player />} />
                <Route exact path="/play" element={<LocalPlayer />} />
            </Routes>
        </Router>
    );
}

export default App;
