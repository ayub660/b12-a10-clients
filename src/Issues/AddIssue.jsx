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

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            Swal.fire("Error", "You must be logged in to add an issue", "error");
            return;
        }

        const newIssue = {
            ...formData,
            status: "ongoing",
            date: new Date().toISOString(),
            email: user.email,
            amount: Number(formData.amount) || 0,
        };

        setLoading(true);
        try {
            const res = await fetch("http://localhost:3500/issues", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newIssue),
            });

            const data = await res.json();

            if (res.ok && data.success) {
                Swal.fire("Success", "Issue added successfully", "success");
                setFormData({
                    title: "",
                    category: "Garbage",
                    location: "",
                    description: "",
                    image: "",
                    amount: "",
                });
            } else {
                Swal.fire("Error", data.message || "Failed to add issue", "error");
            }
        } catch (err) {
            console.error("Fetch error:", err);
            Swal.fire("Error", "Server error: Could not add issue", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[70vh] flex justify-center items-center">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 shadow-md rounded w-full max-w-lg"
            >
                <h2 className="text-2xl font-bold mb-4 text-center">Add Issue</h2>

                <label className="block mb-2 font-semibold">Title</label>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="input input-bordered w-full mb-3"
                    required
                />

                <label className="block mb-2 font-semibold">Category</label>
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

                <label className="block mb-2 font-semibold">Location</label>
                <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="input input-bordered w-full mb-3"
                    required
                />

                <label className="block mb-2 font-semibold">Description</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="input input-bordered w-full mb-3"
                    required
                />

                <label className="block mb-2 font-semibold">Image URL</label>
                <input
                    type="text"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    className="input input-bordered w-full mb-3"
                />

                <label className="block mb-2 font-semibold">Suggested Fix Amount</label>
                <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    className="input input-bordered w-full mb-3"
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-green-600 text-white py-2 rounded mt-3"
                >
                    {loading ? "Adding..." : "Add Issue"}
                </button>
            </form>
        </div>
    );
};

export default AddIssue;
