import React from "react";

const ProjectsHome = () => {
  return (
    <>
      <div className="relative max-w-[1440px] bg-black overflow-hidden mx-auto">
        <div className="w-[1440px] ml-[6rem]">
          <p className="font-sofia text-[1.2rem] mt-[2rem]">Supported networks by</p>
          <div className="flex mt-[4rem]">
            <img
              src="/bsc.png"
              alt="BSC logo"
              className="w-[11rem] h-auto mr-7"
            />
            <img
              src="/eth.png"
              alt="Ethereum logo"
              className="w-[11rem] h-auto mr-7"
            />
            <img
              src="/sol.png"
              alt="Solana logo"
              className="w-[11rem] h-auto mr-7"
            />
            <img
              src="/dot.png"
              alt="Polkadot logo"
              className="w-[11rem] h-auto mr-7"
            />

            <div className="absolute h-[100px] w-[1200px] bg-[#eefdfe] top-[-30px] right-[-100px] rounded-[100px]"></div>
            <div className="absolute h-[160px] w-[650px] bg-[#eefdfe] top-[0px] right-[-100px] rounded-[120px] text-[#000000]">
              <div className="mt-[5rem] text-right pr-[10rem] font-nanum">
                <p>SCROLL TO SEE ONGOING BLOCKCHAIN PROJECT</p>
                <p>AND GIVE THEM YOUR SUPPORT</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative max-w-[1440px] h-[700px] mt-[-150px] mx-auto">
        <p className="ml-[6rem] mt-[15rem] text-[#f36128] font-nanum">
          FUNDRAISING
        </p>
        <div className="text-[#ffffff] text-[4rem] ml-[6rem] font-sofia font-medium leading-tight mt-[2rem]">
          <p>Futuristic Work shows us what's possible.</p>
          <p>Help Fund it here.</p>
        </div>
        <div className="text-[#808080] text-left absolute top-[11rem] right-[25rem] font-nanum">
          <p>WE BRING NEW TECHNOLOGIES TO OUR COMMUNITY</p>
        </div>
      </div>
    </>
  );
};

export default ProjectsHome;
