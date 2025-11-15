// src/issues/IssueDetails.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthProvider";
import LoadingSpinner from "../components/LoadingSpinner";

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
                const res = await axios.get(`https://cleancity-project.vercel.app/issues/${id}`);
                setIssue(res.data.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchIssue();
    }, [id]);

    if (loading) return <LoadingSpinner />;
    if (!issue) return <p className="text-center mt-10">Issue not found</p>;

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
            await axios.post("https://cleancity-project.vercel.app/contributions", {
                issueId: issue._id,
                title: issue.title,
                amount: issue.amount,
                name: contributionData.name,
                email: user.email,
                phone: contributionData.phone,
                address: contributionData.address,
                additionalInfo: contributionData.additionalInfo,
                date: new Date(),
            });

            setSuccessMessage("Contribution added successfully!");
            setContributionData({ name: "", phone: "", address: "", additionalInfo: "" });

            setTimeout(() => {
                setShowModal(false);
                setSuccessMessage("");
            }, 2000);
        } catch (err) {
            console.error(err);
            setSuccessMessage("Failed to add contribution");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded-lg mt-6">
            {/* Issue Image */}
            {issue.image && (
                <img
                    src={issue.image}
                    alt={issue.title}
                    className="w-full h-64 object-cover rounded mb-4"
                />
            )}

            {/* Issue Info */}
            <div className="mb-4">
                <h2 className="text-2xl font-bold mb-2">{issue.title}</h2>
                <p className="text-gray-600 mb-1"><strong>Category:</strong> {issue.category}</p>
                <p className="text-gray-600 mb-1"><strong>Location:</strong> {issue.location}</p>
                <p className="text-gray-600 mb-2"><strong>Description:</strong> {issue.description}</p>
                <p className="text-gray-600 mb-2"><strong>Suggested Budget:</strong> ${issue.amount}</p>
            </div>

            {/* Pay Cleanup Contribution Button */}
            <button
                onClick={() => setShowModal(true)}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
            >
                Pay Cleanup Contribution
            </button>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg relative">
                        <h3 className="text-xl font-semibold mb-4 text-center">Contribute to Cleanup</h3>

                        {/* Issue Image */}
                        {issue.image && (
                            <img
                                src={issue.image}
                                alt={issue.title}
                                className="w-full h-48 object-cover rounded mb-4"
                            />
                        )}

                        {/* Success Message */}
                        {successMessage && (
                            <div className="bg-green-100 text-green-800 px-3 py-2 rounded mb-3 text-center">
                                {successMessage}
                            </div>
                        )}

                        {/* Contribution Form */}
                        <form onSubmit={handleSubmitContribution} className="space-y-3">
                            <input
                                type="text"
                                name="name"
                                placeholder="Your Name"
                                value={contributionData.name}
                                onChange={handleChange}
                                required
                                className="input input-bordered w-full"
                            />
                            <input
                                type="email"
                                value={user.email}
                                readOnly
                                className="input input-bordered w-full bg-gray-100"
                            />
                            <input
                                type="text"
                                name="phone"
                                placeholder="Phone Number"
                                value={contributionData.phone}
                                onChange={handleChange}
                                required
                                className="input input-bordered w-full"
                            />
                            <input
                                type="text"
                                name="address"
                                placeholder="Address"
                                value={contributionData.address}
                                onChange={handleChange}
                                className="input input-bordered w-full"
                            />
                            <textarea
                                name="additionalInfo"
                                placeholder="Additional Info"
                                value={contributionData.additionalInfo}
                                onChange={handleChange}
                                className="input input-bordered w-full"
                            ></textarea>

                            <button
                                type="submit"
                                disabled={submitting}
                                className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
                            >
                                {submitting ? "Submitting..." : `Pay $${issue.amount}`}
                            </button>
                        </form>

                        {/* Close Button */}
                        <button
                            onClick={() => setShowModal(false)}
                            className="mt-3 text-gray-600 hover:underline absolute top-3 right-4"
                        >
                            ✕
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default IssueDetails;