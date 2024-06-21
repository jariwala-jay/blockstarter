import React from 'react';
import { Card, CardContent, CardMedia, Typography, LinearProgress, Box, Chip, Grid } from '@mui/material';
import web3 from "../../../ethereum/web3";
const InvestmentCard: React.FC = ({ title, description, image, raised, daysLeft, minimumContribution, target, investors ,RemainingBalance }) => {
  
  
  const targetAmount = parseFloat(web3.utils.fromWei(target, "ether") );
  const raisedAmount = targetAmount - parseFloat(web3.utils.fromWei(RemainingBalance, "ether"));
  const progress = Math.min((raisedAmount / targetAmount) * 100, 100); 

  return (
    <Card sx={{ maxWidth: 345, borderRadius: 2, boxShadow: 3, padding: 1, backgroundColor: "#eefdfe" }}>
      <CardMedia
        component="img"
        height="50"
        image={image}
        alt={title}
        className='h-[200px] p-[5px]'
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div" className='font-sofia font-semibold'>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
        <Typography variant="body2" color="text.primary" className='font-sofia font-semibold mt-[3px]'>
          Raised
        </Typography>
        <LinearProgress variant="determinate" value={progress} sx={{ height: 10, borderRadius: 5, mt: 1 }} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
          <Typography variant="body2" color="text.secondary">
            {progress}%
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {daysLeft} days left
          </Typography>
        </Box>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={4}>
            <Typography variant="body2" color="text.secondary">
              Minimum Investment
            </Typography>
            <Typography variant="body2" color="text.primary">
            {web3.utils.fromWei(minimumContribution, "ether")} ETH
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body2" color="text.secondary">
              Target
            </Typography>
            <Typography variant="body2" color="text.primary">
            {web3.utils.fromWei(target, "ether")} ETH
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body2" color="text.secondary">
              Investors
            </Typography>
            <Typography variant="body2" color="text.primary">
              {investors}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default InvestmentCard;
