import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Navbar = () => {
    const { user, logout } = useAuth();

    return (
        <div className="navbar bg-white shadow-sm px-4 md:px-10">
            <div className="navbar-start">
                <Link to="/" className="text-xl font-bold text-green-600">CleanCity</Link>
            </div>

            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 space-x-4">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/all-issues">Issues</Link></li>
                    {user && <>
                        <li><Link to="/my-issues">My Issues</Link></li>
                        <li><Link to="/my-contribution">My Contribution</Link></li>
                    </>}
                </ul>
            </div>

            <div className="navbar-end flex items-center space-x-4">
                {!user ? (
                    <>
                        <Link to="/login" className="btn btn-outline btn-sm">Login</Link>
                        <Link to="/register" className="btn btn-sm btn-primary">Register</Link>
                    </>
                ) : (
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img src={user.photoURL || "https://i.ibb.co/0ypZW9RJ/default-avatar.png"} alt="profile" />
                            </div>
                        </label>
                        <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 mt-2">
                            <li><button onClick={logout}>Logout</button></li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
