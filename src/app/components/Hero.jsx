
import React from 'react'
import {Button} from '@mui/material';
import Link from 'next/link';

const Hero = () => {
    return (
      <>
      <div className=' bg-[#eefdfe] w-full'>
        <div className="relative justify-center max-w-[1440px] w-[100%] bg-[#eefdfe] h-[600px] mt-[-48px] mx-auto">
          <p className="text-[#000000] text-right absolute top-[6%] right-[4%] font-nanum text-[9px] sm:text-[10.5px] md:text-[12px] lg:text-[15px] xl:text-[17px]" >
            THU 2 DEC / 16:30 / 30C
          </p>
          <div className="flex flex-col text-[#000000] text-[3.2rem] sm:text-[3.7rem] md:text-[4.5rem] lg:text-[6rem] xl:text-[8rem] ml-[7%] lg:ml-[5%] font-sofia font-semibold mt-[3rem] leading-tight pt-[100px] lg:pt-[0px] ">
            <p>Investing early</p>
            <p>on the blockchain</p>
            <p>project</p>
          </div>
          
          <div className="text-[#000000] text-center xl:text-left text-[16px] xl:pl-[40%] absolute bottom-[8rem] font-nanum w-full">
            <p >Highly vetted ideas and teams you can trust.</p>
            <p>Supported by industry-leading creators and funds.</p>
            <Button
          component={Link}
          href="/campaigns"
          sx={{
            fontFamily:'nanum',
            backgroundColor: '#f36128',
            color: '#ffffff',
            padding: '20px',
            paddingX: '30px',
            border: '3px solid',
            borderRadius: '30px',
            transition: 'all 0.3s ease-in-out',
            '&:hover': {
              color: '#f36128',
              borderColor: '#f36128',
            },
            marginBottom:'-12rem'
          }}
        >
          See Upcoming Projects
        </Button>
          </div>
        </div>
        </div>
      </>
    );
}

export default Hero
