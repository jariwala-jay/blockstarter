"use client";

import React, { useEffect, useState } from 'react';
import InfiniteCards from './InfiniteCards'

const LearnMore = ({ scrollPosition }) => {
  const [animationParams, setAnimationParams] = useState({ translateX: 0, opacity: 1 });

  useEffect(() => {
    const calculateAnimationParams = () => {
      const threshold = 1700; // Adjust the threshold as needed
      if (scrollPosition > threshold) {
        const newTranslateX = Math.max(0, (scrollPosition - threshold) / 3 - 100);
        const newOpacity = Math.max(0, 1 - (scrollPosition - threshold) / 400);
        setAnimationParams({ translateX: newTranslateX, opacity: newOpacity });
      }else {
        setAnimationParams({ opacity: 1 });
      }
    };

    // Calculate animation params when the scroll position exceeds the threshold
    calculateAnimationParams();
  }, [scrollPosition]);

    return (
      <div className='max-w-[1440px] mx-auto w-full'>
        <p className="mt-[3rem] text-[#f36128] font-nanum text-center">
          LEARN MORE
        </p>
        <div className="text-[#ffffff] text-[2rem] sm:text-[2.5rem] md:text-[3rem] lg:text-[4.3rem] xl:text-[4rem] font-sofia font-semibold leading-tight mt-[2%]">
          <p className='text-center'
           style={{
            transform: `translateX(${animationParams.translateX}px)`,
            opacity: animationParams.opacity,
            transition: 'transform 0.3s ease, opacity 0.3s ease',
          }}
          >Learn more about Blockstarter</p>
        </div>
        <div className="text-[#808080] text-center  font-nanum mt-[1%] text-[0.7rem] md:text-[1rem]">
          <p>WE BRING NEW TECHNOLOGIES TO OUR COMMUNITY</p>
        </div>
        
        <div class="py-20">
  <div class="xl:container mx-auto px-6 md:px-12">
    <div class="mb-16 md:w-2/3 lg:w-1/2">
      <h2 class="mb-4 text-2xl font-bold text-white dark:text-white md:text-4xl">
        Blockstarter leadership
      </h2>
      <p class="text-[#808080]">
        Tailus prides itself not only on award-winning technology, but also on the talent of its
        people of some of the brightest minds and most experienced executives in business.
      </p>
    </div>
    <div class="grid gap-6 px-4 sm:px-0 md:grid-cols-3 grid-cols-1 ">
      <div class="group relative rounded-3xl  space-y-6 overflow-hidden">
        <img
          class="mx-auto h-[26rem] w-full grayscale object-cover object-top ransition duration-500 group-hover:scale-105 group-hover:grayscale-0"
          src="/edited_profile.jpg"
          alt="woman"
          loading="lazy"
          width="640"
          height="805"
        />
        <div class="absolute bottom-0 inset-x-0 h-max mt-auto px-8 py-6 bg-[#eefdfe] dark:bg-white translate-y-24 transition duration-300 ease-in-out group-hover:translate-y-0">
          <div>
            <h4 class="text-xl font-semibold dark:text-gray-700 text-black">Jay Jariwala</h4>
            <span class="block text-sm text-gray-500">CEO-Founder</span>
          </div>
          <p class="mt-8 text-black dark:text-black">Quae labore quia tempora dolor impedit. Possimus, sint ducimus ipsam?</p>
        </div>
        
      </div>
      <div class='col-span-2'>
        <InfiniteCards/>
      </div>
    </div>
   
  </div>
</div>
                                    
      </div>
    );
}

export default LearnMore






// "use client"
// import React from 'react'
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import Typography from '@mui/material/Typography';
// import { CardActionArea } from '@mui/material';

// const LearnMore = () => {
//     return (
//       <div className='max-w-[1440px] mx-auto w-full'>
//         <p className="mt-[15rem] text-[#f36128] font-nanum text-center">
//           LEARN MORE
//         </p>
//         <div className="text-[#ffffff] text-[2rem] sm:text-[2.5rem] md:text-[3rem] lg:text-[4.3rem] xl:text-[4rem] font-sofia font-semibold leading-tight mt-[2%]">
//           <p className='text-center'>Learn more about Blockstarter</p>
//         </div>
//         <div className="text-[#808080] text-center  font-nanum mt-[1%]">
//           <p>WE BRING NEW TECHNOLOGIES TO OUR COMMUNITY</p>
//         </div>
//         <style jsx>{`
//         .cards-container {
//           display: flex;
//           gap: 2rem;
//           justify-content: center;
//           margin-top: 4rem;
//           flex-wrap: wrap;
//         }
//         @media (max-width: 600px) {
//           .cards-container {
//             flex-direction: column;
//             align-items: center;
//           }
//         }
//       `}</style>
//       <div className="cards-container">
//         <Card sx={{ maxWidth: 345, backgroundColor: '#141414' }}>
//           <CardActionArea>
//             <CardMedia
//               component="img"
//               height="140"
//               image="l1.png"
//             />
//             <CardContent>
//               <Typography gutterBottom variant="h5" component="div" color="white">
//                 How to Participate in Campaigns?
//               </Typography>
//               <Typography variant="body2" color="white">
//                 Lizards are a widespread group of squamate reptiles, with over
//                 6,000 species, ranging across all continents except Antarctica.
//               </Typography>
//             </CardContent>
//           </CardActionArea>
//         </Card>
//         <Card sx={{ maxWidth: 345, backgroundColor: '#141414' }}>
//           <CardActionArea>
//             <CardMedia
//               component="img"
//               height="140"
//               image="l1.png"
//             />
//             <CardContent>
//               <Typography gutterBottom variant="h5" component="div" color="white">
//                 How to Participate in Campaigns?
//               </Typography>
//               <Typography variant="body2" color="white">
//                 Lizards are a widespread group of squamate reptiles, with over
//                 6,000 species, ranging across all continents except Antarctica.
//               </Typography>
//             </CardContent>
//           </CardActionArea>
//         </Card>
//         <Card sx={{ maxWidth: 345, backgroundColor: '#141414' }}>
//           <CardActionArea>
//             <CardMedia
//               component="img"
//               height="140"
//               image="l1.png"
//             />
//             <CardContent>
//               <Typography gutterBottom variant="h5" component="div" color="white">
//                 How to Participate in Campaigns?
//               </Typography>
//               <Typography variant="body2" color="white">
//                 Lizards are a widespread group of squamate reptiles, with over
//                 6,000 species, ranging across all continents except Antarctica.
//               </Typography>
//             </CardContent>
//           </CardActionArea>
//         </Card>
//       </div>
//       </div>
//     );
// }

// export default LearnMore
