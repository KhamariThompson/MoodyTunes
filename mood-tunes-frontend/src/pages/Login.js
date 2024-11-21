// src/components/Login.jsx

import React, { useState } from "react";
import { signInWithGoogle, signUpWithEmail, signInWithEmail } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

const Login = () => {
    const [isSignUp, setIsSignUp] = useState(false); // Toggle between login and signup
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [file, setFile] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isSignUp) {
                await signUpWithEmail(email, password, name, file);
            } else {
                await signInWithEmail(email, password);
            }
            navigate("/home");
        } catch (error) {
            console.error("Authentication error:", error);
            setErrorMessage(error.message || "An error occurred. Please try again.");
        }
    };

    const styles = {
        container: {
            marginTop: "100px", // Align with header height
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "calc(100vh - 100px)",
            padding: "20px",
            backgroundColor: "#f5f7fa",
        },
        card: {
            maxWidth: "500px",
            width: "100%",
            padding: "40px",
            borderRadius: "10px",
            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#ffffff",
        },
        title: {
            fontSize: "32px",
            fontWeight: "bold",
            marginBottom: "20px",
            color: "#333",
            textAlign: "center",
        },
        subtitle: {
            fontSize: "18px",
            color: "#666",
            marginBottom: "30px",
            textAlign: "center",
        },
        form: {
            width: "100%",
        },
        label: {
            fontSize: "16px",
            fontWeight: "bold",
            marginBottom: "5px",
            color: "#333",
            display: "block",
        },
        input: {
            width: "100%",
            padding: "12px",
            fontSize: "16px",
            marginBottom: "20px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            boxSizing: "border-box",
        },
        submitButton: {
            backgroundColor: "#4CAF50",
            color: "#fff",
            border: "none",
            padding: "15px",
            fontSize: "18px",
            borderRadius: "5px",
            cursor: "pointer",
            width: "100%",
            transition: "background-color 0.3s",
        },
        submitButtonHover: {
            backgroundColor: "#45a049",
        },
        googleButton: {
            backgroundColor: "#4285F4", // Google blue color
            color: "#fff",
            border: "none",
            padding: "15px",
            fontSize: "18px",
            borderRadius: "5px",
            cursor: "pointer",
            width: "100%",
            marginTop: "10px",
            transition: "background-color 0.3s",
        },
        googleButtonHover: {
            backgroundColor: "#3367D6",
        },
        switchText: {
            fontSize: "16px",
            color: "#666",
            marginTop: "20px",
            textAlign: "center",
        },
        switchLink: {
            color: "#4CAF50",
            fontWeight: "bold",
            cursor: "pointer",
            textDecoration: "none",
        },
        errorMessage: {
            color: "red",
            fontSize: "16px",
            marginTop: "10px",
            textAlign: "center",
        },
    };

    return (
        <>
            <Header isAuthenticated={false} />
            <div style={styles.container}>
                <div style={styles.card}>
                    <h1 style={styles.title}>{isSignUp ? "Create an Account" : "Welcome Back!"}</h1>
                    <p style={styles.subtitle}>
                        {isSignUp
                            ? "Sign up to explore personalized playlists tailored to your mood."
                            : "Log in to access your personalized playlists."}
                    </p>

                    {errorMessage && <p style={styles.errorMessage}>{errorMessage}</p>}

                    <form onSubmit={handleSubmit} style={styles.form}>
                        {isSignUp && (
                            <>
                                <label style={styles.label}>Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter your name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    style={styles.input}
                                    required
                                />

                                <label style={styles.label}>Profile Picture</label>
                                <input
                                    type="file"
                                    onChange={(e) => setFile(e.target.files[0])}
                                    style={styles.input}
                                />
                            </>
                        )}

                        <label style={styles.label}>Email</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={styles.input}
                            required
                        />

                        <label style={styles.label}>Password</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={styles.input}
                            required
                        />

                        <button
                            type="submit"
                            style={styles.submitButton}
                            onMouseEnter={(e) => (e.target.style.backgroundColor = styles.submitButtonHover.backgroundColor)}
                            onMouseLeave={(e) => (e.target.style.backgroundColor = styles.submitButton.backgroundColor)}
                        >
                            {isSignUp ? "Sign Up" : "Log In"}
                        </button>
                    </form>

                    <button
                        onClick={async () => {
                            try {
                                await signInWithGoogle();
                                navigate("/home");
                            } catch (error) {
                                console.error("Google Sign-In error:", error);
                                setErrorMessage("Failed to sign in with Google. Please try again.");
                            }
                        }}
                        style={styles.googleButton}
                        onMouseEnter={(e) => (e.target.style.backgroundColor = styles.googleButtonHover.backgroundColor)}
                        onMouseLeave={(e) => (e.target.style.backgroundColor = styles.googleButton.backgroundColor)}
                    >
                        Sign {isSignUp ? "Up" : "In"} with Google
                    </button>

                    <p style={styles.switchText}>
                        {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
                        <span
                            onClick={() => {
                                setIsSignUp(!isSignUp);
                                setErrorMessage("");
                            }}
                            style={styles.switchLink}
                        >
              {isSignUp ? "Log In" : "Sign Up"}
            </span>
                    </p>
                </div>
            </div>
        </>
    );
};

export default Login;
