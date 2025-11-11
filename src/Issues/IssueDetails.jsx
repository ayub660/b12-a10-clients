import React from "react";
import { useParams } from "react-router-dom";

const IssueDetails = () => {
    const { id } = useParams();
    // Fetch issue by id from API
    const issue = {
        title: "Garbage Overflow",
        category: "Garbage",
        location: "Mohakhali",
        description: "Garbage not collected for 5 days",
        image: "https://i.ibb.co/S4syjP5b/photo-1673203300654-d973e8944910.jpg",
        date: "2025-10-26",
        amount: 200,
    };

    return (
        <div className="p-4 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-2">{issue.title}</h2>
            <img src={issue.image} alt={issue.title} className="w-full h-64 object-cover mb-4" />
            <p>Category: {issue.category}</p>
            <p>Location: {issue.location}</p>
            <p>Description: {issue.description}</p>
            <p>Date: {issue.date}</p>
            <p>Suggested Budget: ${issue.amount}</p>
            <button className="btn btn-primary mt-4">Pay Cleanup Contribution</button>
        </div>
    );
};

export default IssueDetails;
