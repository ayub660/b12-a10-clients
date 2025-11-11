import React from "react";

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white text-center p-6 mt-10">
            <h1 className="text-xl font-bold">CleanCity</h1>
            <p className="mt-2">Your community cleanliness and issue reporting portal.</p>
            <p className="mt-1 text-sm">© 2025 CleanCity. All rights reserved.</p>
            <div className="flex justify-center mt-3 space-x-4">
                <a href="/" className="hover:underline">Home</a>
                <a href="/all-issues" className="hover:underline">All Issues</a>
                <a href="/add-issue" className="hover:underline">Add Issue</a>
            </div>
        </footer>
    );
};

export default Footer;
