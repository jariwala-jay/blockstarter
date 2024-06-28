"use client";

import React, { useEffect, useState } from 'react';
import InfiniteCards from './InfiniteCards';

const LearnMore = ({ scrollPosition }) => {
  const [animationParams, setAnimationParams] = useState({ translateX: 0, opacity: 1 });

  useEffect(() => {
    const calculateAnimationParams = () => {
      const threshold = 2600; // Adjust the threshold as needed
      if (scrollPosition > threshold) {
        const newTranslateX = Math.max(0, (scrollPosition - threshold) / 3 - 100);
        const newOpacity = Math.max(0, 1 - (scrollPosition - threshold) / 400);
        setAnimationParams({ translateX: newTranslateX, opacity: newOpacity });
      } else {
        setAnimationParams({ translateX: 0, opacity: 1 });
      }
    };

    calculateAnimationParams();
  }, [scrollPosition]);

  return (
    <div className="max-w-[1440px] mx-auto w-full overflow-x-hidden">
      <p className="mt-[3rem] text-[#f36128] font-nanum text-center">LEARN MORE</p>
      <div className="text-[#ffffff] text-[1.5rem] sm:text-[2.5rem] md:text-[3rem] lg:text-[4.3rem] xl:text-[4rem] font-sofia font-semibold leading-tight mt-[2%] text-center"
        style={{
          transform: `translateX(${animationParams.translateX}px)`,
          opacity: animationParams.opacity,
          transition: 'transform 0.3s ease, opacity 0.3s ease',
        }}>
        Learn more about Blockstarter
      </div>
      <div className="text-[#808080] text-center font-nanum mt-[1%] text-[0.7rem] md:text-[1rem]">
        <p>WE BRING NEW TECHNOLOGIES TO OUR COMMUNITY</p>
      </div>
      <div className="py-20">
        <div className="xl:container mx-auto px-6 md:px-12">
          <div className="mb-16 md:w-2/3 lg:w-1/2">
            <h2 className="mb-4 text-2xl font-bold text-white md:text-4xl">Blockstarter leadership</h2>
            <p className="text-[#808080]">
              Blockstarter takes pride not only in its cutting-edge technology but also in the talent and dedication of its team. Our leadership comprises some of the brightest minds and most experienced executives in the business, driving innovation and success in the world of crowdfunding.
            </p>
          </div>
          <div className="grid gap-6 px-4 sm:px-0 md:grid-cols-3 grid-cols-1">
  <div className="group relative rounded-3xl space-y-6 overflow-hidden">
    <img
      className="mx-auto h-[26rem] w-full grayscale object-cover object-top transition duration-500 group-hover:scale-105 group-hover:grayscale-0"
      src="/edited_profile.jpg"
      alt="Jay Jariwala"
      loading="lazy"
      width="640"
      height="805"
    />
    <div className="absolute bottom-24 inset-x-0 h-max mt-auto px-8 py-6 bg-[#eefdfe] transform translate-y-full transition duration-300 ease-in-out group-hover:translate-y-24">
      <div>
        <h4 className="text-xl font-semibold text-black">Jay Jariwala</h4>
        <span className="block text-sm text-gray-500 pb-[25px]">Founder</span>
      </div>
      <p className="mt-4 text-black">Jay Jariwala, the visionary behind Blockstarter, leads the charge in revolutionizing crowdfunding with cutting-edge technology and a commitment to fostering community-driven support.</p>
    </div>
  </div>

            <div className="col-span-2">
              <InfiniteCards />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearnMore;
