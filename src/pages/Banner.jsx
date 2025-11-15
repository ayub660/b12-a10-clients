import React, { useEffect, useState } from "react";
import { bannerImages } from "../assets/images";

const Banner = () => {
    const [current, setCurrent] = useState(0);
    const length = bannerImages.length;

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % length);
        }, 3000);
        return () => clearInterval(interval);
    }, [length]);

    return (
        <div className="max-w-7xl mx-auto px-4">
            <div className="relative w-full h-48 md:h-64 lg:h-80 overflow-hidden rounded-md">
                {bannerImages.map((img, index) => (
                    <img
                        key={index}
                        src={img}
                        alt={`banner-${index}`}
                        className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${index === current ? "opacity-100" : "opacity-0"
                            }`}
                    />
                ))}

                {/* Dots */}
                <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-2">
                    {bannerImages.map((_, idx) => (
                        <span
                            key={idx}
                            className={`w-3 h-3 rounded-full ${idx === current ? "bg-green-600" : "bg-gray-300"
                                }`}
                        ></span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Banner;