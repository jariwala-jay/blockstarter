"use client"
import React, { useState, useEffect, useCallback } from 'react';
import Globe from './Globe';




const GlobeText =({scrollPosition}) => {
    const [animationParams, setAnimationParams] = useState({ translateX: 0, opacity: 1 });

    useEffect(() => {
      const calculateAnimationParams = () => {
        const threshold = 1700; // Adjust the threshold as needed
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
  

   return(
      <>
    
    <div className="flex flex-col text-[#ffffff] text-[2rem] sm:text-[3rem] md:text-[4rem] lg:text-[5rem] xl:text-[4rem] ml-[7%] lg:ml-[5%] font-sofia font-semibold leading-tight"
      style={{
        transform: `translateX(${animationParams.translateX}px)`,
        opacity: animationParams.opacity,
        transition: 'transform 0.3s ease, opacity 0.3s ease',
      }}
    >
      <p>Empowering Global Innovation</p>
    </div>
    <p className="text-base md:text-lg font-normal text-neutral-700 dark:text-neutral-200 max-w-[700px] mt-2 ml-[7%] lg:ml-[5%]">
      Blockstarter harnesses blockchain technology to fuel crowdfunding for creative projects worldwide, empowering innovators to turn ideas into reality.
    </p>
   
    </>
   );
    
};

export default GlobeText;



