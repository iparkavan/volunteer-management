import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Outlet } from "react-router-dom";
import { styled } from "@mui/material";

const SlideDotStyleWrapper = styled("div")`
.custom-dots{
    position: absolute;
    width: 100%;
    top: 5rem;
}

/* Custom styles for dots */
.custom-dots li {
    display: inline-block;
    margin: 0;
  }
  
  .custom-dots .slick-active .dot {
    width: 26px;
    height: 6px;
    border-radius: 8px;
    background-color: white;
    opacity: 1;
  }

  .custom-dots .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: white;
    opacity: 0.7;
    min-width: auto;
    transition: width 250ms ease 0s;
    &::before{
      color: transparent;
    }
  }

  .custom-dots .dot:hover {
    opacity: 1;
  }
`
const AuthLayout = () => {

  // React Slick slider settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    appendDots: (dots) => (
      <SlideDotStyleWrapper>
        <ul className="custom-dots flex justify-center gap-x-3">{dots}</ul>
      </SlideDotStyleWrapper>
    ),
    customPaging: (i) => (
      <button className="dot w-3 h-3 rounded-full bg-white opacity-70 hover:opacity-100 transition-all duration-300"></button>
    ),
  };

  // Welcome slider content
  const slides = [
    {
      title: "Welcome",
      subtitle: "Volunteer Management Application",
      description:
        "AI-Powered Nonprofit Program Management Software for Social Impact Management",
    },
    {
      title: "Welcome",
      subtitle: "Volunteer Management Application",
      description:
        "AI-Powered Nonprofit Volunteer Software for Social Impact Management",
    },
    {
      title: "Welcome",
      subtitle: "Volunteer Management Application",
      description:
        "AI-Powered Nonprofit Volunteer Software for Social Impact Management",
    },

  ];

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Left Section */}
      <div className="w-3/5 flex items-center justify-center bg-background-primary-main" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/login-background.png)` }}>
        <div className="w-4/5">
          <Slider {...sliderSettings}>
            {slides.map((slide, index) => (
              <div key={index} className="text-white">
                <h1 className="text-4xl mb-4">{slide.title}</h1>
                <h2 className="text-4xl font-semibold mb-2">
                  {slide.subtitle}
                </h2>
                <p className="text-md">{slide.description}</p>
              </div>
            ))}
          </Slider>
        </div>
      </div>
      <div className="w-full overflow-y-auto py-10">
        <Outlet />
      </div>
    </div>
  );
};

export { AuthLayout };
