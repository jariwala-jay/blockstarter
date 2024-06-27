import React from "react";

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

const RenderCards = ({title,description,manager,requestCount,address}) => {
    const items = [
      {
        title: title,
        meta: "About Campaign",
        description: description,
      },
      {
        title: manager,
        meta: "Address of Manager",
        description:
          "Manager created this campaign and can create requests to withdraw money",
      },
      {
        title: requestCount,
        meta: "Number of Requests",
        description:
          "A request tries to withdraw money from the contract. Requests must be approved by approvers",
      },
      {
        title: address,
        meta: "Contract Address",
        description:
          "This is the Official Address of Smart Contract.",
      },
    ];

    return (
      <Grid container spacing={2}>
        {items.map((item, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <Card
              sx={{
                backgroundColor: "#eefdfe",
                boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.1)",
                fontFamily: "nanum",
                height: "auto",
                minHeight: "150px",
                borderRadius: "15px",
              }}
            >
              <CardContent>
                <Typography
                  gutterBottom
                  className="text-[0.8rem] md:text-[1rem] font-semibold"
                >
                  {item.title}
                </Typography>
                <Typography
                  variant="subtitle2"
                  color="textSecondary"
                  gutterBottom
                >
                  {item.meta}
                </Typography>
                <Typography variant="body2">{item.description}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  };
  export default RenderCards;