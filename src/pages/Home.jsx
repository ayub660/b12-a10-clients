// src/pages/Home.jsx
import React from "react";
import Banner from "./Banner"; // <-- pages folder থেকে
import Categories from "./Categories";
import RecentIssues from "./RecentIssues";

const Home = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 mt-2">
            <Banner />
            <Categories />
            <RecentIssues />
        </div>
    );
};

export default Home;
