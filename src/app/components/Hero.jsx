import React from 'react'
import {Button} from '@mui/material';
import Link from 'next/link';

const Hero = () => {
    return (
      <>
      <div className=' bg-[#eefdfe] w-full'>
        <div className="relative justify-center max-w-[1440px] w-[100%] bg-[#eefdfe] h-[600px] mt-[-48px] mx-auto">
          <p className="text-[#000000] text-right absolute top-[4rem] right-10 font-nanum">
            THU 2 DEC / 16:30 / 30C
          </p>
          <div className="text-[#000000] text-[8.5rem] ml-[6rem] font-sofia font-semibold leading-tight ml-[6rem] mt-[3rem]">
            <p>Investing early</p>
            <p>on the blockchain</p>
            <p>project</p>
          </div>
          
          <div className="text-[#000000] text-left text-[16px] absolute bottom-[8rem] right-[22rem] font-nanum ">
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
