// src/routes/Routes.jsx
import React from "react";
import { createBrowserRouter, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Home from "../pages/Home";
import Login from "../auth/Login";
import Register from "../auth/Register";
import NotFound from "../Error/NotFound";
import PrivateRoute from "../components/PrivateRoute";
import AddIssue from "../issues/AddIssue";
import AllIssues from "../issues/Allissues";
import IssueDetails from "../issues/IssueDetails";
import MyIssues from "../issues/MyIssues";
import MyContribution from "../issues/MyContribution";

// Layout: Navbar + Page + Footer
const Layout = () => (
    <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
            <Outlet />
        </main>
        <Footer />
    </div>
);

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            { path: "/", element: <Home /> },
            { path: "login", element: <Login /> },
            { path: "register", element: <Register /> },
            { path: "add-issue", element: <PrivateRoute><AddIssue /></PrivateRoute> },
            { path: "all-issues", element: <AllIssues /> },
            { path: "issue/:id", element: <PrivateRoute><IssueDetails /></PrivateRoute> },
            { path: "my-issues", element: <PrivateRoute><MyIssues /></PrivateRoute> },
            { path: "my-contribution", element: <PrivateRoute><MyContribution /></PrivateRoute> },
            { path: "*", element: <NotFound /> },
        ],
    },
]);
