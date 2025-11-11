import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { toast } from "react-toastify";

const AddIssue = () => {
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        title: "",
        category: "",
        location: "",
        description: "",
        image: "",
        amount: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // API call to save issue in MongoDB
        toast.success("Issue submitted successfully!");
    };

    if (!user) return <p>Please login to add an issue.</p>;

    return (
        <div className="p-4 max-w-xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Add New Issue</h2>
            <form onSubmit={handleSubmit} className="space-y-3">
                <input name="title" placeholder="Title" value={formData.title} onChange={handleChange} className="input input-bordered w-full" />
                <select name="category" value={formData.category} onChange={handleChange} className="select select-bordered w-full">
                    <option value="">Select Category</option>
                    <option value="Garbage">Garbage</option>
                    <option value="IllegalConstruction">Illegal Construction</option>
                    <option value="BrokenProperty">Broken Property</option>
                    <option value="RoadDamage">Road Damage</option>
                </select>
                <input name="location" placeholder="Location" value={formData.location} onChange={handleChange} className="input input-bordered w-full" />
                <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="textarea textarea-bordered w-full"></textarea>
                <input name="image" placeholder="Image URL" value={formData.image} onChange={handleChange} className="input input-bordered w-full" />
                <input name="amount" placeholder="Suggested Budget" value={formData.amount} onChange={handleChange} className="input input-bordered w-full" />
                <button type="submit" className="btn btn-primary w-full">Submit Issue</button>
            </form>
        </div>
    );
};

export default AddIssue;
