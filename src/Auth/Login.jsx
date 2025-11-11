import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { toast } from "react-toastify";

const Login = () => {
    const { loginUser } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();

        loginUser(email, password)
            .then(() => toast.success("Login successful!"))
            .catch((err) => toast.error(err.message));
    };

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse w-full max-w-6xl mx-auto">



                {/* Right Side Form */}
                <div className="card bg-base-100 w-full max-w-sm shadow-2xl">
                    <div className="card-body">
                        <form onSubmit={handleLogin} className="space-y-4">
                            <div>
                                <label className="label">Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Email"
                                    className="input input-bordered w-full"
                                    required
                                />
                            </div>
                            <div>
                                <label className="label">Password</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Password"
                                    className="input input-bordered w-full"
                                    required
                                />
                            </div>
                            <div className="flex justify-between items-center">
                                <a href="#" className="link link-hover text-sm">Forgot password?</a>
                            </div>
                            <button type="submit" className="btn btn-neutral w-full mt-4">
                                Login
                            </button>
                        </form>

                        {/* Optional Google Login */}
                        <div className="divider">OR</div>
                        <button className="btn btn-outline w-full">Login with Google</button>

                        {/* Link to Register */}
                        <p className="text-center mt-4 text-sm">
                            Don't have an account? <a href="/register" className="link link-primary">Register</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
