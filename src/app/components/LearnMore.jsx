import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

const LearnMore = () => {
    return (
      <div className='h-[700px] '>
        <p className="mt-[15rem] text-[#f36128] font-nanum ml-[47%]">
          Learn More
        </p>
        <div className="ml-[1%] text-center text-[#ffffff] text-[4rem] ml-[6rem] font-sofia font-medium leading-tight mt-[2rem]">
          <p>Learn more about Blockstarter</p>
        </div>
        <div className="text-[#808080] text-center  font-nanum">
          <p>WE BRING NEW TECHNOLOGIES TO OUR COMMUNITY</p>
        </div>
        <div className='flex gap-[2rem] justify-center mt-[4rem]'>
        <Card sx={{ maxWidth: 345 , backgroundColor:'#141414'}}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image="l1.png"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div" color='white'>
                How to Participate in Campaigns ?
              </Typography>
              <Typography variant="body2" color="white">
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card sx={{ maxWidth: 345 , backgroundColor:'#141414'}}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image="l1.png"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div" color='white'>
                How to Participate in Campaigns ?
              </Typography>
              <Typography variant="body2" color="white">
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card sx={{ maxWidth: 345 , backgroundColor:'#141414'}}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image="l1.png"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div" color='white'>
                How to Participate in Campaigns ?
              </Typography>
              <Typography variant="body2" color="white">
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        </div>
      </div>
    );
}

export default LearnMore
