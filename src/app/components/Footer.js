import React from 'react';
import { Container, Button, Typography, Grid, Link } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import XIcon from '@mui/icons-material/X';
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';

const Footer = () => {
  return (
    <div className='bg-[#eefdfe] h-[300px] mx-auto mt-[30px] w-full'>
      <div className='text-black text-[1.3rem] pt-[3rem] font-sofia text-center font-semibold flex items-center justify-center'>
        <img
          src="/fav.png"
          alt="Logo"
          style={{ width: '30px', maxWidth: '30px', height: 'auto', marginRight: '5px' }}
        />
        <span>Blockstarter</span>
      </div>
      <div className='flex gap-[2rem] md:gap-[4rem] justify-center text-black text-[1rem] font-nanum text-center'>
        <Link href="/campaigns">
          <p className='pt-[2rem] text-black no-underline'>PROJECTS</p>
        </Link>
        <Link href="/Faq">
          <p className='pt-[2rem] text-black no-underline '>FAQ</p>
        </Link>
        <Link href="/community">
          <p className='pt-[2rem] text-black no-underline'>COMMUNITY</p>
        </Link>
        <Link href="/updates">
          <p className='pt-[2rem] text-black no-underline'>UPDATES</p>
        </Link>
      </div>

      <div className='flex gap-[4rem] justify-center text-black mt-[3rem]'>
        <a href='https://www.linkedin.com/in/jariwala-jay/'><LinkedInIcon /></a>
        <a href='https://x.com/jariwalajay17'><XIcon/></a>
        <a href='https://www.instagram.com/jariwala_jay'><InstagramIcon/></a>
        <a href='https://github.com/jariwala-jay/blockstarter'><GitHubIcon/></a>
      </div>
      <p className='text-black text-[0.9rem] pt-[2rem] font-nanum text-center'>©2024 BLOCKSTARTER |  ALL RIGHTS RESERVED </p>
    </div>
  );
};

export default Footer;
