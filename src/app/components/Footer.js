import React from 'react';
import { Container, Button, Typography, Grid, Link } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';
const Footer = () => {
  return (
    <div className='bg-[#eefdfe] h-[300px] mx-auto mt-[30px] w-full'>
      <p className='text-black text-[1.3rem] pt-[3rem] font-sofia text-center font-semibold'>Blockstarter</p>
      <div className='flex gap-[4rem] justify-center'>
      <p className='text-black text-[1rem] pt-[2rem] font-nanum text-center'>PROJECTS</p>
      <p className='text-black text-[1rem] pt-[2rem] font-nanum text-center'>FAQ</p>
      <p className='text-black text-[1rem] pt-[2rem] font-nanum text-center'>COMMUNITY</p>
      <p className='text-black text-[1rem] pt-[2rem] font-nanum text-center'>UPDATES</p>
      </div>

      <div className='flex gap-[4rem] justify-center text-black mt-[3rem]'>
      <FacebookIcon/>
      <XIcon/>
      <InstagramIcon/>
      <GitHubIcon/>
      </div>
      <p className='text-black text-[0.9rem] pt-[2rem] font-nanum text-center'>©2024 BLOCKSTARTER |  ALL RIGHTS RESERVED </p>
    </div>
  );
};

export default Footer;
