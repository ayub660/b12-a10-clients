// src/components/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-gray-100 py-6 mt-10">
            <div className="max-w-7xl mx-auto text-center">
                <h1 className="text-xl font-bold text-green-600 mb-2">CleanCity</h1>
                <p className="text-gray-600 mb-2">A Community Cleanliness & Issue Reporting Portal</p>
                <p className="text-gray-500 mb-2">&copy; 2025 CleanCity. All rights reserved.</p>
                <div className="flex justify-center gap-4">
                    <Link to="/" className="text-gray-700 hover:text-green-600">Home</Link>
                    <Link to="/all-issues" className="text-gray-700 hover:text-green-600">All Issues</Link>
                    <Link to="/my-issues" className="text-gray-700 hover:text-green-600">My Issues</Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
