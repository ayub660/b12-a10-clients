import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { bannerImages } from "../assets/images";

const Banner = () => {
    return (
        <div className="w-full max-w-6xl mx-auto mt-4">
            <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false} interval={3000}>
                {bannerImages.map((img, index) => (
                    <div key={index}>
                        <img src={img} alt={`banner-${index}`} className="h-64 object-cover rounded-lg" />
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default Banner;
