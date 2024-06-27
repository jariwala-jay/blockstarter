import React from "react";
import Layout from "../../../src/app/components/Layout";
import Campaign from "../../../ethereum/campaign";
import {
  Grid,
  Typography,
  Box,
  Tabs,
  Tab,
  Paper,
  Button
} from "@mui/material";
import web3 from "../../../ethereum/web3";
import Link from "next/link";
import RequestIndex from "./requests/index";
import styles from "./CampaignShow.module.css";
import EditIcon from '@mui/icons-material/Edit';
import LeaderBoard from '../../../src/app/components/LeaderBoard';
import RenderCards from '../../../src/app/components/RenderCards';
import InvestDetailsCard from "../../../src/app/components/InvestDetailsCard";

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
    description,
    RemainingBalance,
    manager,
    minimumContribution,
    requestCount,
    approversCount,
    address,
    imageHash,
    target,
    rewards,
    teamMembers,
    creationTime,
    duration,
    contributors
  } = props;

  const [tabValue, setTabValue] = React.useState(0);
  const [isManager, setIsManager] = React.useState(false);

  React.useEffect(() => {
    const checkManager = async () => {
      const accounts = await web3.eth.getAccounts();
      setIsManager(accounts[0] === manager);
    };

    checkManager();
  }, [manager]);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Calculate progress percentage
  const targetAmount = parseFloat(web3.utils.fromWei(target, "ether"));
  const raisedAmount = targetAmount - parseFloat(web3.utils.fromWei(RemainingBalance, "ether"));
  const progress = Math.min((raisedAmount / targetAmount) * 100, 100); // Ensure progress doesn't exceed 100%


  return (
    <Layout>
      <div className="max-w-[1440px] mx-auto px-4">
        <Box sx={{ textAlign: "center", my: 2 }}>
          <Typography className="text-[2rem] md:text-[rem] font-sofia font-semibold">
            {title}
          </Typography>
          
        </Box>
        <Grid container spacing={8}>
          <Grid item xs={12} md={8}>
            <Box sx={{ width: "100%", height: "auto", overflow: "hidden" }}>
              <img
                src={getIPFSImageURL(imageHash)}
                alt="Campaign Image"
                className="w-full h-[300px] object-cover rounded-xl"
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <InvestDetailsCard 
            address={address} 
            raisedAmount={raisedAmount}
            progress={progress}
            targetAmount={targetAmount}
            approversCount={approversCount}
            minimumContribution={minimumContribution} 
            />
          </Grid>
        </Grid>

        <Grid container spacing={8} className="mt-[2%] lg:mt-[-25%]">
          <Grid item xs={12} md={8}>
            <Paper className="bg-transparent border-none">
              <Box sx={{ display: "flex", justifyContent: "center", overflowX: "auto" }}>
                <Tabs
                  value={tabValue}
                  onChange={handleChange}
                  variant="scrollable"
                  scrollButtons="auto"
                  TabIndicatorProps={{ style: { display: "none" } }}
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
                  <Tab
                    label="Leaderboard"
                    className={`font-nanum ${styles["tab-root"]} ${
                      tabValue === 3 ? styles["selected"] : ""
                    }`}
                  />
                </Tabs>
                {isManager && (
                  <Link href={`/campaigns/${address}/edit`}>
                    <Button 
                      variant="contained"
                      sx={{
                        backgroundColor: "transparent",
                        color: "#ffffff",
                        mt: 1
                      }}
                      className='hover:bg-transparent'
                    >
                      <EditIcon/>
                    </Button>
                  </Link>
                )}
              </Box>
            </Paper>
            <TabPanel value={tabValue} index={0} className="mb-[100px]">
              <Typography variant="h5" sx={{ mb: 2 }}>
                About Us :
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {description}
              </Typography>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Rewards :
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {rewards}
              </Typography>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Team Information :
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {teamMembers}
              </Typography>
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
              <Typography variant="body1">
              <RenderCards 
              title={title}
              description={description}
              manager={manager}
              requestCount={requestCount}
              address={address}
              />
              </Typography>
            </TabPanel>
            <TabPanel value={tabValue} index={2}>
              <Typography variant="body1">
                <RequestIndex />
              </Typography>
            </TabPanel>
            <TabPanel value={tabValue} index={3}>
            <LeaderBoard contributors={contributors}/>
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

  const FundingDetails = await campaign.methods.fundingDetails().call();
  const otherDetails = await campaign.methods.getOtherDetails().call();
  const campaignDetails = await campaign.methods.campaignDetails().call();
  const contributorsData = await campaign.methods.getContributors().call();

  const title = campaignDetails.title;
  const description = campaignDetails.description;
  const imageHash = campaignDetails.photoHash;
  const target = FundingDetails.fundingGoal.toString();
  const minimumContribution = FundingDetails.minimumContribution.toString();
  const RemainingBalance = FundingDetails.remainingGoal.toString();
  const requestCount = otherDetails[1].toString();
  const approversCount = otherDetails[2].toString();
  const rewards = campaignDetails.rewards;
  const teamMembers = campaignDetails.teamMembers;
  const creationTime = FundingDetails.creationTime.toString();
  const duration = FundingDetails.duration.toString();

  const contributors = contributorsData[0].map((address, index) => ({
    address,
    amount: web3.utils.fromWei(contributorsData[1][index].toString(), 'ether')
  }));

  return {
    title,
    description,
    address: campaignAddress,
    minimumContribution,
    RemainingBalance,
    requestCount,
    approversCount,
    manager: FundingDetails.manager,
    imageHash,
    target,
    rewards,
    teamMembers,
    creationTime,
    duration,
    contributors
  };
};
