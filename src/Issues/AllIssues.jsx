import React from "react";

const AllIssues = () => {
    // Example data, later fetch from MongoDB
    const issues = [
        { id: 1, title: "Garbage Overflow", category: "Garbage", location: "Mohakhali" },
        { id: 2, title: "Broken Road", category: "RoadDamage", location: "Dhanmondi" },
    ];

    return (
        <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            {issues.map((issue) => (
                <div key={issue.id} className="card bg-base-100 shadow-md p-4">
                    <h3 className="font-bold">{issue.title}</h3>
                    <p>Category: {issue.category}</p>
                    <p>Location: {issue.location}</p>
                    <button className="btn btn-sm btn-primary mt-2">See Details</button>
                </div>
            ))}
        </div>
    );
};

export default AllIssues;
