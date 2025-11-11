import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { bannerImages } from "../assets/images";

const Banner = () => (
    <div className="max-w-7xl mx-auto mt-4">
        <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false}>
            {bannerImages.map((img, idx) => (
                <div key={idx}>
                    <img src={img} className="h-60 md:h-96 object-cover rounded-lg" alt={`Slide ${idx}`} />
                </div>
            ))}
        </Carousel>
    </div>
);

export default Banner;
