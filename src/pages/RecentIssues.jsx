import React from "react";
import { recentIssuesImages } from "../assets/images";

const RecentIssues = () => {
    return (
        <div className="mt-6">
            <h2 className="text-2xl font-bold mb-4">Recent Complaints</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {recentIssuesImages.map((img, index) => (
                    <div key={index} className="bg-white shadow rounded overflow-hidden">
                        <img src={img} alt={`issue-${index}`} className="w-full h-44 object-cover" />
                        <div className="p-3">
                            <h3 className="text-lg font-semibold">Issue Title {index + 1}</h3>
                            <p className="text-gray-600 text-sm">Short description of the issue...</p>
                            <button className="mt-2 px-3 py-1 bg-green-600 text-white rounded text-sm">
                                See Details
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecentIssues;
