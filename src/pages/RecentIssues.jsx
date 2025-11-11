import React from "react";
import { recentIssuesImages } from "../assets/images";

const RecentIssues = () => {
    return (
        <div className="max-w-6xl mx-auto py-10">
            <h2 className="text-2xl font-bold mb-6">Recent Issues</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {recentIssuesImages.map((img, i) => (
                    <div key={i} className="bg-white shadow-md rounded-lg overflow-hidden">
                        <img src={img} alt={`Issue ${i}`} className="w-full h-48 object-cover" />
                        <div className="p-4">
                            <h3 className="font-semibold">Issue Title {i + 1}</h3>
                            <p className="text-sm text-gray-600 mt-1">Short description of issue...</p>
                            <button className="btn btn-sm btn-primary mt-2">See Details</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecentIssues;
