// src/pages/SavedPlaylists.jsx

import React, { useEffect, useState } from "react";
import { auth, db } from "../firebaseConfig";
import {
    collection,
    query,
    where,
    getDocs,
    deleteDoc,
    doc,
    updateDoc,
    getDoc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { FaTrash, FaChevronDown, FaChevronUp } from "react-icons/fa";

const SavedPlaylists = () => {
    const [playlists, setPlaylists] = useState([]);
    const [expandedPlaylistId, setExpandedPlaylistId] = useState(null);
    const [hoveredDeleteButtonId, setHoveredDeleteButtonId] = useState(null);
    const [hoveredSongDeleteButtonId, setHoveredSongDeleteButtonId] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchPlaylists = async () => {
            const user = auth.currentUser;
            if (user) {
                try {
                    const q = query(
                        collection(db, "playlists"),
                        where("userId", "==", user.uid)
                    );
                    const querySnapshot = await getDocs(q);
                    const userPlaylists = [];
                    querySnapshot.forEach((doc) => {
                        userPlaylists.push({ id: doc.id, ...doc.data() });
                    });
                    setPlaylists(userPlaylists);
                } catch (error) {
                    console.error("Error fetching playlists:", error);
                }
            } else {
                navigate("/login");
            }
        };

        fetchPlaylists();
    }, [navigate]);

    const handleDeletePlaylist = async (playlistId) => {
        if (window.confirm("Are you sure you want to delete this playlist?")) {
            try {
                await deleteDoc(doc(db, "playlists", playlistId));
                setPlaylists((prevPlaylists) =>
                    prevPlaylists.filter((playlist) => playlist.id !== playlistId)
                );
            } catch (error) {
                console.error("Error deleting playlist:", error);
            }
        }
    };

    const handleDeleteSong = async (playlistId, songId) => {
        if (window.confirm("Are you sure you want to delete this song?")) {
            try {
                const playlistRef = doc(db, "playlists", playlistId);
                const playlistDoc = await getDoc(playlistRef);
                if (playlistDoc.exists()) {
                    const playlistData = playlistDoc.data();
                    const updatedPlaylist = playlistData.playlist.filter(
                        (song) => song.id !== songId
                    );
                    await updateDoc(playlistRef, { playlist: updatedPlaylist });

                    // Update state
                    setPlaylists((prevPlaylists) =>
                        prevPlaylists.map((playlist) =>
                            playlist.id === playlistId
                                ? { ...playlist, playlist: updatedPlaylist }
                                : playlist
                        )
                    );
                }
            } catch (error) {
                console.error("Error deleting song from playlist:", error);
            }
        }
    };

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
        playlistContainer: {
            maxWidth: "1200px",
            margin: "0 auto",
        },
        playlistCard: {
            backgroundColor: "#fff",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            marginBottom: "20px",
            cursor: "pointer",
            transition: "background-color 0.2s",
        },
        playlistHeader: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
        },
        playlistName: {
            fontSize: "24px",
            fontWeight: "bold",
            color: "#333",
        },
        songsContainer: {
            marginTop: "20px",
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            justifyContent: "center",
        },
        songItem: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "15px",
            backgroundColor: "#f0f0f0",
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            textAlign: "center",
            width: "220px",
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
        audioPlayer: {
            width: "100%",
            marginTop: "10px",
        },
        deleteButton: {
            backgroundColor: "#e74c3c",
            color: "#fff",
            border: "none",
            padding: "5px 10px",
            fontSize: "14px",
            borderRadius: "5px",
            cursor: "pointer",
            transition: "background-color 0.3s",
        },
        deleteButtonHover: {
            backgroundColor: "#c0392b",
        },
        chevronIcon: {
            fontSize: "20px",
            color: "#555",
            marginLeft: "10px",
        },
    };

    return (
        <>
            <Header isAuthenticated={true} />
            <div style={styles.container}>
                <h1 style={styles.title}>My Playlists</h1>
                <div style={styles.playlistContainer}>
                    {playlists.length > 0 ? (
                        playlists.map((playlist) => (
                            <div
                                key={playlist.id}
                                style={styles.playlistCard}
                                onClick={() =>
                                    setExpandedPlaylistId(
                                        expandedPlaylistId === playlist.id ? null : playlist.id
                                    )
                                }
                            >
                                <div style={styles.playlistHeader}>
                                    <div style={{ display: "flex", alignItems: "center" }}>
                                        <span style={styles.playlistName}>{playlist.playlistName}</span>
                                        {expandedPlaylistId === playlist.id ? (
                                            <FaChevronUp style={styles.chevronIcon} />
                                        ) : (
                                            <FaChevronDown style={styles.chevronIcon} />
                                        )}
                                    </div>
                                    <button
                                        style={{
                                            ...styles.deleteButton,
                                            ...(hoveredDeleteButtonId === playlist.id
                                                ? styles.deleteButtonHover
                                                : {}),
                                        }}
                                        onClick={(e) => {
                                            e.stopPropagation(); // Prevent toggling when clicking delete
                                            handleDeletePlaylist(playlist.id);
                                        }}
                                        onMouseEnter={() => setHoveredDeleteButtonId(playlist.id)}
                                        onMouseLeave={() => setHoveredDeleteButtonId(null)}
                                        title="Delete Playlist"
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                                {expandedPlaylistId === playlist.id && (
                                    <div style={styles.songsContainer}>
                                        {playlist.playlist.map((song) => (
                                            <div key={song.id} style={styles.songItem}>
                                                <img
                                                    src={song.albumCover}
                                                    alt="Album cover"
                                                    style={styles.albumCover}
                                                />
                                                <span style={styles.trackName}>{song.name}</span>
                                                <span style={styles.artistName}>{song.artist}</span>
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
                                                    style={{
                                                        ...styles.deleteButton,
                                                        ...(hoveredSongDeleteButtonId === song.id
                                                            ? styles.deleteButtonHover
                                                            : {}),
                                                    }}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleDeleteSong(playlist.id, song.id);
                                                    }}
                                                    onMouseEnter={() => setHoveredSongDeleteButtonId(song.id)}
                                                    onMouseLeave={() => setHoveredSongDeleteButtonId(null)}
                                                    title="Delete Song"
                                                >
                                                    Delete Song
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <p style={{ textAlign: "center", color: "#555" }}>
                            You have no saved playlists.
                        </p>
                    )}
                </div>
            </div>
        </>
    );
};

export default SavedPlaylists;
