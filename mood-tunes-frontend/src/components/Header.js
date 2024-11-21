// src/components/Header.jsx

import React from "react";
import { useNavigate } from "react-router-dom";
import { signOutUser } from "../firebaseConfig"; // Ensure this function is exported

const Header = ({ isAuthenticated }) => {
    const navigate = useNavigate();

    const handleMyPlaylistsClick = () => {
        if (isAuthenticated) {
            navigate("/saved-playlists");
        } else {
            navigate("/signup");
        }
    };

    const handleLogout = async () => {
        try {
            await signOutUser();
            navigate("/login");
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    const styles = {
        header: {
            position: "fixed",
            top: "0",
            width: "100%",
            height: "100px",
            backgroundColor: "#2c2c2c",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 40px",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
            zIndex: "1000",
            boxSizing: "border-box",
        },
        logo: {
            fontSize: "28px",
            fontWeight: "bold",
            color: "#fff",
            cursor: "pointer",
            flex: "1",
            transition: "color 0.3s",
        },
        nav: {
            display: "flex",
            gap: "20px",
            flex: "2",
            justifyContent: "flex-end",
            alignItems: "center",
        },
        navLink: {
            color: "#fff",
            textDecoration: "none",
            fontSize: "18px",
            fontWeight: "500",
            cursor: "pointer",
            whiteSpace: "nowrap",
            transition: "color 0.3s",
        },
    };

    return (
        <header style={styles.header}>
            <div
                style={styles.logo}
                onClick={() => navigate("/")}
                onMouseEnter={(e) => (e.target.style.color = "#4CAF50")}
                onMouseLeave={(e) => (e.target.style.color = "#fff")}
            >
                MoodTunes
            </div>
            <nav style={styles.nav}>
                {!isAuthenticated ? (
                    <>
                        <div
                            style={styles.navLink}
                            onClick={() => navigate("/login")}
                            onMouseEnter={(e) => (e.target.style.color = "#4CAF50")}
                            onMouseLeave={(e) => (e.target.style.color = "#fff")}
                        >
                            Login
                        </div>
                        <div
                            style={styles.navLink}
                            onClick={() => navigate("/signup")}
                            onMouseEnter={(e) => (e.target.style.color = "#4CAF50")}
                            onMouseLeave={(e) => (e.target.style.color = "#fff")}
                        >
                            Sign Up
                        </div>
                    </>
                ) : (
                    <>
                        <div
                            style={styles.navLink}
                            onClick={() => navigate("/home")}
                            onMouseEnter={(e) => (e.target.style.color = "#4CAF50")}
                            onMouseLeave={(e) => (e.target.style.color = "#fff")}
                        >
                            Home
                        </div>
                        <div
                            style={styles.navLink}
                            onClick={handleMyPlaylistsClick}
                            onMouseEnter={(e) => (e.target.style.color = "#4CAF50")}
                            onMouseLeave={(e) => (e.target.style.color = "#fff")}
                        >
                            My Playlists
                        </div>
                        <div
                            style={styles.navLink}
                            onClick={handleLogout}
                            onMouseEnter={(e) => (e.target.style.color = "#e74c3c")}
                            onMouseLeave={(e) => (e.target.style.color = "#fff")}
                        >
                            Logout
                        </div>
                    </>
                )}
            </nav>
        </header>
    );
};

export default Header;
