"use client"
import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProjectHome3DCard from './ProjectHome3DCard';
import ProjectHome3DCard2 from './ProjectHome3DCard2';

const ProjectsHome = ({ scrollPosition }) => {
  const [animationParams, setAnimationParams] = useState({ opacity: 1 });

  useEffect(() => {
    const calculateAnimationParams = () => {
      const threshold = 900; // Adjust the threshold as needed
      if (typeof window !== 'undefined') {
        if (scrollPosition > threshold) {
          const newTranslateX = Math.max(0, (scrollPosition - threshold) / 3 - 100);
          const newOpacity = Math.max(0, 1 - (scrollPosition - threshold) / 400);
          setAnimationParams({ translateX: newTranslateX, opacity: newOpacity });
        } else {
          setAnimationParams({ opacity: 1 });
        }
      }
    };

    calculateAnimationParams();
  }, [scrollPosition]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768, // Adjust based on your requirements
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      }
    ]
  };

  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768; // Define the breakpoint for mobile devices

  return (
    <>
      <div className='absolute right-0 bg-[#eefdfe] h-[160px] w-full md:w-1/2'></div>
      <div className="relative max-w-[100%] md:max-w-[1440px] bg-black overflow-hidden mx-auto px-4">
        <div className="mt-[25%] xs:mt-[15%] md:mt-[10%] lg:mt-[10%] xl:mt-[0px] max-w-[100%] md:max-w-[1440px] mx-auto md:ml-[2rem]">
          <p className="font-sofia text-[1.2rem] mt-[2.5rem] text-center md:text-left">Supported networks by</p>
          <div className="flex flex-wrap justify-center md:justify-start mt-[4rem]">
            <img
              src="/bsc.png"
              alt="BSC logo"
              className="w-[11rem] h-auto mb-4 mx-2"
            />
            <img
              src="/eth.png"
              alt="Ethereum logo"
              className="w-[11rem] h-auto mb-4 mx-2"
            />
            <img
              src="/sol.png"
              alt="Solana logo"
              className="w-[11rem] h-auto mb-4 mx-2"
            />
            <img
              src="/dot.png"
              alt="Polkadot logo"
              className="w-[11rem] h-auto mb-4 mx-2"
            />
            <div className="absolute h-[100px] w-[1200px] bg-[#eefdfe] top-[-30px] right-[-100px] rounded-[100px]"></div>
            <div className="absolute z-10 h-[30px] sm:h-[160px] w-[650px] bg-[#eefdfe] top-[0px] right-[-100px] rounded-[120px] text-[#000000]">
              <div className=" mt-[0rem] sm:mt-[5rem] text-right pr-[8rem] md:pr-[10rem] font-nanum text-[0.9rem] md:text-[1.1rem]">
                <p>SCROLL TO SEE ONGOING BLOCKCHAIN PROJECT</p>
                <p>AND GIVE THEM YOUR SUPPORT</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative max-w-[100%] md:max-w-[1440px] mt-[-150px] mx-auto">
        <p className="ml-[40%] lg:ml-[7%] mt-[15rem] text-[#f36128] font-nanum">
          FUNDRAISING
        </p>
        <div className="flex flex-col text-[#ffffff] text-[2rem] sm:text-[3rem] md:text-[4rem] lg:text-[5rem] xl:text-[4rem] ml-[7%] lg:ml-[5%] font-sofia font-semibold mt-[3rem] leading-tight"
          style={{
            transform: `translateX(${animationParams.translateX}px)`,
            opacity: animationParams.opacity,
            transition: 'transform 0.3s ease, opacity 0.3s ease',
          }}
        >
          <p>Futuristic Work shows us what's possible.</p>
          <p>Help Fund it here.</p>
        </div>
        <div className="text-[#808080] text-[0.7rem] md:text-[1rem] text-center absolute top-[28%] sm:top-[30%] md:top-[35%] lg:top-[40%] xl:top-[12rem] right-[20%] sm:right-[25%] md:right-[30%] lg:right-1/4 xl:right-[24%] font-nanum pb-[1rem]">
          <p>WE BRING NEW TECHNOLOGIES TO OUR COMMUNITY</p>
        </div>
        {isMobile && (
          <div className="mx-4 px-8 md:px-8">
            <Slider {...settings}>
              <ProjectHome3DCard />
              <ProjectHome3DCard2 />
            </Slider>
          </div>
        )}
        {!isMobile && (
          <div className="flex flex-col md:flex-row justify-center gap-8 mx-4 px-4 md:px-8">
            <ProjectHome3DCard />
            <ProjectHome3DCard2 />
          </div>
        )}
      </div>
    </>
  );
};

export default ProjectsHome;
