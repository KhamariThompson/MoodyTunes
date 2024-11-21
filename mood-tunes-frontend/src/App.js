// src/App.jsx

import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseConfig";

import LandingPage from "./pages/LandingPage";
import Login from "./components/Login";
import Home from "./pages/Home";
import MoodSelector from "./pages/MoodSelector";
import Header from "./components/Header";
import SavedPlaylists from "./pages/SavedPlaylists";

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [checkingAuth, setCheckingAuth] = useState(true); // To handle initial auth check

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setIsAuthenticated(!!user); // Set to true if a user is logged in
            setCheckingAuth(false);
        });
        return () => unsubscribe();
    }, []);

    if (checkingAuth) {
        return (
            <div style={{ paddingTop: "100px", textAlign: "center", fontSize: "24px" }}>
                Loading...
            </div>
        );
    }

    return (
        <Router>
            <Header isAuthenticated={isAuthenticated} />
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={isAuthenticated ? <Navigate to="/home" /> : <Login />} />
                <Route
                    path="/home"
                    element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
                />
                <Route
                    path="/mood-selector"
                    element={isAuthenticated ? <MoodSelector /> : <Navigate to="/login" />}
                />
                <Route
                    path="/saved-playlists"
                    element={isAuthenticated ? <SavedPlaylists /> : <Navigate to="/login" />}
                />
                {/* Redirect any unknown routes to LandingPage */}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
}

export default App;
