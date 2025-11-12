import React, { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const Navbar = () => {
    const { user, logoutUser } = useAuth();
    const [showMenu, setShowMenu] = useState(false);
    const navigate = useNavigate();

    const handleAddIssueClick = () => {
        if (user) {
            navigate("/add-issue"); // লগিন থাকলে AddIssue page
        } else {
            navigate("/login"); // না থাকলে login page
        }
    };

    return (
        <nav className="bg-white shadow sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold text-green-600">CleanCity</Link>

                {/* Middle Links */}
                <div className="flex gap-6">
                    <NavLink to="/" className={({ isActive }) => isActive ? "text-green-600 font-semibold" : "text-gray-700"}>Home</NavLink>
                    <NavLink to="/all-issues" className={({ isActive }) => isActive ? "text-green-600 font-semibold" : "text-gray-700"}>Issues</NavLink>
                    <button
                        onClick={handleAddIssueClick}
                        className="text-gray-700 font-semibold hover:text-green-600"
                    >
                        Add Issue
                    </button>
                    {user && <>
                        <NavLink to="/my-issues" className={({ isActive }) => isActive ? "text-green-600 font-semibold" : "text-gray-700"}>My Issues</NavLink>
                        <NavLink to="/my-contributions" className={({ isActive }) => isActive ? "text-green-600 font-semibold" : "text-gray-700"}>My Contributions</NavLink>
                    </>}
                </div>

                {/* Right */}
                <div className="flex items-center gap-4">
                    {user ? (
                        <div className="relative">
                            <img
                                onClick={() => setShowMenu(!showMenu)}
                                src={user.photoURL || "https://i.ibb.co/2W7tS6s/avatar.png"}
                                alt="avatar"
                                className="w-12 h-12 rounded-full object-cover cursor-pointer border-2 border-green-600"
                            />
                            {showMenu && (
                                <div className="absolute right-0 mt-2 bg-white shadow-lg rounded p-2 w-40">
                                    <p className="text-gray-600 px-2 truncate">{user.displayName}</p>
                                    <button onClick={logoutUser} className="w-full text-left px-2 py-1 hover:bg-gray-100 text-red-500">Logout</button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <>
                            <NavLink to="/login" className="px-3 py-1 bg-green-600 text-white rounded">Login</NavLink>
                            <NavLink to="/register" className="px-3 py-1 border border-green-600 text-green-600 rounded">Register</NavLink>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
