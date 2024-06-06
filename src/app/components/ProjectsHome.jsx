"use client";


import React from "react";
import ProjectHome3DCard from './ProjectHome3DCard';

const ProjectsHome = () => {
  return (
    <>
      <div className='absolute right-0 bg-[#eefdfe] h-[160px] w-full md:w-1/2'></div>
      <div className="relative max-w-[100%] md:max-w-[1440px] bg-black overflow-hidden mx-auto px-4">
        <div className="mt-[40%] xs:mt-[5%] md:mt-[10%] lg:mt-[10%] xl:mt-[0px] max-w-[100%] md:max-w-[1440px] mx-auto">
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
            <div className="absolute h-[160px] w-[650px] bg-[#eefdfe] top-[0px] right-[-100px] rounded-[120px] text-[#000000]">
              <div className="mt-[5rem] text-right pr-[8rem] md:pr-[10rem] font-nanum">
                <p>SCROLL TO SEE ONGOING BLOCKCHAIN PROJECT</p>
                <p>AND GIVE THEM YOUR SUPPORT</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative max-w-[100%] md:max-w-[1440px] h-[700px] mt-[-150px] mx-auto">
        <p className="ml-[40%] lg:ml-[7%] mt-[15rem] text-[#f36128] font-nanum">
          FUNDRAISING
        </p>
        <div className="flex flex-col text-[#ffffff] text-[2rem] sm:text-[3rem] md:text-[4rem] lg:text-[5rem] xl:text-[4rem] ml-[7%] lg:ml-[5%] font-sofia font-semibold mt-[3rem] leading-tight">
          <p>Futuristic Work shows us what's possible.</p>
          <p>Help Fund it here.</p>
        </div>
        <div className="text-[#808080] text-center absolute top-[30%] sm:top-[40%] md:top-[50%] lg:top-[60%] xl:top-[12rem] right-[10%] lg:right-[24%] font-nanum">
          <p>WE BRING NEW TECHNOLOGIES TO OUR COMMUNITY</p>
        </div>
        <div className='flex justify-center gap-8 px-[2rem]'>
        <ProjectHome3DCard/>
        <ProjectHome3DCard/>
        </div>
      </div>
    </>
  );
};

export default ProjectsHome;
