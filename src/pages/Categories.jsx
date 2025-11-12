import React, { useState, useEffect } from "react";
import { categoryImages } from "../assets/images";
import LoadingSpinner from "../components/LoadingSpinner";

const categories = [
    { name: "Garbage" },
    { name: "RoadDamage" },
    { name: "BrokenProperty" },
    { name: "IllegalConstruction" },
];

const Categories = () => {
    const [loading, setLoading] = useState(true);

    // simulate image loading
    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1000); // 1 sec loader
        return () => clearTimeout(timer);
    }, []);

    if (loading) return <LoadingSpinner />;

    return (
        <div className="mt-6">
            <h2 className="text-2xl font-bold mb-4">Categories</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                {categories.map((cat) => (
                    <button
                        key={cat.name}
                        className="flex flex-col items-center justify-center p-4 bg-white shadow-lg rounded-lg hover:shadow-2xl transition transform hover:scale-105"
                    >
                        <img
                            src={categoryImages[cat.name]}
                            alt={cat.name}
                            className="w-60 h-40 object-cover rounded mb-3" // image size increased
                        />
                        <span className="text-gray-800 font-semibold text-lg">{cat.name}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Categories;
