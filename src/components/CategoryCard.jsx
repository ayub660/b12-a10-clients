import React from "react";

const CategoryCard = ({ title, image }) => (
    <button className="rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300 w-full">
        <img
            src={image}
            alt={title}
            className="h-48 w-full object-cover" // height increased
        />
        <div className="p-3 bg-white text-center font-semibold text-lg">
            {title}
        </div>
    </button>
);

export default CategoryCard;
