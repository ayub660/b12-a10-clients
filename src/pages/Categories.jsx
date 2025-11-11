import React from "react";
import { categoryImages } from "../assets/images";

const Categories = () => {
    const categories = Object.keys(categoryImages);

    return (
        <div className="max-w-6xl mx-auto py-10 grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((cat) => (
                <button
                    key={cat}
                    className="bg-white shadow-md rounded-lg overflow-hidden hover:scale-105 transform transition duration-300"
                >
                    <img
                        src={categoryImages[cat]}
                        alt={cat}
                        className="w-full h-32 object-cover"
                    />
                    <div className="text-center py-2 font-semibold">{cat}</div>
                </button>
            ))}
        </div>
    );
};

export default Categories;
