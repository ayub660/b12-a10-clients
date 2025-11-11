import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ user, logout }) => {
    return (
        <div className="navbar bg-base-100 shadow-md px-6">
            <div className="navbar-start">
                <Link to="/" className="btn btn-ghost normal-case text-xl">CleanCity</Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 space-x-4">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/all-issues">All Issues</Link></li>
                    <li><Link to="/add-issue">Add Issue</Link></li>
                    <li><Link to="/my-issues">My Issues</Link></li>
                    <li><Link to="/my-contribution">My Contribution</Link></li>
                </ul>
            </div>
            <div className="navbar-end">
                {!user ? (
                    <>
                        <Link to="/login" className="btn btn-outline btn-sm mr-2">Login</Link>
                        <Link to="/register" className="btn btn-sm">Register</Link>
                    </>
                ) : (
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img src={user?.photoURL} alt="profile" />
                            </div>
                        </label>
                        <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                            <li><button onClick={logout}>Logout</button></li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
