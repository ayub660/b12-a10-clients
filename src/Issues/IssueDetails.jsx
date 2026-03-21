// src/issues/IssueDetails.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthProvider";
import LoadingSpinner from "../components/LoadingSpinner";
// 1. BASE_URL import korun
import { BASE_URL } from "../api/config";

const IssueDetails = () => {
    const { id } = useParams();
    const { user } = useAuth();

    const [issue, setIssue] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [contributionData, setContributionData] = useState({
        name: "",
        phone: "",
        address: "",
        additionalInfo: "",
    });
    const [submitting, setSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        const fetchIssue = async () => {
            try {
                // 2. Dynamic URL use kora hoyeche
                const res = await axios.get(`${BASE_URL}/issues/${id}`);
                setIssue(res.data.data);
            } catch (err) {
                console.error("Error fetching issue details:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchIssue();
    }, [id]);

    if (loading) return <LoadingSpinner />;
    if (!issue) return <p className="text-center mt-10 text-red-500 font-semibold">Issue not found</p>;

    const handleChange = (e) => {
        setContributionData({ ...contributionData, [e.target.name]: e.target.value });
    };

    const handleSubmitContribution = async (e) => {
        e.preventDefault();
        if (!user) {
            alert("You must be logged in to contribute");
            return;
        }

        setSubmitting(true);
        try {
            // 3. Post request-eo BASE_URL use kora hoyeche
            await axios.post(`${BASE_URL}/contributions`, {
                issueId: issue._id,
                title: issue.title,
                amount: issue.amount,
                name: contributionData.name,
                email: user.email,
                phone: contributionData.phone,
                address: contributionData.address,
                additionalInfo: contributionData.additionalInfo,
                date: new Date().toISOString(),
            });

            setSuccessMessage("Contribution added successfully!");
            setContributionData({ name: "", phone: "", address: "", additionalInfo: "" });

            setTimeout(() => {
                setShowModal(false);
                setSuccessMessage("");
            }, 2000);
        } catch (err) {
            console.error("Contribution error:", err);
            setSuccessMessage("Failed to add contribution");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-xl rounded-2xl mt-10 border border-gray-100">
            {/* Issue Image */}
            <div className="relative">
                <img
                    src={issue.image || "https://via.placeholder.com/800x400?text=No+Image"}
                    alt={issue.title}
                    className="w-full h-80 object-cover rounded-xl mb-6 shadow-sm"
                />
                <div className="absolute top-4 right-4">
                    <span className={`px-4 py-1 rounded-full text-white text-sm font-bold ${issue.status === 'Ongoing' ? 'bg-orange-500' : 'bg-green-500'}`}>
                        {issue.status}
                    </span>
                </div>
            </div>

            {/* Issue Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                    <h2 className="text-3xl font-extrabold text-gray-800 mb-4">{issue.title}</h2>
                    <p className="text-gray-700 leading-relaxed text-lg mb-6">
                        <strong className="text-gray-900">Description:</strong><br />
                        {issue.description}
                    </p>

                    <div className="flex flex-wrap gap-4 mb-6">
                        <div className="bg-blue-50 px-4 py-2 rounded-lg">
                            <p className="text-sm text-blue-600 font-bold uppercase">Category</p>
                            <p className="text-gray-800 font-medium">{issue.category}</p>
                        </div>
                        <div className="bg-green-50 px-4 py-2 rounded-lg">
                            <p className="text-sm text-green-600 font-bold uppercase">Suggested Budget</p>
                            <p className="text-gray-800 font-medium">${issue.amount}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-xl h-fit border border-gray-200">
                    <h4 className="font-bold text-gray-800 mb-2">Location</h4>
                    <p className="text-gray-600 mb-4">{issue.location}</p>

                    <button
                        onClick={() => setShowModal(true)}
                        className="w-full bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition-all shadow-md active:scale-95"
                    >
                        Pay Contribution
                    </button>
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
                    <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl relative animate-in fade-in zoom-in duration-200">
                        <h3 className="text-2xl font-bold mb-2 text-center text-gray-800">Contribute</h3>
                        <p className="text-center text-gray-500 mb-6">Support the cleanup for "{issue.title}"</p>

                        {successMessage && (
                            <div className={`px-4 py-2 rounded-lg mb-4 text-center font-medium ${successMessage.includes('Success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                {successMessage}
                            </div>
                        )}

                        <form onSubmit={handleSubmitContribution} className="space-y-4">
                            <div className="form-control">
                                <label className="label-text mb-1 font-semibold text-gray-700">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Enter your name"
                                    value={contributionData.name}
                                    onChange={handleChange}
                                    required
                                    className="input input-bordered w-full focus:outline-green-500"
                                />
                            </div>

                            <div className="form-control">
                                <label className="label-text mb-1 font-semibold text-gray-700">Email (Verified)</label>
                                <input
                                    type="email"
                                    value={user?.email || ""}
                                    readOnly
                                    className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
                                />
                            </div>

                            <div className="form-control">
                                <label className="label-text mb-1 font-semibold text-gray-700">Phone</label>
                                <input
                                    type="text"
                                    name="phone"
                                    placeholder="Phone Number"
                                    value={contributionData.phone}
                                    onChange={handleChange}
                                    required
                                    className="input input-bordered w-full focus:outline-green-500"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={submitting}
                                className="w-full bg-green-600 text-white py-3 rounded-xl font-bold hover:bg-green-700 transition-all disabled:bg-gray-400 mt-4 shadow-lg"
                            >
                                {submitting ? "Processing..." : `Confirm Payment $${issue.amount}`}
                            </button>
                        </form>

                        <button
                            onClick={() => setShowModal(false)}
                            className="mt-4 w-full text-gray-400 hover:text-gray-600 font-medium transition"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default IssueDetails;