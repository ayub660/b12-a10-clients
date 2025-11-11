import React, { useState } from "react";
import { toast } from "react-toastify";
import { auth } from "../firebase/firebase.config";
import {
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    fetchSignInMethodsForEmail,
} from "firebase/auth";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState(""); // <-- error state

    // Email/Password Login
    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMsg(""); // clear previous error
        try {
            const methods = await fetchSignInMethodsForEmail(auth, email);
            if (methods.length === 0) {
                setErrorMsg("User not registered!"); // show below button
                setLoading(false);
                return;
            }

            await signInWithEmailAndPassword(auth, email, password);
            toast.success("Login successful!");
        } catch (err) {
            setErrorMsg("Incorrect email or password!"); // show below button
        } finally {
            setLoading(false);
        }
    };

    // Google Login
    const handleGoogleLogin = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            toast.success(`Welcome ${result.user.displayName}`);
        } catch (err) {
            if (err.code === "auth/popup-closed-by-user") {
                toast.error("Google login popup was closed!");
            } else {
                toast.error(err.message);
            }
        }
    };

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse w-full max-w-6xl mx-auto">
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

                            <button
                                type="submit"
                                className={`btn btn-neutral w-full mt-4`}
                                disabled={loading}
                            >
                                {loading ? "Logging in..." : "Login"}
                            </button>

                            {/* Error message below button */}
                            {errorMsg && (
                                <p className="text-red-500 text-sm mt-2">{errorMsg}</p>
                            )}
                        </form>

                        <div className="divider">OR</div>
                        <button
                            onClick={handleGoogleLogin}
                            className="btn btn-outline w-full flex items-center justify-center gap-2"
                        >
                            <FcGoogle size={24} /> Login with Google
                        </button>

                        <p className="text-center mt-4 text-sm">
                            Don't have an account?{" "}
                            <a href="/register" className="link link-primary">
                                Register
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
