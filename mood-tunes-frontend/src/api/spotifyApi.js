import axios from "axios";

export const fetchSpotifyToken = async () => {
    try {
        console.log("Requesting Spotify token...");
        const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
        const clientSecret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;

        // Log credentials to ensure they are loaded correctly (remove in production)
        console.log("Client ID:", clientId);
        console.log("Client Secret:", clientSecret);

        const response = await axios.post(
            "https://accounts.spotify.com/api/token",
            "grant_type=client_credentials", // Body as a string
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`, // Base64 encode credentials
                },
            }
        );
        console.log("Spotify token fetched successfully:", response.data.access_token);
        return response.data.access_token; // Return the token
    } catch (error) {
        console.error("Error fetching Spotify token:", error.response?.data || error.message);
        return null;
    }
};

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
                limit: 16, // Fetch more tracks for better variety
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
