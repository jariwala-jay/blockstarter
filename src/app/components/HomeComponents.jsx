"use client"
import React from 'react';
import GlobeText from './GlobeText';
import Hero from './Hero'
import ProjectsHome from './ProjectsHome'
import HomeHeader from './HomeHeader'
import useScrollPosition from './useScrollPosition';



const HomeComponents =() => {

   const scrollPosition = useScrollPosition();
   return(  
      <>
      <HomeHeader />
      <Hero scrollPosition={scrollPosition} />
      <ProjectsHome scrollPosition={scrollPosition} />
      <GlobeText  scrollPosition={scrollPosition}/>
    </>
   );
    
};

export default HomeComponents;