import React from 'react';
import { Card, CardContent, CardMedia, Skeleton, Box, Grid, Divider, LinearProgress, Typography } from '@mui/material';

const InvestmentCardSkeleton = () => {
  return (
    <Card sx={{ maxWidth: 310, minWidth: 220, minHeight: 500, borderRadius: 2, boxShadow: 3, padding: 0.2,backgroundColor: "#eefdfe", display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative' }}>
      <Skeleton variant="rectangular" height={200} className="p-[5px] h-[200px]" />
      <CardContent sx={{ flexGrow: 1 }}>
        <Skeleton variant="text" height={28} className="h-[60px]" />
        <Skeleton variant="text" height={20} className="h-[70px]" />
        <Typography variant="body2" color="text.primary" className="font-sofia font-semibold mt-[3px]">
          Raised
        </Typography>
        <LinearProgress
          variant="determinate"
          value={0}
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
          <Skeleton variant="text" width="30%" />
          <Skeleton variant="text" width="30%" />
        </Box>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
              <Grid item xs={4}>
                <Box sx={{ textAlign: 'center' }}>
                  <Skeleton variant="text" width="100%" />
                  <Skeleton variant="text" width="100%" />
                </Box>
              </Grid>
              <Divider orientation="vertical" flexItem />
              <Grid item xs={4}>
                <Box sx={{ textAlign: 'center' }}>
                  <Skeleton variant="text" width="100%" />
                  <Skeleton variant="text" width="100%" />
                </Box>
              </Grid>
              <Divider orientation="vertical" flexItem />
              <Grid item xs={4}>
                <Box sx={{ textAlign: 'center' }}>
                  <Skeleton variant="text" width="100%" />
                  <Skeleton variant="text" width="100%" />
                </Box>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default InvestmentCardSkeleton;
