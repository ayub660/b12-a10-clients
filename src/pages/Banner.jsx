import { bannerImages } from "../../assets/images";

const Banner = () => {
    return (
        <div className="flex overflow-x-auto gap-4 my-4">
            {bannerImages.map((img, i) => (
                <img
                    key={i}
                    src={img}
                    alt={`Banner ${i}`}
                    className="w-full h-64 object-cover rounded-lg"
                />
            ))}
        </div>
    );
};

export default Banner;
