// src/Issues/AllIssues.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
// 1. Apnar api folder theke BASE_URL import kora holo
import { BASE_URL } from "../api/config";

const AllIssues = () => {
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // 2. Hardcoded URL-er poriborte `${BASE_URL}/issues` use kora hoyeche
        axios.get(`${BASE_URL}/issues`)
            .then(res => {
                if (res.data.success) {
                    setIssues(res.data.data);
                }
            })
            .catch(err => {
                console.error("Error fetching issues:", err);
            })
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[50vh]">
                <span className="loading loading-spinner loading-lg text-primary"></span>
                <div className="ml-2 text-xl font-semibold">Loading Issues...</div>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-3xl font-bold text-center my-8 text-gray-800">
                All Reported Issues
            </h2>

            {issues.length === 0 ? (
                <div className="text-center text-gray-500 text-xl mt-10">
                    No issues found at the moment.
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {issues.map(issue => (
                        <div key={issue._id} className="bg-white border p-5 rounded-xl shadow-lg hover:shadow-2xl transition duration-300">
                            {/* Image Check: Jodi image na thake, tobe placeholder dekhano bhalo */}
                            <img
                                src={issue.image || "https://via.placeholder.com/400x250?text=No+Image"}
                                alt={issue.title}
                                className="h-48 w-full object-cover rounded-lg"
                            />

                            <div className="mt-4">
                                <h3 className="text-2xl font-bold text-gray-800 line-clamp-1">
                                    {issue.title}
                                </h3>
                                <p className="text-gray-600 mt-2 line-clamp-2 h-12">
                                    {issue.description}
                                </p>

                                <div className="flex justify-between items-center mt-4 pt-4 border-t">
                                    <span className="badge badge-outline font-medium">
                                        {issue.category}
                                    </span>
                                    <Link
                                        to={`/issue/${issue._id}`}
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium transition"
                                    >
                                        See Details
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AllIssues;