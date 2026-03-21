// src/issues/MyIssues.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthProvider";
import LoadingSpinner from "../components/LoadingSpinner";
import { BASE_URL } from "../api/config"; // BASE_URL import korun

const MyIssues = () => {
    const { user } = useAuth();
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(true);

    const [editingIssue, setEditingIssue] = useState(null);
    const [deletingIssue, setDeletingIssue] = useState(null);
    const [newTitle, setNewTitle] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);

    // Fetch user's issues
    const fetchIssues = async () => {
        if (!user?.email) return;
        setLoading(true);
        try {
            const res = await axios.get(`${BASE_URL}/my-issues/${user.email}`);
            if (res.data.success) {
                setIssues(res.data.data);
            }
        } catch (err) {
            console.error("Error fetching issues:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchIssues();
    }, [user?.email]);

    // Edit handlers
    const handleEditClick = (issue) => {
        setEditingIssue(issue);
        setNewTitle(issue.title);
    };

    const handleUpdateSubmit = async () => {
        if (!newTitle.trim()) return;
        setIsProcessing(true);
        try {
            const res = await axios.put(`${BASE_URL}/issues/${editingIssue._id}`, {
                title: newTitle
            });

            if (res.data.success) {
                setIssues(
                    issues.map((i) =>
                        i._id === editingIssue._id ? { ...i, title: newTitle } : i
                    )
                );
                setEditingIssue(null);
            }
        } catch (err) {
            console.error("Update failed:", err);
        } finally {
            setIsProcessing(false);
        }
    };

    // Delete handlers
    const handleDeleteConfirm = async () => {
        setIsProcessing(true);
        try {
            const res = await axios.delete(`${BASE_URL}/issues/${deletingIssue._id}`);
            if (res.data.success) {
                setIssues(issues.filter((i) => i._id !== deletingIssue._id));
                setDeletingIssue(null);
            }
        } catch (err) {
            console.error("Delete failed:", err);
        } finally {
            setIsProcessing(false);
        }
    };

    if (loading) return <LoadingSpinner />;

    return (
        <div className="max-w-6xl mx-auto p-6 min-h-screen">
            <div className="mb-8">
                <h2 className="text-3xl font-extrabold text-gray-800">My Reported Issues</h2>
                <p className="text-gray-500">Manage and track the issues you've reported in the city.</p>
            </div>

            {issues.length === 0 ? (
                <div className="bg-white p-10 rounded-2xl shadow-sm border text-center">
                    <p className="text-gray-400 text-lg italic">No issues found. Start by reporting a problem!</p>
                </div>
            ) : (
                <div className="overflow-hidden bg-white shadow-xl rounded-2xl border border-gray-100">
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-sm text-gray-700">
                            <thead className="bg-gray-50 border-b border-gray-100 text-gray-600 uppercase text-xs font-bold">
                                <tr>
                                    <th className="py-4 px-6 text-left">Issue Title</th>
                                    <th className="py-4 px-6 text-left">Category</th>
                                    <th className="py-4 px-6 text-left">Status</th>
                                    <th className="py-4 px-6 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {issues.map((issue) => (
                                    <tr key={issue._id} className="hover:bg-green-50/30 transition duration-150">
                                        <td className="py-4 px-6 font-semibold text-gray-800">{issue.title}</td>
                                        <td className="py-4 px-6">
                                            <span className="bg-gray-100 px-2 py-1 rounded text-gray-600 text-xs">{issue.category}</span>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-bold tracking-wide shadow-sm ${issue.status === "Pending"
                                                        ? "bg-amber-100 text-amber-700"
                                                        : issue.status === "Resolved"
                                                            ? "bg-green-100 text-green-700"
                                                            : "bg-red-100 text-red-700"
                                                    }`}
                                            >
                                                {issue.status}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 text-center">
                                            <div className="flex justify-center gap-2">
                                                <button
                                                    onClick={() => handleEditClick(issue)}
                                                    className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition shadow-sm"
                                                    title="Edit Title"
                                                >
                                                    <span className="text-sm px-1 font-medium">✏️ Edit</span>
                                                </button>
                                                <button
                                                    onClick={() => setDeletingIssue(issue)}
                                                    className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition shadow-sm"
                                                    title="Delete Issue"
                                                >
                                                    <span className="text-sm px-1 font-medium">🗑️ Delete</span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Edit Modal */}
            {editingIssue && (
                <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-black/40 z-50 p-4">
                    <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-md animate-in zoom-in duration-200">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-gray-800">Update Issue Title</h3>
                            <button onClick={() => setEditingIssue(null)} className="text-gray-400 hover:text-gray-600">✕</button>
                        </div>
                        <input
                            type="text"
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                            placeholder="Enter new title"
                            className="w-full border-2 border-gray-100 rounded-xl px-4 py-3 mb-6 focus:outline-none focus:border-green-500 transition-all"
                        />
                        <div className="flex gap-3">
                            <button
                                onClick={() => setEditingIssue(null)}
                                className="flex-1 px-4 py-3 bg-gray-100 text-gray-600 rounded-xl font-bold hover:bg-gray-200 transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleUpdateSubmit}
                                disabled={isProcessing}
                                className="flex-1 px-4 py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 shadow-lg disabled:bg-gray-400 transition"
                            >
                                {isProcessing ? "Saving..." : "Save Changes"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Modal */}
            {deletingIssue && (
                <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-black/40 z-50 p-4">
                    <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-sm text-center animate-in zoom-in duration-200">
                        <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                            ⚠️
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">Are you sure?</h3>
                        <p className="text-gray-500 mb-6 px-2">
                            Do you really want to delete <span className="font-bold text-gray-700 italic">"{deletingIssue.title}"</span>? This action cannot be undone.
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setDeletingIssue(null)}
                                className="flex-1 px-4 py-3 bg-gray-100 text-gray-600 rounded-xl font-bold hover:bg-gray-200 transition"
                            >
                                No, Keep it
                            </button>
                            <button
                                onClick={handleDeleteConfirm}
                                disabled={isProcessing}
                                className="flex-1 px-4 py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 shadow-lg disabled:bg-gray-400 transition"
                            >
                                {isProcessing ? "Deleting..." : "Yes, Delete"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyIssues;