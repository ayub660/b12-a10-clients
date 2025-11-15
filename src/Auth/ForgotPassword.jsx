import React, { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const ForgotPassword = () => {
    const { forgotPassword } = useAuth();
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await forgotPassword(email);
            Swal.fire(
                "Success",
                "Password reset email sent. Check your inbox.",
                "success"
            );
            setEmail("");
            navigate("/login"); // redirect to login after sending email
        } catch (err) {
            Swal.fire("Error", err.message || "Failed to send reset email", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[70vh] flex justify-center items-center">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 shadow-md rounded w-96"
            >
                <h2 className="text-2xl font-bold mb-4 text-center">
                    Forgot Password
                </h2>

                <input
                    type="email"
                    placeholder="Enter your registered email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input input-bordered w-full mb-3"
                    required
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-green-600 text-white py-2 rounded"
                >
                    {loading ? "Sending..." : "Send Reset Email"}
                </button>
            </form>
        </div>
    );
};

export default ForgotPassword;