// src/auth/Login.jsx
import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import Swal from "sweetalert2";

const Login = () => {
    const { loginUser, googleLogin, forgotPassword } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const from = location.state?.from?.pathname || "/";

    // Toast Instance (Top-right)
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        try {
            await loginUser(email, password);

            Toast.fire({
                icon: "success",
                title: "Logged in successfully!",
            });

            navigate(from, { replace: true });
        } catch (err) {
            let message = "Please enter valid credential.";
            if (err.code === "auth/user-not-found") {
                message = "No user found with this email.";
            } else if (err.code === "auth/wrong-password") {
                message = "Incorrect password.";
            } else if (err.code === "auth/invalid-email") {
                message = "Please enter a valid email.";
            }
            setError(message);
        }
    };

    const handleGoogle = async () => {
        try {
            await googleLogin();
            Toast.fire({
                icon: "success",
                title: "Logged in with Google",
            });
            navigate(from, { replace: true });
        } catch (err) {
            setError("Google login failed. Try again.");
        }
    };

    const handleForgotPassword = async () => {
        const email = prompt("Enter your email:");
        if (!email) return;

        try {
            await forgotPassword(email);
            Toast.fire({
                icon: "success",
                title: "Password reset email sent!",
            });
        } catch (err) {
            Toast.fire({
                icon: "error",
                title: "Failed to send reset email.",
            });
        }
    };

    return (
        <div className="min-h-[70vh] flex justify-center items-center">
            <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded w-96">
                <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

                {error && <p className="text-red-500 mb-2">{error}</p>}

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="input input-bordered w-full mb-3"
                    required
                />

                <div className="relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Password"
                        className="input input-bordered w-full mb-3"
                        required
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2 top-2 text-gray-500"
                    >
                        {showPassword ? "Hide" : "Show"}
                    </button>
                </div>

                <button type="submit" className="w-full bg-green-600 text-white py-2 rounded mb-2">
                    Login
                </button>

                <button
                    type="button"
                    onClick={handleGoogle}
                    className="w-full bg-blue-500 text-white py-2 rounded mb-2"
                >
                    Login with Google
                </button>

                <p className="text-center text-gray-600 mt-2">
                    <Link to="/forgot-password" className="text-blue-500 underline">
                        Forgot Password?
                    </Link>
                </p>

                <p className="text-center text-gray-600 mt-2">
                    Don't have an account? <Link to="/register" className="text-green-600">Register</Link>
                </p>
            </form>
        </div>
    );
};

export default Login;