
import React from 'react'
import {Button} from '@mui/material';
import Link from 'next/link';
import DateTimeDisplay from './DateTimeDisplay'


const Hero = () => {
  
  
    return (
      <>
      <div className=' bg-[#eefdfe] w-full'>
        <div className="relative justify-center max-w-[1440px] w-[100%] bg-[#eefdfe] h-[600px] mt-[-48px] mx-auto">

            <DateTimeDisplay className="text-[#000000] text-right absolute top-[6%] right-[4%] font-nanum text-[13px] md:text-[14px] lg:text-[15px] xl:text-[17px]"/>

          <div className="flex flex-col text-[#000000] text-[2.8rem] sm:text-[3.7rem] md:text-[4.5rem] lg:text-[6rem] xl:text-[8rem] ml-[7%] lg:ml-[5%]  font-sofia font-bold xs:font-semibold mt-[3rem] leading-normal md:leading-tight pt-[100px] lg:pt-[0px] ">
          <p className="animate-slidein">Investing early</p>
          <p className="animate-slidein">on the blockchain</p>
          <p className="animate-slidein">project</p>
          </div>
           
          <div className="text-[#000000] text-center xl:text-left  text-[14px] md:text-[16px] xl:pl-[40%] absolute bottom-[8rem] font-nanum w-full">
            <p className="animate-slideleft">Highly vetted ideas and teams you can trust.</p>
            <p className="animate-slideleft">Supported by industry-leading creators and funds.</p>
            <Button
          component={Link}
          href="/campaigns"
          className='animate-slideup'
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
