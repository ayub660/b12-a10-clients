// src/issues/MyIssues.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthProvider";
import LoadingSpinner from "../components/LoadingSpinner";

const MyIssues = () => {
    const { user } = useAuth();
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(true);

    const [editingIssue, setEditingIssue] = useState(null);
    const [deletingIssue, setDeletingIssue] = useState(null);
    const [newTitle, setNewTitle] = useState("");

    // ✅ Fetch user's issues
    const fetchIssues = async () => {
        try {
            const res = await axios.get(`http://localhost:3500/my-issues/${user.email}`);
            setIssues(res.data.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user?.email) fetchIssues();
    }, [user]);

    // ✅ Edit Modal Handlers
    const handleEditClick = (issue) => {
        setEditingIssue(issue);
        setNewTitle(issue.title);
    };

    const handleUpdateSubmit = async () => {
        if (!newTitle.trim()) return;
        try {
            await axios.put(`http://localhost:3500/issues/${editingIssue._id}`, { title: newTitle });
            setIssues(
                issues.map((i) => (i._id === editingIssue._id ? { ...i, title: newTitle } : i))
            );
            setEditingIssue(null);
        } catch (err) {
            console.error(err);
        }
    };

    // ✅ Delete Modal Handlers
    const handleDeleteConfirm = async () => {
        try {
            await axios.delete(`http://localhost:3500/issues/${deletingIssue._id}`);
            setIssues(issues.filter((i) => i._id !== deletingIssue._id));
            setDeletingIssue(null);
        } catch (err) {
            console.error(err);
        }
    };

    if (loading) return <LoadingSpinner />;

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
                My Reported Issues
            </h2>

            {issues.length === 0 ? (
                <p className="text-center text-gray-600">No issues found.</p>
            ) : (
                <div className="overflow-x-auto bg-white shadow-lg rounded-xl">
                    <table className="min-w-full text-sm text-gray-700">
                        <thead className="bg-gradient-to-r from-green-500 to-emerald-600 text-white uppercase text-xs font-semibold tracking-wider">
                            <tr>
                                <th className="py-3 px-4 text-left">Title</th>
                                <th className="py-3 px-4 text-left">Category</th>
                                <th className="py-3 px-4 text-left">Status</th>
                                <th className="py-3 px-4 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {issues.map((issue, index) => (
                                <tr
                                    key={issue._id}
                                    className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"
                                        } hover:bg-gray-100 transition`}
                                >
                                    <td className="py-3 px-4 font-medium">{issue.title}</td>
                                    <td className="py-3 px-4">{issue.category}</td>
                                    <td className="py-3 px-4">
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-semibold ${issue.status === "Pending"
                                                ? "bg-yellow-100 text-yellow-800"
                                                : issue.status === "Resolved"
                                                    ? "bg-green-100 text-green-800"
                                                    : "bg-red-100 text-red-800"
                                                }`}
                                        >
                                            {issue.status}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4 text-center space-x-2">
                                        <button
                                            onClick={() => handleEditClick(issue)}
                                            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg shadow-sm transition"
                                        >
                                            ✏️ Edit
                                        </button>
                                        <button
                                            onClick={() => setDeletingIssue(issue)}
                                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg shadow-sm transition"
                                        >
                                            🗑️ Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* 🔹 Edit Modal */}
            {editingIssue && (
                <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/50 z-50 animate-fadeIn">
                    <div className="bg-white p-6 rounded-2xl shadow-2xl w-96 transform transition-all scale-100 hover:scale-[1.02]">
                        <h3 className="text-lg font-semibold mb-4 text-center text-gray-800">
                            ✏️ Edit Issue
                        </h3>
                        <input
                            type="text"
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        <div className="flex justify-end space-x-2">
                            <button
                                onClick={() => setEditingIssue(null)}
                                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleUpdateSubmit}
                                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 shadow-md"
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* 🔻 Delete Confirmation Modal */}
            {deletingIssue && (
                <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/50 z-50 animate-fadeIn">
                    <div className="bg-white p-6 rounded-2xl shadow-2xl w-80 text-center">
                        <h3 className="text-lg font-semibold mb-3 text-gray-800">
                            ⚠️ Confirm Delete
                        </h3>
                        <p className="text-sm text-gray-600 mb-4">
                            Are you sure you want to delete{" "}
                            <span className="font-semibold text-red-500">
                                "{deletingIssue.title}"
                            </span>
                            ?
                        </p>
                        <div className="flex justify-center space-x-3">
                            <button
                                onClick={() => setDeletingIssue(null)}
                                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDeleteConfirm}
                                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 shadow-md"
                            >
                                Yes, Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyIssues;
