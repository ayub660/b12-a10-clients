import React from "react";
import Banner from "./Banner";
import Categories from "./Categories";
import RecentIssues from "./RecentIssues";

const Home = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 mt-2">
            {/* Slider */}
            <Banner />

            {/* Category Section */}
            <Categories />

            {/* Recent Complaints */}
            <RecentIssues />
        </div>
    );
};

export default Home;
