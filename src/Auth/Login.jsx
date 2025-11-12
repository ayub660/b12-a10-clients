import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Swal from "sweetalert2";

const Login = () => {
    const { loginUser, googleLogin } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [error, setError] = useState("");

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
            setError("Invalid email or password");
        }
    };

    const handleGoogle = async () => {
        try {
            await googleLogin();
            Swal.fire("Success", "Logged in with Google", "success");
            navigate(from, { replace: true });
        } catch {
            setError("Google login failed");
        }
    };

    return (
        <div className="min-h-[70vh] flex justify-center items-center">
            <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded w-96">
                <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
                {error && <p className="text-red-500 mb-2">{error}</p>}
                <input type="email" name="email" placeholder="Email" className="input input-bordered w-full mb-3" required />
                <input type="password" name="password" placeholder="Password" className="input input-bordered w-full mb-3" required />
                <button type="submit" className="w-full bg-green-600 text-white py-2 rounded mb-2">Login</button>
                <button type="button" onClick={handleGoogle} className="w-full bg-blue-500 text-white py-2 rounded mb-2">Login with Google</button>
                <p className="text-center text-gray-600 mt-2">
                    Don't have an account? <Link to="/register" className="text-green-600">Register</Link>
                </p>
            </form>
        </div>
    );
};

export default Login;
