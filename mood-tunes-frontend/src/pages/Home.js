// src/pages/Home.jsx

import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { db, auth } from "../firebaseConfig";
import { doc, getDoc, collection, addDoc } from "firebase/firestore";
import { fetchSpotifyToken, fetchSpotifyTracks } from "../api/spotifyApi";

const Home = () => {
    const [mood, setMood] = useState("");
    const [playlist, setPlaylist] = useState([]);
    const [playlistName, setPlaylistName] = useState(""); // Initial playlist name
    const [customPlaylistName, setCustomPlaylistName] = useState(""); // User-defined playlist name
    const [savedMessage, setSavedMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [name, setUserName] = useState("");
    const [isUserNameLoaded, setIsUserNameLoaded] = useState(false); // New state to track if userName is loaded

    useEffect(() => {
        const fetchUserName = async () => {
            const user = auth.currentUser;
            if (user) {
                try {
                    const userDocRef = doc(db, "users", user.uid);
                    const userDocSnap = await getDoc(userDocRef);
                    if (userDocSnap.exists()) {
                        const userData = userDocSnap.data();
                        console.log("Fetched Firestore Data:", userData); // Log Firestore data
                        if (userData.name) {
                            const fullName = userData.name;
                            console.log("Full Name from Firestore:", fullName); // Log full name
                            const firstName = fullName.split(" ")[0]; // Extract the first name
                            console.log("Extracted First Name:", firstName); // Log first name
                            setUserName(firstName); // Set the first name
                        } else {
                            console.error("Name field is missing in Firestore");
                            setUserName(null); // Fallback to null
                        }
                    } else {
                        console.error("User document not found in Firestore");
                        setUserName(null); // Fallback to null
                    }
                } catch (error) {
                    console.error("Error fetching user data from Firestore:", error);
                    setUserName(null); // Fallback to null
                }
            } else {
                console.error("No user is currently logged in");
                setUserName(null); // Fallback to null
            }
            setIsUserNameLoaded(true); // Set to true after attempting to fetch
        };

        fetchUserName();
    }, []);



    const styles = {
        container: {
            marginTop: "100px", // Adjusted to match header height
            padding: "20px",
            textAlign: "center",
            backgroundColor: "#f5f7fa",
            minHeight: "calc(100vh - 100px)", // Adjusted to match header height
            boxSizing: "border-box",
        },
        title: {
            fontSize: "32px",
            marginBottom: "20px",
            color: "#333",
        },
        subtitle: {
            fontSize: "20px",
            color: "#555",
            marginBottom: "30px",
        },
        dropdown: {
            padding: "10px",
            fontSize: "16px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            marginBottom: "20px",
            width: "200px",
        },
        button: {
            backgroundColor: "#4CAF50",
            color: "#fff",
            border: "none",
            padding: "10px 20px",
            fontSize: "16px",
            borderRadius: "5px",
            cursor: "pointer",
            transition: "background-color 0.3s",
        },
        buttonHover: {
            backgroundColor: "#45a049",
        },
        playlistContainer: {
            backgroundColor: "#fff",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            marginTop: "30px",
            maxWidth: "1200px",
            marginLeft: "auto",
            marginRight: "auto",
            overflowX: "auto",
        },
        playlistHeader: {
            fontSize: "24px",
            fontWeight: "bold",
            marginBottom: "20px",
            color: "#333",
            textAlign: "center",
        },
        playlistNameInput: {
            padding: "10px",
            fontSize: "18px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            marginBottom: "20px",
            width: "100%",
            maxWidth: "400px",
            boxSizing: "border-box",
        },
        playlist: {
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)", // Set to 4 columns
            gap: "20px",
            justifyContent: "center",
        },
        playlistItem: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "15px",
            backgroundColor: "#f0f0f0",
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            textAlign: "center",
        },
        albumCover: {
            width: "100%",
            height: "200px",
            objectFit: "cover",
            borderRadius: "8px",
            marginBottom: "10px",
        },
        trackName: {
            fontWeight: "bold",
            marginBottom: "5px",
            fontSize: "16px",
            color: "#333",
        },
        albumName: {
            fontStyle: "italic",
            color: "#777",
            marginBottom: "5px",
            fontSize: "14px",
        },
        artistName: {
            color: "#555",
            marginBottom: "10px",
            fontSize: "14px",
        },
        playlistLink: {
            color: "#4CAF50",
            textDecoration: "none",
            fontWeight: "bold",
            marginBottom: "10px",
            fontSize: "14px",
        },
        deleteButton: {
            backgroundColor: "#e74c3c",
            color: "#fff",
            border: "none",
            padding: "5px 10px",
            fontSize: "14px",
            borderRadius: "5px",
            cursor: "pointer",
            marginTop: "10px",
            transition: "background-color 0.3s",
        },
        deleteButtonHover: {
            backgroundColor: "#c0392b",
        },
        saveButtonContainer: {
            marginTop: "30px",
            textAlign: "center",
        },
        saveButton: {
            backgroundColor: "#4285F4",
            color: "#fff",
            border: "none",
            padding: "12px 24px",
            fontSize: "16px",
            borderRadius: "5px",
            cursor: "pointer",
            transition: "background-color 0.3s",
        },
        saveButtonDisabled: {
            backgroundColor: "#a0c3ff",
            cursor: "not-allowed",
        },
        audioPlayer: {
            width: "100%",
            marginTop: "10px",
        },
    };

    const [isGenerating, setIsGenerating] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [hoveredDeleteButtonId, setHoveredDeleteButtonId] = useState(null);
    const [hoveredButton, setHoveredButton] = useState(false);

    const handleGeneratePlaylist = async () => {
        if (!mood) {
            setErrorMessage("Please select a mood before generating a playlist.");
            return;
        }

        try {
            setErrorMessage(""); // Clear previous errors
            setIsGenerating(true);
            const token = await fetchSpotifyToken(); // Fetch Spotify access token
            if (token) {
                const tracks = await fetchSpotifyTracks(mood, token, 16); // Fetch 16 tracks based on mood
                if (tracks.length === 16) {
                    setPlaylist(tracks); // Directly set the playlist
                    setCustomPlaylistName(""); // Reset custom playlist name

                    // Handle possessive form correctly
                    const nameToUse = name || "User";
                    const possessiveName = nameToUse.endsWith('s')
                        ? `${nameToUse}'` // If name ends with 's', just add an apostrophe
                        : `${nameToUse}'s`; // Else, add 's
                    setPlaylistName(
                        `${possessiveName} ${mood.charAt(0).toUpperCase() + mood.slice(1)} Vibes`
                    );
                } else {
                    setErrorMessage("Could not generate 16 tracks. Try again.");
                }
            } else {
                setErrorMessage(
                    "Failed to fetch Spotify token. Check your API credentials."
                );
            }
        } catch (error) {
            console.error("Error generating playlist:", error);
            setErrorMessage("Something went wrong while fetching the playlist.");
        } finally {
            setIsGenerating(false);
        }
    };



    const savePlaylist = async () => {
        if (playlist.length === 0) {
            setErrorMessage("Cannot save an empty playlist.");
            return;
        }

        try {
            setErrorMessage("");
            setIsSaving(true);
            const user = auth.currentUser;
            if (user) {
                await addDoc(collection(db, "playlists"), {
                    userId: user.uid,
                    mood,
                    playlistName: customPlaylistName || playlistName,
                    playlist,
                    createdAt: new Date(),
                });
                setSavedMessage("Playlist saved successfully!");
                setTimeout(() => setSavedMessage(""), 3000);
            } else {
                setErrorMessage("User is not authenticated.");
            }
        } catch (error) {
            console.error("Error saving playlist:", error);
            setErrorMessage("Failed to save the playlist.");
        } finally {
            setIsSaving(false);
        }
    };

    const handleDeleteSong = (songId) => {
        setPlaylist((prevPlaylist) =>
            prevPlaylist.filter((song) => song.id !== songId)
        );
    };

    return (
        <>
            <Header isAuthenticated={true} />
            <div style={styles.container}>
                <h1 style={styles.title}>Welcome to MoodTunes</h1>
                <p style={styles.subtitle}>
                    Select your mood and generate the perfect playlist to match.
                </p>
                <select
                    value={mood}
                    onChange={(e) => setMood(e.target.value)}
                    style={styles.dropdown}
                >
                    <option value="">Select a Mood</option>
                    <option value="happy">Happy</option>
                    <option value="sad">Sad</option>
                    <option value="energetic">Energetic</option>
                    <option value="relaxed">Relaxed</option>
                    <option value="romantic">Romantic</option>
                    <option value="party">Party</option>
                    <option value="chill">Chill</option>
                </select>
                <br />
                <button
                    onClick={handleGeneratePlaylist}
                    style={{
                        ...styles.button,
                        ...(isGenerating
                            ? { backgroundColor: "#95a5a6", cursor: "not-allowed" }
                            : {}),
                        ...(hoveredButton ? styles.buttonHover : {}),
                    }}
                    disabled={isGenerating || !isUserNameLoaded} // Disable button until userName is loaded
                    onMouseEnter={() => setHoveredButton(true)}
                    onMouseLeave={() => setHoveredButton(false)}
                >
                    {isGenerating ? "Generating..." : "Generate Playlist"}
                </button>
                {errorMessage && (
                    <p style={{ color: "red", marginTop: "20px" }}>{errorMessage}</p>
                )}
                {savedMessage && (
                    <p style={{ color: "green", marginTop: "20px" }}>{savedMessage}</p>
                )}
                {playlist.length > 0 && (
                    <div style={styles.playlistContainer}>
                        <input
                            type="text"
                            placeholder="Enter playlist name"
                            value={customPlaylistName}
                            onChange={(e) => setCustomPlaylistName(e.target.value)}
                            style={styles.playlistNameInput}
                        />
                        <h3 style={styles.playlistHeader}>
                            {customPlaylistName || playlistName}
                        </h3>
                        <div style={styles.playlist}>
                            {playlist.map((song) => (
                                <div key={song.id} style={styles.playlistItem}>
                                    <img
                                        src={song.albumCover}
                                        alt="Album cover"
                                        style={styles.albumCover}
                                    />
                                    <span style={styles.trackName}>{song.name}</span>
                                    <span style={styles.albumName}>Album: {song.album}</span>
                                    <span style={styles.artistName}>Artist: {song.artist}</span>
                                    <a
                                        href={song.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={styles.playlistLink}
                                    >
                                        Listen on Spotify
                                    </a>
                                    {song.previewUrl ? (
                                        <audio controls style={styles.audioPlayer}>
                                            <source src={song.previewUrl} type="audio/mpeg" />
                                            Your browser does not support the audio element.
                                        </audio>
                                    ) : (
                                        <p>Preview not available</p>
                                    )}
                                    <button
                                        onClick={() => handleDeleteSong(song.id)}
                                        style={{
                                            ...styles.deleteButton,
                                            ...(hoveredDeleteButtonId === song.id
                                                ? styles.deleteButtonHover
                                                : {}),
                                        }}
                                        onMouseEnter={() => setHoveredDeleteButtonId(song.id)}
                                        onMouseLeave={() => setHoveredDeleteButtonId(null)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            ))}
                        </div>
                        <div style={styles.saveButtonContainer}>
                            <button
                                onClick={savePlaylist}
                                style={{
                                    ...styles.saveButton,
                                    ...(isSaving ? styles.saveButtonDisabled : {}),
                                }}
                                disabled={isSaving || playlist.length === 0}
                            >
                                {isSaving ? "Saving..." : "Save Playlist"}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default Home;