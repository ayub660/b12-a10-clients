import { categoryImages } from "../../assets/images";

const Categories = () => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-8">
            {Object.keys(categoryImages).map((cat, i) => (
                <div key={i} className="p-4 border rounded-lg text-center">
                    <img src={categoryImages[cat]} alt={cat} className="h-32 w-full object-cover rounded" />
                    <h2 className="mt-2 font-bold">{cat}</h2>
                </div>
            ))}
        </div>
    );
};

export default Categories;
