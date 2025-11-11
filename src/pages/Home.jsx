import Banner from "./Banner";
import Categories from "./Categories";
import RecentIssues from "./RecentIssues";
import CommunityStats from "./CommunityStats";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const Home = () => {
    return (
        <>
            <Navbar />
            <Banner />
            <Categories />
            <RecentIssues />
            <CommunityStats />
            <Footer />
        </>
    );
};

export default Home;
