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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        try {
            await loginUser(email, password);
            Swal.fire("Success", "Logged in successfully", "success");
            navigate(from, { replace: true });
        } catch (err) {
            // Map Firebase errors to friendly messages
            let message = "Please enter valid credential.";
            if (err.code === "auth/user-not-found") {
                message = "No user found with this email.";
            } else if (err.code === "auth/wrong-password") {
                message = "Incorrect password. Please try again.";
            } else if (err.code === "auth/invalid-email") {
                message = "Please enter a valid email address.";
            }
            setError(message);
        }
    };

    const handleGoogle = async () => {
        try {
            await googleLogin();
            Swal.fire("Success", "Logged in with Google", "success");
            navigate(from, { replace: true });
        } catch (err) {
            setError("Google login failed. Please try again.");
        }
    };

    const handleForgotPassword = async () => {
        const email = prompt("Enter your registered email for password reset:");
        if (!email) return;
        try {
            await forgotPassword(email);
            Swal.fire("Success", "Password reset email sent. Check your inbox.", "success");
        } catch (err) {
            Swal.fire("Error", "Failed to send reset email. Please try again.", "error");
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
                    <button
                        type="button"
                        onClick={handleForgotPassword}
                        className="text-blue-500 underline"
                    >
                        Forgot Password?
                    </button>
                </p>

                <p className="text-center text-gray-600 mt-2">
                    Don't have an account? <Link to="/register" className="text-green-600">Register</Link>
                </p>
            </form>
        </div>
    );
};

export default Login;
