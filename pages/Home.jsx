"use client"
import React, { useState, useEffect } from 'react';
import Layout from '../src/app/components/Layout'
import Hero from '../src/app/components/Hero'
import ProjectsHome from '../src/app/components/ProjectsHome'
import LearnMore from '../src/app/components/LearnMore'
import HomeHeader from '../src/app/components/HomeHeader'
import HowToInvest from '../src/app/components/HowToInvest'
import Footer from '../src/app/components/Footer';
import Globe  from '../src/app/components/Globe';

const Home = () => {
    const [scrollPosition, setScrollPosition] = useState(0);
    useEffect(() => {
        const handleScroll = () => {
          setScrollPosition(window.scrollY);
        };
    
        window.addEventListener('scroll', handleScroll);
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, []);

    return (
        <>
            <HomeHeader/>
            <Hero scrollPosition={scrollPosition} />
            <ProjectsHome scrollPosition={scrollPosition} />
            <Globe scrollPosition={scrollPosition}/>
            <LearnMore  scrollPosition={scrollPosition} />
            <Footer/>
        </>
    )
}

export default Home
