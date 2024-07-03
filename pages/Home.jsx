
import React from 'react';
import HomeComponents from '../src/app/components/HomeComponents'
import LearnMoreScroll from '../src/app/components/LearnMoreScroll'
import Footer from '../src/app/components/Footer';

import Globe from '../src/app/components/Globe';

const Home = () => {
 
  return (
    <>
      <HomeComponents/>
      <Globe/>
      <LearnMoreScroll/>
      <Footer />
    </>
  );
};

export default Home;
