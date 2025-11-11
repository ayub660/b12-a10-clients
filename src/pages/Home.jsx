import React from "react";
import Banner from "./Banner";
import Categories from "./Categories";
import RecentIssues from "./RecentIssues";
import CommunityStats from "./CommunityStats";

const Home = () => {
    return (
        <div className="px-6">
            <Banner />
            <Categories />
            <RecentIssues />
            <CommunityStats />
        </div>
    );
};

export default Home;
