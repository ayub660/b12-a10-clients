import React, { createContext, useState, useEffect, useContext } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    onAuthStateChanged,
    updateProfile
} from "firebase/auth";
import { auth } from "../firebase/firebase.config";

// Create AuthContext
export const AuthContext = createContext();

// AuthProvider
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Register user
    const registerUser = async (email, password, name, photoURL) => {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, { displayName: name, photoURL });
        setUser(userCredential.user);
        return userCredential.user;
    };

    // Login user
    const loginUser = async (email, password) => {
        return await signInWithEmailAndPassword(auth, email, password);
    };

    // Google login
    const googleLogin = async () => {
        const provider = new GoogleAuthProvider();
        return await signInWithPopup(auth, provider);
    };

    // Logout
    const logoutUser = async () => {
        await signOut(auth);
        setUser(null);
    };

    // Listen to auth changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading, registerUser, loginUser, googleLogin, logoutUser }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook to use auth context
export const useAuth = () => useContext(AuthContext);
