// src/components/Navbar.jsx
import React, { useState, useEffect } from "react";
import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const Navbar = () => {
    const { user, logout } = useAuth();
    const [showAvatarMenu, setShowAvatarMenu] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [darkMode, setDarkMode] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    // Toggle theme function
    const toggleTheme = (checked) => {
        const html = document.querySelector("html");

        if (checked) {
            html.setAttribute("data-theme", "dark");
            localStorage.setItem("theme", "dark");
        } else {
            html.setAttribute("data-theme", "light");
            localStorage.setItem("theme", "light");
        }
    };

    // Load saved theme from localStorage
    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        const html = document.querySelector("html");

        if (savedTheme === "dark") {
            setDarkMode(true);
            html.setAttribute("data-theme", "dark");
        } else {
            setDarkMode(false);
            html.setAttribute("data-theme", "light");
        }
    }, []);

    // Active link style
    const navLinkClass = (path) =>
        location.pathname === path
            ? "text-green-500 font-semibold"
            : "text-gray-700 dark:text-gray-300";

    const handleAddIssueClick = () => {
        if (user) navigate("/add-issue");
        else navigate("/login");
    };

    return (
        <nav className="bg-white dark:bg-gray-900 shadow sticky top-0 z-50 transition-all">
            <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">

                {/* Logo */}
                <Link to="/" className="text-2xl font-bold text-green-600 dark:text-green-400">
                    CleanCity
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex gap-6 items-center">
                    <NavLink to="/" className={navLinkClass("/")}>Home</NavLink>
                    <NavLink to="/all-issues" className={navLinkClass("/all-issues")}>Issues</NavLink>

                    <button
                        onClick={handleAddIssueClick}
                        className="text-gray-700 dark:text-gray-300 font-semibold hover:text-green-600"
                    >
                        Add Issue
                    </button>

                    {user && (
                        <>
                            <NavLink to="/my-issues" className={navLinkClass("/my-issues")}>My Issues</NavLink>
                            <NavLink to="/my-contributions" className={navLinkClass("/my-contributions")}>
                                My Contributions
                            </NavLink>
                        </>
                    )}
                </div>

                {/* Desktop Right */}
                <div className="hidden md:flex items-center gap-4">

                    {/* Beautiful Sun/Moon Toggle */}
                    <label className="swap swap-rotate cursor-pointer">
                        <input
                            type="checkbox"
                            checked={darkMode}
                            onChange={(e) => {
                                setDarkMode(e.target.checked);
                                toggleTheme(e.target.checked);
                            }}
                        />

                        {/* Sun */}
                        <svg
                            className="swap-on fill-yellow-400 w-8 h-8"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                        >
                            <path d="M5 12a7 7 0 1114 0A7 7 0 015 12zm7-9a1 1 0 011 1v2a1 1 0 11-2 0V4a1 1 0 011-1zm0 18a1 1 0 011 1v2a1 1 0 11-2 0v-2a1 1 0 011-1zM4 11H2a1 1 0 100 2h2a1 1 0 000-2zm18 0h-2a1 1 0 100 2h2a1 1 0 000-2zM6.343 6.343a1 1 0 011.414 0L9.17 7.757a1 1 0 11-1.414 1.414L6.343 7.757a1 1 0 010-1.414zM17.657 17.657a1 1 0 011.414 0l1.414 1.414a1 1 0 01-1.414 1.414l-1.414-1.414a1 1 0 010-1.414zm0-11.314L19.07 5.93a1 1 0 01-1.414 1.414l-1.414-1.414a1 1 0 111.414-1.414zM7.757 17.657a1 1 0 010 1.414l-1.414 1.414a1 1 0 11-1.414-1.414l1.414-1.414a1 1 0 011.414 0z" />
                        </svg>

                        {/* Moon */}
                        <svg
                            className="swap-off fill-gray-200 w-8 h-8"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                        >
                            <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
                        </svg>
                    </label>

                    {/* Avatar/Login */}
                    {user ? (
                        <div className="relative">
                            <img
                                onClick={() => setShowAvatarMenu(!showAvatarMenu)}
                                src={user.photoURL || "https://i.ibb.co/2W7tS6s/avatar.png"}
                                className="w-10 h-10 rounded-full border-2 border-green-600 dark:border-green-400 cursor-pointer object-cover"
                            />

                            {showAvatarMenu && (
                                <div className="absolute right-0 mt-2 bg-white dark:bg-gray-800 shadow rounded p-2 w-40">
                                    <p className="text-gray-600 dark:text-gray-200 px-2 truncate">{user.displayName}</p>
                                    <button
                                        onClick={logout}
                                        className="w-full text-left px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-700 text-red-500"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <>
                            <NavLink to="/login" className="px-3 py-1 bg-green-600 text-white rounded">Login</NavLink>
                            <NavLink to="/register" className="px-3 py-1 border border-green-600 text-green-600 rounded">
                                Register
                            </NavLink>
                        </>
                    )}
                </div>

                {/* Mobile Hamburger */}
                <button
                    className="md:hidden text-3xl text-gray-700 dark:text-gray-300"
                    onClick={() => setShowMobileMenu(!showMobileMenu)}
                >
                    ☰
                </button>
            </div>

            {/* Mobile Menu */}
            {showMobileMenu && (
                <div className="md:hidden bg-white dark:bg-gray-900 px-4 pb-4 flex flex-col gap-3">

                    <NavLink to="/" className={navLinkClass("/")}>Home</NavLink>
                    <NavLink to="/all-issues" className={navLinkClass("/all-issues")}>Issues</NavLink>

                    <button
                        onClick={handleAddIssueClick}
                        className="text-gray-700 dark:text-gray-300 font-semibold"
                    >
                        Add Issue
                    </button>

                    {user && (
                        <>
                            <NavLink to="/my-issues" className={navLinkClass("/my-issues")}>My Issues</NavLink>
                            <NavLink to="/my-contributions" className={navLinkClass("/my-contributions")}>
                                My Contributions
                            </NavLink>
                        </>
                    )}

                    {/* Mobile Dark Mode */}
                    <label className="swap swap-rotate cursor-pointer">
                        <input
                            type="checkbox"
                            checked={darkMode}
                            onChange={(e) => {
                                setDarkMode(e.target.checked);
                                toggleTheme(e.target.checked);
                            }}
                        />

                        {/* Sun */}
                        <svg
                            className="swap-on fill-yellow-400 w-8 h-8"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                        >
                            <path d="M5 12a7 7 0 1114 0A7 7 0 015 12zm7-9a1 1 0 011 1v2a1 1 0 11-2 0V4a1 1 0 011-1zm0 18a1 1 0 011 1v2a1 1 0 11-2 0v-2a1 1 0 011-1zM4 11H2a1 1 0 100 2h2a1 1 0 000-2zm18 0h-2a1 1 0 100 2h2a1 1 0 000-2zM6.343 6.343a1 1 0 011.414 0L9.17 7.757a1 1 0 11-1.414 1.414L6.343 7.757a1 1 0 010-1.414zM17.657 17.657a1 1 0 011.414 0l1.414 1.414a1 1 0 01-1.414 1.414l-1.414-1.414a1 1 0 010-1.414zm0-11.314L19.07 5.93a1 1 0 01-1.414 1.414l-1.414-1.414a1 1 0 111.414-1.414zM7.757 17.657a1 1 0 010 1.414l-1.414 1.414a1 1 0 11-1.414-1.414l1.414-1.414a1 1 0 011.414 0z" />
                        </svg>

                        {/* Moon */}
                        <svg
                            className="swap-off fill-gray-200 w-8 h-8"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                        >
                            <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
                        </svg>
                    </label>

                    {user ? (
                        <button className="text-red-500 font-semibold" onClick={logout}>Logout</button>
                    ) : (
                        <div className="flex gap-3">
                            <NavLink to="/login" className="px-3 py-1 bg-green-600 text-white rounded">Login</NavLink>
                            <NavLink to="/register" className="px-3 py-1 border border-green-600 text-green-600 rounded">
                                Register
                            </NavLink>
                        </div>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
