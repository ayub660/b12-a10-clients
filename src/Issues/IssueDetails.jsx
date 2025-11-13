import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const IssueDetails = () => {
    const { id } = useParams();
    const [issue, setIssue] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`http://localhost:3500/issues/${id}`)
            .then(res => {
                if (res.data.success) setIssue(res.data.data);
            })
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) return <div className="text-center mt-20">Loading...</div>;
    if (!issue) return <div className="text-center mt-20">Issue not found</div>;

    return (
        <div className="max-w-3xl mx-auto mt-6 p-4 border rounded shadow">
            <img src={issue.image} alt={issue.title} className="w-full h-64 object-cover rounded" />
            <h2 className="text-2xl font-bold mt-4">{issue.title}</h2>
            <p><strong>Category:</strong> {issue.category}</p>
            <p><strong>Location:</strong> {issue.location}</p>
            <p><strong>Description:</strong> {issue.description}</p>
            <p><strong>Date:</strong> {new Date(issue.date).toLocaleDateString()}</p>
            <p><strong>Suggested Budget:</strong> ${issue.amount}</p>
            <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded">
                Pay Cleanup Contribution
            </button>
        </div>
    );
};

export default IssueDetails;
