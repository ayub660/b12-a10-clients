import React from "react";

const statsData = [
    { title: "Total Users", value: 120 },
    { title: "Issues Resolved", value: 87 },
    { title: "Issues Pending", value: 33 },
];

const CommunityStats = () => {
    return (
        <div className="max-w-6xl mx-auto py-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {statsData.map((stat, i) => (
                <div key={i} className="bg-white shadow-md rounded-lg p-6 text-center">
                    <h3 className="text-xl font-semibold">{stat.value}</h3>
                    <p className="text-gray-600 mt-2">{stat.title}</p>
                </div>
            ))}
        </div>
    );
};

export default CommunityStats;
