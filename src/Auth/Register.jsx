import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Swal from "sweetalert2";

const Register = () => {
    const { registerUser, googleLogin } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); // clear previous error

        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const photoURL = e.target.photoURL.value;

        // Password validation
        if (!/[A-Z]/.test(password)) {
            return setError("Password must contain at least 1 uppercase letter");
        }
        if (!/[a-z]/.test(password)) {
            return setError("Password must contain at least 1 lowercase letter");
        }
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            return setError("Password must contain at least 1 special character");
        }
        if (password.length < 6) {
            return setError("Password must be at least 6 characters");
        }

        try {
            // Register user with Firebase
            await registerUser(email, password, name, photoURL);
            Swal.fire("Success", "Registered successfully", "success");
            navigate("/"); // redirect to home
        } catch (err) {
            // Handle Firebase already registered error
            if (err.code === "auth/email-already-in-use") {
                setError("This email is already registered");
            } else {
                setError("Registration failed: " + err.message);
            }
        }
    };

    const handleGoogle = async () => {
        try {
            await googleLogin();
            Swal.fire("Success", "Registered with Google", "success");
            navigate("/");
        } catch {
            setError("Google login failed");
        }
    };

    return (
        <div className="min-h-[70vh] flex justify-center items-center bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded w-96">
                <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
                {error && <p className="text-red-500 mb-2">{error}</p>}
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    className="input input-bordered w-full mb-3"
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="input input-bordered w-full mb-3"
                    required
                />
                <input
                    type="text"
                    name="photoURL"
                    placeholder="Photo URL"
                    className="input input-bordered w-full mb-3"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="input input-bordered w-full mb-3"
                    required
                />
                <button
                    type="submit"
                    className="w-full bg-green-600 text-white py-2 rounded mb-2 hover:bg-green-700 transition"
                >
                    Register
                </button>
                <button
                    type="button"
                    onClick={handleGoogle}
                    className="w-full bg-blue-500 text-white py-2 rounded mb-2 hover:bg-blue-600 transition"
                >
                    Register with Google
                </button>
                <p className="text-center text-gray-600 mt-2">
                    Already have an account? <Link to="/login" className="text-green-600">Login</Link>
                </p>
            </form>
        </div>
    );
};

export default Register;
