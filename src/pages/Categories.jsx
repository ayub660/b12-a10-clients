import React from "react";
import { categoryImages } from "../assets/images";
import CategoryCard from "../components/CategoryCard";

const Categories = () => (
    <div className="max-w-7xl mx-auto my-10 grid grid-cols-2 md:grid-cols-4 gap-6">
        {Object.entries(categoryImages).map(([key, img]) => (
            <CategoryCard key={key} title={key} image={img} />
        ))}
    </div>
);

export default Categories;
