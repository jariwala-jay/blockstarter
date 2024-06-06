"use client"
import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

const LearnMore = () => {
    return (
      <div className='max-w-[1440px] mx-auto w-full'>
        <p className="mt-[15rem] text-[#f36128] font-nanum text-center">
          LEARN MORE
        </p>
        <div className="text-[#ffffff] text-[2rem] sm:text-[2.5rem] md:text-[3rem] lg:text-[4.3rem] xl:text-[4rem] font-sofia font-semibold leading-tight mt-[2%]">
          <p className='text-center'>Learn more about Blockstarter</p>
        </div>
        <div className="text-[#808080] text-center  font-nanum mt-[1%]">
          <p>WE BRING NEW TECHNOLOGIES TO OUR COMMUNITY</p>
        </div>
        <style jsx>{`
        .cards-container {
          display: flex;
          gap: 2rem;
          justify-content: center;
          margin-top: 4rem;
          flex-wrap: wrap;
        }
        @media (max-width: 600px) {
          .cards-container {
            flex-direction: column;
            align-items: center;
          }
        }
      `}</style>
      <div className="cards-container">
        <Card sx={{ maxWidth: 345, backgroundColor: '#141414' }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image="l1.png"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div" color="white">
                How to Participate in Campaigns?
              </Typography>
              <Typography variant="body2" color="white">
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica.
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card sx={{ maxWidth: 345, backgroundColor: '#141414' }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image="l1.png"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div" color="white">
                How to Participate in Campaigns?
              </Typography>
              <Typography variant="body2" color="white">
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica.
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card sx={{ maxWidth: 345, backgroundColor: '#141414' }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image="l1.png"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div" color="white">
                How to Participate in Campaigns?
              </Typography>
              <Typography variant="body2" color="white">
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica.
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </div>
      </div>
    );
}

export default LearnMore
