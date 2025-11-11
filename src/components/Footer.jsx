import React from "react";

const Footer = () => {
    return (
        <footer className="bg-base-100 shadow-inner py-6 mt-10">
            <div className="max-w-6xl mx-auto text-center text-gray-500">
                &copy; {new Date().getFullYear()} CleanCity. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
