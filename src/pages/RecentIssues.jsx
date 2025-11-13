import React, { useEffect, useState } from "react";

const RecentIssues = () => {
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:3500/issues") // backend route
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setIssues(data.data); // real data from MongoDB
                }
            })
            .catch((err) => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <p>Loading recent issues...</p>;
    if (!issues.length) return <p>No recent issues found.</p>;

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            {issues.map((issue) => (
                <div key={issue._id} className="border p-4 rounded shadow">
                    <img src={issue.image} alt={issue.title} className="h-40 w-full object-cover rounded" />
                    <h3 className="font-bold mt-2">{issue.title}</h3>
                    <p className="text-gray-600">{issue.description}</p>
                    <button
                        onClick={() => window.location.href = `/issue/${issue._id}`}
                        className="mt-2 px-3 py-1 bg-green-600 text-white rounded"
                    >
                        See Details
                    </button>
                </div>
            ))}
        </div>
    );
};

export default RecentIssues;
