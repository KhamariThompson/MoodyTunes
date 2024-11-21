import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { setAccessToken } from "../api/spotifyApi";

const Callback = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const hash = window.location.hash;
        const token = new URLSearchParams(hash).get("#access_token");

        if (token) {
            setAccessToken(token);
            localStorage.setItem("spotifyAccessToken", token);
            navigate("/home"); // Redirect to home after login
        } else {
            console.error("Access token not found in the URL");
            navigate("/"); // Redirect to landing if no token
        }
    }, [navigate]);

    return <div>Loading...</div>;
};

export default Callback;
