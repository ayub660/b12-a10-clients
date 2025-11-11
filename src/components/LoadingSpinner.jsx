import React from "react";

const LoadingSpinner = () => {
    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="radial-progress text-primary" style={{ "--value": 70 }}>
                Loading...
            </div>
        </div>
    );
};

export default LoadingSpinner;
