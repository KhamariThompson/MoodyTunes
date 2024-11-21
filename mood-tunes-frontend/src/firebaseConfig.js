// src/firebaseConfig.js

import { initializeApp } from "firebase/app";
import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";
import {
    getFirestore,
    doc,
    setDoc,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import axios from "axios";

// Firebase configuration using environment variables
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Save user data to Firestore
export const saveUserToFirestore = async (user, additionalData = {}) => {
    const userRef = doc(db, "users", user.uid);
    await setDoc(userRef, {
        name: user.displayName || additionalData.name || "N/A",
        email: user.email,
        photoURL: additionalData.photoURL || user.photoURL || "",
        createdAt: new Date().toISOString(),
    });
};

// Upload profile picture to Firebase Storage and return URL
export const uploadProfilePicture = async (file) => {
    const storageRef = ref(storage, `profilePictures/${file.name}`);
    await uploadBytes(storageRef, file);
    const photoURL = await getDownloadURL(storageRef);
    return photoURL;
};

// Google Sign-In
export const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        await saveUserToFirestore(user);
        console.log("Google Sign-In successful, user saved:", user);
    } catch (error) {
        console.error("Error during Google Sign-In:", error);
    }
};

// Email/Password Sign-Up
export const signUpWithEmail = async (email, password, name, file) => {
    try {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        const user = result.user;
        const photoURL = file ? await uploadProfilePicture(file) : "";
        await saveUserToFirestore(user, { name, photoURL });
        console.log("User signed up and saved:", user);
    } catch (error) {
        console.error("Error during sign-up:", error);
    }
};

// Email/Password Sign-In
export const signInWithEmail = async (email, password) => {
    try {
        const result = await signInWithEmailAndPassword(auth, email, password);
        console.log("User signed in:", result.user);
    } catch (error) {
        console.error("Error during sign-in:", error);
    }
};

// Sign Out
export const signOutUser = async () => {
    try {
        await signOut(auth);
        console.log("User signed out");
    } catch (error) {
        console.error("Error signing out:", error);
    }
};

const SPOTIFY_CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;

// Fetch Spotify Token
export const fetchSpotifyToken = async () => {
    try {
        const response = await axios.post(
            "https://accounts.spotify.com/api/token",
            "grant_type=client_credentials",
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    Authorization: `Basic ${btoa(
                        `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`
                    )}`,
                },
            }
        );
        return response.data.access_token;
    } catch (error) {
        console.error("Error fetching Spotify token:", error);
        return null;
    }
};

// Fetch Spotify Tracks
export const fetchSpotifyTracks = async (mood, token) => {
    // Comprehensive mood-to-genre mapping
    const moodToGenreMap = {
        happy: "pop,indie_pop,feel_good",
        sad: "acoustic,piano,singer_songwriter",
        energetic: "rock,hard_rock,power_metal,workout",
        relaxed: "jazz,chill,ambient,lounge",
        romantic: "rnb,soul,romance,love_songs",
        party: "dance,edm,party,electropop",
        chill: "chill,lofi,downtempo,electronica",
        focused: "classical,study,focus,ambient",
        adventurous: "world,folk,bluegrass,latin",
        nostalgic: "80s,90s,retro,synthwave",
        aggressive: "metal,hardcore,punk,thrash",
        uplifting: "upbeat,feel_good,anthem,indie_pop",
        moody: "trip_hop,dark_ambient,dream_pop,gothic",
        fun: "disco,funk,party,electropop",
        soulful: "soul,gospel,rnb,jazz",
        experimental: "experimental,avant_garde,psychedelic",
    };

    // Use the predefined genres or fall back to pop
    const genre = moodToGenreMap[mood.toLowerCase()] || "pop";

    try {
        const response = await axios.get("https://api.spotify.com/v1/recommendations", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: {
                seed_genres: genre, // Multiple genres supported, separated by commas
                limit: 15, // Fetch exactly 15 tracks
            },
        });

        // Format the returned tracks
        return response.data.tracks.map((track) => ({
            id: track.id,
            name: track.name || "Unknown Title",
            album: track.album?.name || "Unknown Album",
            artist: track.artists?.[0]?.name || "Unknown Artist",
            albumCover: track.album?.images?.[0]?.url || "https://via.placeholder.com/200", // Properly map album cover
            url: track.external_urls?.spotify || "#",
            previewUrl: track.preview_url || null, // Include preview URL
        }));
    } catch (error) {
        console.error("Error fetching Spotify tracks:", error.response?.data || error.message);
        return [];
    }
};
