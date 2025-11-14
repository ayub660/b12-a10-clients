// src/issues/AddIssue.jsx
import React, { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import Swal from "sweetalert2";

const AddIssue = () => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        category: "Garbage",
        location: "",
        description: "",
        image: "",
        amount: "",
    });

    // 🔹 SweetAlert centralized function
    const showAlert = (type, title, text) => {
        Swal.fire({
            icon: type,
            title,
            text,
            confirmButtonColor: type === "success" ? "#22c55e" : "#ef4444",
        });
    };

    // Input change handler
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Submit handler
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            showAlert("error", "Error", "You must be logged in to add an issue");
            return;
        }

        const newIssue = {
            ...formData,
            status: "Ongoing",
            date: new Date().toISOString(),
            email: user.email,
            amount: Number(formData.amount) || 0,
        };

        setLoading(true);

        try {
            const res = await fetch("https://cleancity-project.vercel.app/issues", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newIssue),
            });

            const data = await res.json();

            if (res.ok && data.success) {
                showAlert("success", "Success", "Issue added successfully");
                setFormData({
                    title: "",
                    category: "Garbage",
                    location: "",
                    description: "",
                    image: "",
                    amount: "",
                });
            } else {
                showAlert("error", "Error", data.message || "Failed to add issue");
            }
        } catch (err) {
            console.error("Fetch error:", err);
            showAlert("error", "Error", "Server error: Could not add issue");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[80vh] flex justify-center items-center bg-gray-50 p-4">
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-lg rounded-xl p-6 w-full max-w-lg"
            >
                <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
                    Add Issue
                </h2>

                {/* Title */}
                <label className="block mb-1 font-semibold">Title</label>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="input input-bordered w-full mb-3"
                    placeholder="Enter issue title"
                    required
                />

                {/* Category */}
                <label className="block mb-1 font-semibold">Category</label>
                <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="input input-bordered w-full mb-3"
                >
                    <option value="Garbage">Garbage</option>
                    <option value="RoadDamage">Road Damage</option>
                    <option value="BrokenProperty">Broken Property</option>
                    <option value="IllegalConstruction">Illegal Construction</option>
                </select>

                {/* Location */}
                <label className="block mb-1 font-semibold">Location</label>
                <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="input input-bordered w-full mb-3"
                    placeholder="Enter location"
                    required
                />

                {/* Description */}
                <label className="block mb-1 font-semibold">Description</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="input input-bordered w-full mb-3 h-24 resize-none"
                    placeholder="Describe the issue"
                    required
                />

                {/* Image */}
                <label className="block mb-1 font-semibold">Image URL</label>
                <input
                    type="text"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    className="input input-bordered w-full mb-3"
                    placeholder="https://example.com/image.jpg"
                />

                {/* Suggested Budget */}
                <label className="block mb-1 font-semibold">Suggested Fix Amount</label>
                <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    className="input input-bordered w-full mb-4"
                    placeholder="Enter suggested budget"
                />

                {/* Submit */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
                >
                    {loading ? "Adding..." : "Add Issue"}
                </button>
            </form>
        </div>
    );
};

export default AddIssue;
