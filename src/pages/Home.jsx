import React from "react";
import Banner from "./Banner";
import Categories from "./Categories";
import RecentIssues from "./RecentIssues";
import CommunityStats from "./CommunityStats";

const Home = () => {
    return (
        <div className="bg-base-200 min-h-screen">
            <Banner />
            <Categories />
            <RecentIssues />
            <CommunityStats />
        </div>
    );
};

export default Home;
