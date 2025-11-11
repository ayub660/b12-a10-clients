import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { bannerImages } from "../assets/images";

const Banner = () => {
    return (
        <div className="max-w-6xl mx-auto mt-6">
            <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false} interval={4000}>
                {bannerImages.map((img, i) => (
                    <div key={i}>
                        <img src={img} alt={`Banner ${i}`} className="rounded-lg object-cover h-80 w-full" />
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default Banner;
