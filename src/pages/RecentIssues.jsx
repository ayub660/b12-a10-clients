// src/pages/RecentIssues.jsx
import React, { useEffect, useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";

const RecentIssues = () => {
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:3500/issues")
            .then((res) => res.json())
            .then((data) => {
                if (data.success) setIssues(data.data);
            })
            .catch((err) => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <LoadingSpinner />;
    if (!issues.length) return <p className="text-center mt-6">No recent issues found.</p>;

    return (
        <section className="mt-12 max-w-7xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-800">
                Recent Issues
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {issues.map((issue) => (
                    <div
                        key={issue._id}
                        className="bg-white rounded-xl shadow-lg overflow-hidden transform transition hover:scale-105 hover:shadow-2xl cursor-pointer"
                    >
                        <img
                            src={issue.image || "https://via.placeholder.com/400x200?text=No+Image"}
                            alt={issue.title}
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                            <h3 className="font-bold text-lg text-gray-800 mb-2">{issue.title}</h3>
                            <p className="text-gray-600 mb-4 line-clamp-3">{issue.description}</p>
                            <button
                                onClick={() => window.location.href = `/issue/${issue._id}`}
                                className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
                            >
                                See Details
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default RecentIssues;
