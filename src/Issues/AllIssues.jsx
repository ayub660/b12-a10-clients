import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const AllIssues = () => {
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get("https://cleancity-project.vercel.app/issues")
            .then(res => {
                if (res.data.success) {
                    setIssues(res.data.data);
                }
            })
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <div className="text-center mt-20">Loading...</div>;

    return (
        <div className="grid grid-cols-3 gap-6 mt-6">
            {issues.map(issue => (
                <div key={issue._id} className="border p-4 rounded shadow-md">
                    <img src={issue.image} alt={issue.title} className="h-40 w-full object-cover rounded" />
                    <h3 className="text-xl font-bold mt-2">{issue.title}</h3>
                    <p className="text-gray-600">{issue.description}</p>
                    <Link to={`/issue/${issue._id}`} className="inline-block mt-2 bg-blue-600 text-white px-4 py-2 rounded">
                        See Details
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default AllIssues;
