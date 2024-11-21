import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseConfig";

import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Home from "./pages/Home";
import MoodSelector from "./pages/MoodSelector";
import Header from "./components/Header";
import SavedPlaylists from "./pages/SavedPlaylists";
import ProtectedRoute from "./components/ProtectedRoute";
import Loader from "./components/Loader";
import NotFound from "./components/NotFound";

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [checkingAuth, setCheckingAuth] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setIsAuthenticated(!!user);
            setCheckingAuth(false);
        });
        return () => unsubscribe();
    }, []);

    if (checkingAuth) {
        return <Loader />;
    }

    return (
        <Router>
            <Header isAuthenticated={isAuthenticated} />
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route
                    path="/login"
                    element={isAuthenticated ? <Navigate to="/home" /> : <Login />}
                />
                <Route
                    path="/home"
                    element={
                        <ProtectedRoute isAuthenticated={isAuthenticated}>
                            <Home />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/mood-selector"
                    element={
                        <ProtectedRoute isAuthenticated={isAuthenticated}>
                            <MoodSelector />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/saved-playlists"
                    element={
                        <ProtectedRoute isAuthenticated={isAuthenticated}>
                            <SavedPlaylists />
                        </ProtectedRoute>
                    }
                />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
}

export default App;
