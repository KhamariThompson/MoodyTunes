// src/pages/MoodSelector.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

const MoodSelector = () => {
    const navigate = useNavigate();
    const [selectedMood, setSelectedMood] = useState("");

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
        title: {
            fontSize: "36px",
            fontWeight: "bold",
            marginBottom: "20px",
            color: "#333",
        },
        subtitle: {
            fontSize: "20px",
            color: "#555",
            marginBottom: "40px",
            maxWidth: "600px",
        },
        moodGrid: {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            gap: "20px",
            width: "100%",
            maxWidth: "800px",
            marginBottom: "40px",
        },
        moodCard: {
            backgroundColor: "#fff",
            borderRadius: "10px",
            padding: "20px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            cursor: "pointer",
            transition: "transform 0.2s",
        },
        moodCardSelected: {
            transform: "scale(1.05)",
            borderColor: "#4CAF50",
            boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)",
        },
        moodText: {
            fontSize: "18px",
            fontWeight: "500",
            color: "#333",
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
            disabled: selectedMood === "",
        },
        buttonDisabled: {
            backgroundColor: "#a0c3af",
            cursor: "not-allowed",
        },
    };

    const moods = [
        "Happy",
        "Sad",
        "Energetic",
        "Relaxed",
        "Romantic",
        "Party",
        "Chill",
        "Focused",
        "Adventurous",
        "Nostalgic",
    ];

    const handleMoodSelect = (mood) => {
        setSelectedMood(mood);
    };

    const handleProceed = () => {
        // Assuming you pass the selected mood to the home page or fetch the playlist here
        navigate("/home", { state: { mood: selectedMood } });
    };

    return (
        <>
            <Header isAuthenticated={true} />
            <div style={styles.container}>
                <h1 style={styles.title}>Select Your Mood</h1>
                <p style={styles.subtitle}>
                    Choose a mood from the options below to generate a personalized playlist tailored just for you.
                </p>
                <div style={styles.moodGrid}>
                    {moods.map((mood) => (
                        <div
                            key={mood}
                            style={{
                                ...styles.moodCard,
                                ...(selectedMood === mood ? styles.moodCardSelected : {}),
                            }}
                            onClick={() => handleMoodSelect(mood)}
                        >
                            <p style={styles.moodText}>{mood}</p>
                        </div>
                    ))}
                </div>
                <button
                    onClick={handleProceed}
                    style={{
                        ...styles.button,
                        ...(selectedMood === "" ? styles.buttonDisabled : {}),
                    }}
                    disabled={selectedMood === ""}
                    onMouseEnter={(e) => {
                        if (selectedMood !== "") e.target.style.backgroundColor = "#45a049";
                    }}
                    onMouseLeave={(e) => {
                        if (selectedMood !== "") e.target.style.backgroundColor = "#4CAF50";
                    }}
                >
                    Generate Playlist
                </button>
            </div>
        </>
    );
};

export default MoodSelector;
