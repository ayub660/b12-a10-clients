// src/pages/Categories.jsx
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

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1000); // simulate loading
        return () => clearTimeout(timer);
    }, []);

    if (loading) return <LoadingSpinner />;

    return (
        <section className="mt-12 max-w-7xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-800">
                Categories
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                {categories.map((cat) => (
                    <div
                        key={cat.name}
                        className="flex flex-col items-center bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transform transition hover:scale-105 hover:shadow-2xl"
                    >
                        <img
                            src={categoryImages[cat.name]}
                            alt={cat.name}
                            className="w-full h-48 object-cover"
                        />
                        <div className="w-full text-center py-3 bg-white">
                            <span className="text-gray-800 font-semibold text-lg">
                                {cat.name}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Categories;
