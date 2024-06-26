import React from 'react';
import { Card, CardContent, CardMedia, Typography, LinearProgress, Box, Grid } from '@mui/material';
import web3 from "../../../ethereum/web3";
import Divider from '@mui/material/Divider';

const InvestmentCard = ({ title, description, image, raised, timeLeft, minimumContribution, target, investors, RemainingBalance, isClosed }) => {
  const targetAmount = parseFloat(web3.utils.fromWei(target.toString(), "ether"));
  const raisedAmount = targetAmount - parseFloat(web3.utils.fromWei(RemainingBalance.toString(), "ether"));
  const progress = Math.round(Math.min((raisedAmount / targetAmount) * 100, 100) * 100) / 100;
  const daysLeft = Math.floor(timeLeft / (60 * 60 * 24));

  return (
    <Card sx={{ maxWidth: 310, minHeight: 500, borderRadius: 2, boxShadow: 3, padding: 0.5, backgroundColor: isClosed ? "#808080" : "#eefdfe", display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative' }}>
      {isClosed && (
        <Box sx={{ position: 'absolute', top: 10, right: 10, backgroundColor: 'red', color: 'white', padding: '5px 10px', borderRadius: 2 }}>
          Closed
        </Box>
      )}
      <CardMedia
        component="img"
        height="200"
        image={image}
        alt={title}
        className='p-[5px] h-[200px]'
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="div" className='font-sofia font-semibold'>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" className='h-[70px]'>
          {description}
        </Typography>
        <Typography variant="body2" color="text.primary" className='font-sofia font-semibold mt-[3px]'>
          Raised
        </Typography>
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{
            height: 10,
            borderRadius: 5,
            mt: 1,
            backgroundColor: "#f5f5f5",
            "& .MuiLinearProgress-bar": {
              backgroundColor: "#f36128",
            },
          }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
          <Typography variant="body2" color="text.secondary">
            {progress}%
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {daysLeft} days left
          </Typography>
        </Box>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
              <Grid item xs={4}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="body2" color="text.secondary">
                    Min. Invest
                  </Typography>
                  <Typography variant="body2" color="text.primary">
                    {web3.utils.fromWei(minimumContribution.toString(), "ether")} ETH
                  </Typography>
                </Box>
              </Grid>
              <Divider orientation="vertical" flexItem />
              <Grid item xs={4}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="body2" color="text.secondary">
                    Target
                  </Typography>
                  <Typography variant="body2" color="text.primary">
                    {web3.utils.fromWei(target.toString(), "ether")} ETH
                  </Typography>
                </Box>
              </Grid>
              <Divider orientation="vertical" flexItem />
              <Grid item xs={4}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="body2" color="text.secondary">
                    Investors
                  </Typography>
                  <Typography variant="body2" color="text.primary">
                    {investors}
                  </Typography>
                </Box>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default InvestmentCard;
