import React from 'react';
import {
    Route,
    BrowserRouter as Router,
    Routes,
    Link,
} from "react-router-dom";
import Home from './Home';
import LocalPlayer from './localPlayer';
import UserB from './JoinRoom';

function App() {
    return (
        <Router>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/play">go to player</Link>
                    </li>
                    <li>
                        <Link to="/join">join room</Link>
                    </li> 
                </ul>
            </nav>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route exact path="/play" element={<LocalPlayer />} />
                <Route exact path="/join" element={<UserB />} />
            </Routes>
        </Router>
    );
}

export default App;
