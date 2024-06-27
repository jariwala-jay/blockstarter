import React from 'react';
import {
    Grid,
    Card,
    Typography,
    CardContent,
    Box,
    Tabs,
    Tab,
    Paper,
    LinearProgress,
    Button
  } from "@mui/material";

const LeaderBoard = ({contributors}) => {
  return (

    <Box className='min-h-[300px]'>
    <Typography variant="h4" sx={{ mb: 2 }} className='text-center'>
      Leaderboard
    </Typography>
    <Typography variant="caption" sx={{ mt: 4 }} className='text-center'>
      {(contributors == 0) ?
        (<p>No Contributers yet Found</p>) :
        (<p></p>)
      }
    </Typography>
    <Grid container spacing={2}>
      {contributors.map((contributor, index) => (
        <Grid item xs={12} key={index}>
          <Card
            sx={{
              backgroundColor: "#eefdfe",
              boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.1)",
              fontFamily: "nanum",
              height: "auto",
              minHeight: "100px",
              borderRadius: "15px",
            }}
          >
            <CardContent>
              <Typography
                variant="subtitle1"
                className="font-semibold"
              >
                Address: {contributor.address}
              </Typography>
              <Typography variant="body2">
                Contribution: {contributor.amount} ETH
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  </Box>
  )
}

export default LeaderBoard
