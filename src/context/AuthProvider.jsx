// src/context/AuthProvider.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    onAuthStateChanged,
    updateProfile,
    sendPasswordResetEmail
} from "firebase/auth";
import { auth } from "../firebase/firebase.config";

// Create context
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Register user
    const registerUser = async (email, password, name, photoURL) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(userCredential.user, { displayName: name, photoURL });
            setUser(userCredential.user);
            return userCredential.user;
        } catch (err) {
            throw err;
        }
    };

    // Login user
    const loginUser = async (email, password) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            setUser(userCredential.user);
            return userCredential.user;
        } catch (err) {
            console.error("Login Error:", err);
            throw err; // rethrow to handle in component
        }
    };

    // Google login
    const googleLogin = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            setUser(result.user);
            return result.user;
        } catch (err) {
            console.error("Google Login Error:", err);
            throw err;
        }
    };

    // Logout
    const logoutUser = async () => {
        await signOut(auth);
        setUser(null);
    };

    // Forgot password
    const forgotPassword = async (email) => {
        try {
            await sendPasswordResetEmail(auth, email);
        } catch (err) {
            console.error("Forgot Password Error:", err);
            throw err;
        }
    };

    // Listen for auth state changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                registerUser,
                loginUser,
                googleLogin,
                logoutUser,
                forgotPassword
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

// Hook to use auth context
export const useAuth = () => useContext(AuthContext);
