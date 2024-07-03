"use client"
import React from 'react';
import LearnMore from './LearnMore'
import useScrollPosition from './useScrollPosition';



const LearnMoreScroll =() => {

   const scrollPosition = useScrollPosition();
   return(
      <LearnMore scrollPosition={scrollPosition} />
   );
    
};

export default LearnMoreScroll;