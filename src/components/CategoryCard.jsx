import React from "react";

const CategoryCard = ({ title, image }) => (
    <button className="rounded-lg overflow-hidden shadow-lg hover:scale-105 transition transform duration-300 w-full">
        <img src={image} alt={title} className="h-32 w-full object-cover" />
        <div className="p-2 bg-white text-center font-semibold">{title}</div>
    </button>
);

export default CategoryCard;
