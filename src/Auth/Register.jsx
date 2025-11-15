import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import Swal from "sweetalert2";

const Register = () => {
    const { registerUser, googleLogin } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState("");

    // Reusable Toast (Top Right)
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const name = e.target.name.value.trim();
        const email = e.target.email.value.trim();
        const password = e.target.password.value.trim();
        const photoURL = e.target.photoURL.value.trim();

        if (!/[A-Z]/.test(password)) return setError("Password must contain at least 1 uppercase letter");
        if (!/[a-z]/.test(password)) return setError("Password must contain at least 1 lowercase letter");
        if (!/[0-9]/.test(password)) return setError("Password must contain at least 1 number");
        if (!/[^A-Za-z0-9]/.test(password)) return setError("Password must contain at least 1 special character");
        if (password.length < 6) return setError("Password must be at least 6 characters long");

        try {
            await registerUser(email, password, name, photoURL);

            Toast.fire({
                icon: "success",
                title: "Registered successfully!",
            });

            navigate("/");
        } catch (err) {
            console.log(err);
            if (err.code === "auth/email-already-in-use") {
                setError("Email already registered");
            } else {
                setError("Registration failed. Try again.");
            }
        }
    };

    const handleGoogle = async () => {
        try {
            await googleLogin();

            Toast.fire({
                icon: "success",
                title: "Registered with Google",
            });

            navigate("/");
        } catch {
            setError("Google login failed");
        }
    };

    return (
        <div className="min-h-[70vh] flex justify-center items-center">
            <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded w-96">
                <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>

                {error && <p className="text-red-500 mb-2">{error}</p>}

                <input type="text" name="name" placeholder="Name" className="input input-bordered w-full mb-3" required />

                <input type="email" name="email" placeholder="Email" className="input input-bordered w-full mb-3" required />

                <input type="text" name="photoURL" placeholder="Photo URL" className="input input-bordered w-full mb-3" />

                <input type="password" name="password" placeholder="Password" className="input input-bordered w-full mb-3" required />

                <button type="submit" className="w-full bg-green-600 text-white py-2 rounded mb-2">
                    Register
                </button>

                <button
                    type="button"
                    onClick={handleGoogle}
                    className="w-full bg-blue-500 text-white py-2 rounded mb-2"
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