import React from "react";
import { recentIssuesImages } from "../assets/images";

const RecentIssues = () => {
    return (
        <div className="max-w-6xl mx-auto mt-10">
            <h2 className="text-2xl font-bold mb-4">Recent Complaints</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {recentIssuesImages.map((img, idx) => (
                    <div key={idx} className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition">
                        <img src={img} alt={`issue-${idx}`} className="h-40 w-full object-cover" />
                        <div className="p-4">
                            <h3 className="font-bold text-lg">Issue Title {idx + 1}</h3>
                            <p className="text-sm text-gray-600">Short description of the issue goes here.</p>
                            <button className="btn btn-sm mt-2">See Details</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecentIssues;
