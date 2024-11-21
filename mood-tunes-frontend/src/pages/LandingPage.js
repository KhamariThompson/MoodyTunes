import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import musicIllustration from "../assets/music-illustration.png"; // Import your image

const LandingPage = () => {
    const navigate = useNavigate();

    const styles = {
        container: {
            marginTop: "100px", // Align with header height
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            minHeight: "calc(100vh - 100px)",
            padding: "20px",
            backgroundColor: "#f5f7fa",
            textAlign: "center",
        },
        card: {
            maxWidth: "800px",
            padding: "40px",
            borderRadius: "10px",
            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#ffffff",
        },
        title: {
            fontSize: "48px",
            fontWeight: "bold",
            marginBottom: "20px",
            color: "#333",
        },
        subtitle: {
            fontSize: "24px",
            color: "#666",
            marginBottom: "30px",
            lineHeight: "1.5",
        },
        image: {
            width: "100%",
            height: "auto",
            marginBottom: "30px",
            borderRadius: "10px",
        },
        description: {
            fontSize: "18px",
            color: "#555",
            marginBottom: "30px",
            lineHeight: "1.6",
        },
        button: {
            backgroundColor: "#4CAF50",
            color: "#fff",
            border: "none",
            padding: "15px 30px",
            fontSize: "18px",
            borderRadius: "5px",
            cursor: "pointer",
            transition: "background-color 0.3s",
        },
        buttonHover: {
            backgroundColor: "#45a049",
        },
    };

    return (
        <>
            <Header isAuthenticated={false} />
            <div style={styles.container}>
                <div style={styles.card}>
                    <h1 style={styles.title}>Welcome to MoodTunes</h1>
                    <p style={styles.subtitle}>
                        Discover personalized playlists that match your mood and vibe.
                    </p>
                    <img
                        src={musicIllustration} // Use the imported image here
                        alt="Music Illustration"
                        style={styles.image}
                    />
                    <p style={styles.description}>
                        Sign up now to start creating playlists tailored to your mood.
                        Explore, save, and enjoy a seamless music experience curated just
                        for you.
                    </p>
                    <button
                        onClick={() => navigate("/login")}
                        style={styles.button}
                        onMouseEnter={(e) => (e.target.style.backgroundColor = "#45a049")}
                        onMouseLeave={(e) => (e.target.style.backgroundColor = "#4CAF50")}
                    >
                        Get Started
                    </button>
                </div>
            </div>
        </>
    );
};

export default LandingPage;
