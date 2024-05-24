import React from "react";

const ProjectsHome = () => {
  return (
    <>
      <div className="relative">
          <div className="absolute ml-[6rem] mt-[2rem]">
            <p className="font-sofia text-[1rem]">Supported networks by</p>
            <div className="flex mt-[2rem]">
              <img
                src="/bsc.png"
                alt="BSC logo"
                className="w-[11rem] h-auto mr-7 "
              />
              <img
                src="/eth.png"
                alt="Ethereum logo"
                className="w-[11rem] h-auto mr-7 "
              />
              <img
                src="/sol.png"
                alt="Solana logo"
                className="w-[11rem] h-auto mr-7 "
              />
              <img
                src="/dot.png"
                alt="Polkadot logo"
                className="w-[11rem] h-auto mr-7 "
              />
              <div className="absolute h-[90px] w-[1200px] bg-[#eefdfe] top-[-55px] right-[-700px] rounded-[120px]"> </div>
              <div className="absolute h-[160px] w-[650px] bg-[#eefdfe] top-[0px] right-[-780px] rounded-[120px] text-[#000000]">
                <div className='mt-[4rem]  text-right pr-[10rem] font-nanum'>
                <p>SCROLL TO SEE ONGOING BLOCKCHAIN PROJECT</p>
                <p>AND GIVE THEM YOUR SUPPORT</p>
                </div>
               </div>
            </div>
            
            
          </div>
        </div>
      <div className="relative   h-[700px]">
        <p className="ml-[6rem] mt-[15rem] text-[#f36128] font-nanum">
          FUNDRAISING
        </p>
        <div className="text-[#ffffff] text-[4rem] ml-[6rem] font-sofia font-medium leading-tight ml-[6rem] mt-[2rem]">
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
