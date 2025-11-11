import React from "react";

const CommunityStats = () => {
    return (
        <div className="max-w-6xl mx-auto mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-4 bg-green-100 rounded-lg shadow">
                <h2 className="text-xl font-bold">Users</h2>
                <p className="text-2xl font-semibold">1200+</p>
            </div>
            <div className="p-4 bg-blue-100 rounded-lg shadow">
                <h2 className="text-xl font-bold">Issues Reported</h2>
                <p className="text-2xl font-semibold">850+</p>
            </div>
            <div className="p-4 bg-yellow-100 rounded-lg shadow">
                <h2 className="text-xl font-bold">Issues Resolved</h2>
                <p className="text-2xl font-semibold">500+</p>
            </div>
            <div className="p-4 bg-red-100 rounded-lg shadow">
                <h2 className="text-xl font-bold">Pending Issues</h2>
                <p className="text-2xl font-semibold">350+</p>
            </div>
        </div>
    );
};

export default CommunityStats;
