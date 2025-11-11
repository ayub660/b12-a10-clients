import React from "react";
import { categoryImages } from "../assets/images";

const Categories = () => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto mt-6">
            {Object.entries(categoryImages).map(([key, img]) => (
                <button key={key} className="relative overflow-hidden rounded-lg shadow-lg hover:scale-105 transition-transform">
                    <img src={img} alt={key} className="w-full h-32 object-cover" />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-white font-bold text-lg">{key}</div>
                </button>
            ))}
        </div>
    );
};

export default Categories;
