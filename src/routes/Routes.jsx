// src/routes/Routes.jsx
import React, { useEffect } from "react";
import { createBrowserRouter, Outlet, useLocation, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PrivateRoute from "../components/PrivateRoute";

// Pages
import Home from "../pages/Home";
import Login from "../auth/Login";
import Register from "../auth/Register";
import ForgotPassword from "../auth/ForgotPassword";
import NotFound from "../Error/NotFound";
import AddIssue from "../issues/AddIssue";
import AllIssues from "../issues/Allissues";
import IssueDetails from "../issues/IssueDetails";
import MyIssues from "../issues/MyIssues";
import MyContribution from "../issues/MyContribution";

// Layout Component
const Layout = () => {
    const location = useLocation();
    const params = useParams();

    useEffect(() => {
        // Mapping routes to titles
        const titleMap = {
            "/": "Home | Clean City",
            "/login": "Login | Clean City",
            "/register": "Register | Clean City",
            "/forgot-password": "Forgot Password | Clean City",
            "/all-issues": "All Issues | Clean City",
            "/add-issue": "Add Issue | Clean City",
            "/my-issues": "My Issues | Clean City",
            "/my-contributions": "My Contributions | Clean City",
        };

        // Handle dynamic route for issue details
        if (location.pathname.startsWith("/issue/")) {
            document.title = `Issue Details | Clean City`;
        } else {
            document.title = titleMap[location.pathname] || "Clean City";
        }
    }, [location]);

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

// Routes
export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            // Public Pages
            { path: "/", element: <Home /> },
            { path: "login", element: <Login /> },
            { path: "register", element: <Register /> },
            { path: "forgot-password", element: <ForgotPassword /> },
            { path: "all-issues", element: <AllIssues /> },

            // Private Pages
            { path: "add-issue", element: <PrivateRoute><AddIssue /></PrivateRoute> },
            { path: "issue/:id", element: <PrivateRoute><IssueDetails /></PrivateRoute> },
            { path: "my-issues", element: <PrivateRoute><MyIssues /></PrivateRoute> },
            { path: "my-contributions", element: <PrivateRoute><MyContribution /></PrivateRoute> },

            // 404
            { path: "*", element: <NotFound /> },
        ],
    },
]);
