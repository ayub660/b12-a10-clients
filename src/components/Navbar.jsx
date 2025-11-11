import { Link } from "react-router-dom";

const Navbar = ({ user }) => {
    return (
        <nav className="flex justify-between items-center p-4 bg-green-600 text-white">
            <div className="text-xl font-bold">CleanCity</div>
            <div className="space-x-4">
                <Link to="/">Home</Link>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
            </div>
        </nav>
    );
};

export default Navbar;
