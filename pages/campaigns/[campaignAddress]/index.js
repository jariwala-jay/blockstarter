import React from "react";
import Layout from "../../../src/app/components/Layout";
import Campaign from "../../../ethereum/campaign";
import {
  Grid,
  Card,
  Typography,
  Button,
  CardContent,
  Box,
  Tabs,
  Tab,
  Paper,
  LinearProgress,
} from "@mui/material";
import web3 from "../../../ethereum/web3";
import ContributeForm from "../../../src/app/components/ContributeForm";
import Link from "next/link";
import RequestIndex from "./requests/index";
import styles from "./CampaignShow.module.css";

const getIPFSImageURL = (ipfsHash) =>
  `https://gateway.pinata.cloud/ipfs/${ipfsHash}`;

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default function CampaignShow(props) {
  const {
    title,
    Description,
    contractBalance,
    manager,
    minimumContribution,
    requestCount,
    approversCount,
    address,
    imageHash,
  } = props;

  const [tabValue, setTabValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Calculate progress percentage
  const targetAmount = 0.1; // Example: Target amount in ETH
  const raisedAmount = parseFloat(web3.utils.fromWei(contractBalance, "ether"));
  const progress = Math.min((raisedAmount / targetAmount) * 100, 100); // Ensure progress doesn't exceed 100%

  const renderCards = () => {
    const items = [
      {
        title: title,
        meta: "About Campaign",
        description: Description,
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
                minHeight:'150px',
                borderRadius:'15px'
              }}
            >
              <CardContent>
                <Typography
                  
                  gutterBottom
                  className="text-[1rem] font-semibold"
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

  return (
    <Layout>
      <div className="max-w-[1440px] mx-auto px-4">
        <Box sx={{ textAlign: "center", my: 2 }}>
          <Typography variant="h3" className="font-sofia font-semibold">
            {title}
          </Typography>
        </Box>
        <Grid container spacing={8}>
        <Grid item xs={12} md={8}>
        <Box sx={{ width: "100%", height: "auto", overflow: "hidden", mb: 4 }}>
          <img
            src={getIPFSImageURL(imageHash)}
            alt="Campaign Image"
            className=" w-full h-[300px] object-cover rounded-xl"
          />
        </Box>
        </Grid>
        <Grid item xs={12} md={4} >
            <Card
              sx={{
                backgroundColor: "#eefdfe",
                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                p: 2,
                borderRadius:'20px'
              }}
            >
              <CardContent>
                <Typography
                  className="text-[15px] text-[#71797E] font-nanum"
                  gutterBottom
                >
                  Raised
                </Typography>
                <Typography
                  className="text-[20px] font-sofia font-semibold"
                  gutterBottom
                >
                  {web3.utils.fromWei(contractBalance, "ether")} ETH
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={progress}
                  sx={{
                    height: 10, // Adjust the height of the progress bar if needed
                    borderRadius: 5, // Optional: Adds rounded corners to the progress bar
                    backgroundColor: "#f5f5f5", // Optional: Background color of the progress bar
                    "& .MuiLinearProgress-bar": {
                      backgroundColor: "#f36128", // Change color of the progress bar itself
                    },
                  }}
                />
                <Typography
                  variant="caption"
                  component="div"
                  color="textSecondary"
                >
                  {`${progress.toFixed(2)}% of Target`}
                </Typography>
                <div className="h-[1px] bg-[#808080] my-[10px]"></div>
                <Typography
                  className="text-[15px] text-[#71797E] font-nanum"
                  gutterBottom
                >
                  Target
                </Typography>
                <Typography
                  className="text-[20px] font-sofia font-semibold"
                  gutterBottom
                >
                  {targetAmount} ETH
                </Typography>

                <div className="h-[1px] bg-[#808080] my-[10px]"></div>
                <Typography
                  className="text-[15px] text-[#71797E] font-nanum"
                  gutterBottom
                >
                  Investors
                </Typography>
                <Typography
                  className="text-[20px] font-sofia font-semibold"
                  gutterBottom
                >
                  {approversCount}
                </Typography>
                <div className="h-[1px] bg-[#808080] my-[10px]"></div>
                <Typography
                  className="text-[15px] text-[#71797E] font-nanum"
                  gutterBottom
                >
                  Minimum Investment
                </Typography>
                <Typography
                  className="text-[20px] font-sofia font-semibold"
                  gutterBottom
                >
                  {web3.utils.fromWei(minimumContribution, "ether")} ETH
                </Typography>
                <div className="h-[1px] bg-[#808080] my-[10px]"></div>
                <Typography className="text-[15px] text-[#71797E] font-nanum mb-[1rem]">
                  Invest Here
                </Typography>
                <ContributeForm address={address} />
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={8} className='mt-[-330px]'>
          <Grid item xs={12} md={8}>
            <Paper className="bg-transparent border-none">
              <Tabs
                value={tabValue}
                onChange={handleChange}
                centered
                TabIndicatorProps={{ style: { display: "none" } }} // Hide the indicator line
              >
              <Tab
                  label="Overview"
                  className={`font-nanum ${styles["tab-root"]} ${
                    tabValue === 0 ? styles["selected"] : ""
                  }`}
                />
                <Tab
                  label="Description"
                  className={`font-nanum  ${styles["tab-root"]} ${
                    tabValue === 1 ? styles["selected"] : ""
                  }`}
                />
                
                <Tab
                  label="Requests"
                  className={`font-nanum ${styles["tab-root"]} ${
                    tabValue === 2 ? styles["selected"] : ""
                  }`}
                />
              </Tabs>
            </Paper>
            <TabPanel value={tabValue} index={0} className='mb-[100px]'>
            <Typography variant="h5" sx={{ mb: 2 }}>
                About Us :
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {Description}
              </Typography>
            
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
            <Typography variant="body1">
            {renderCards()}
            </Typography>
              
            </TabPanel>
            <TabPanel value={tabValue} index={2}>
              <Typography variant="body1">
                <RequestIndex />
              </Typography>
            </TabPanel>
          </Grid>
          
        </Grid>
      </div>
    </Layout>
  );
}

CampaignShow.getInitialProps = async ({ query }) => {
  const { campaignAddress } = query;
  const campaign = Campaign(campaignAddress);

  const summary = await campaign.methods.getSummary().call();
  const title = await campaign.methods.campaignTitle().call();
  const Description = await campaign.methods.campaignDescription().call();
  const imageHash = await campaign.methods.photoHash().call();

  const minimumContribution = summary[0].toString();
  const contractBalance = summary[1].toString();
  const requestCount = summary[2].toString();
  const approversCount = summary[3].toString();

  return {
    title,
    Description,
    address: campaignAddress,
    minimumContribution,
    contractBalance,
    requestCount,
    approversCount,
    manager: summary[4],
    imageHash,
  };
};
