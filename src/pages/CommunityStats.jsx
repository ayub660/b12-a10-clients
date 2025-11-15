import React from "react";

const CommunityStats = () => (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        <div className="card bg-base-200 p-4 text-center">
            <h3 className="text-2xl font-bold">125</h3>
            <p>Issues Resolved</p>
        </div>
        <div className="card bg-base-200 p-4 text-center">
            <h3 className="text-2xl font-bold">78</h3>
            <p>Active Contributors</p>
        </div>
        <div className="card bg-base-200 p-4 text-center">
            <h3 className="text-2xl font-bold">24</h3>
            <p>Ongoing Issues</p>
        </div>
    </section>
);

export default CommunityStats;