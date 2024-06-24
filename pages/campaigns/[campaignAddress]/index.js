import React from "react";
import Layout from "../../../src/app/components/Layout";
import Campaign from "../../../ethereum/campaign";
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
import web3 from "../../../ethereum/web3";
import ContributeForm from "../../../src/app/components/ContributeForm";
import Link from "next/link";
import RequestIndex from "./requests/index";
import styles from "./CampaignShow.module.css";
import CampaignTimer from "../../../src/app/components/CampaignTimer";
import UpdateDetails from "../../../src/app/components/UpdateDetails";
import EditIcon from '@mui/icons-material/Edit';

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

  const renderCards = () => {
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

  const renderLeaderboard = () => (
    <Box>
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
  );

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
            <Card
              sx={{
                backgroundColor: "#eefdfe",
                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                p: 2,
                borderRadius: "20px",
              }}
            >
              <CardContent>
                <Typography
                  className="text-[15px] text-[#71797E] font-nanum mb-[1rem]"
                >
                  Time Left
                </Typography>
                <CampaignTimer address={address} />
                
                <div className="h-[1px] bg-[#808080] my-[10px]"></div>
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
                  {Math.round(raisedAmount*100)/100} ETH
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={progress}
                  sx={{
                    height: 10,
                    borderRadius: 5,
                    backgroundColor: "#f5f5f5",
                    "& .MuiLinearProgress-bar": {
                      backgroundColor: "#f36128",
                    },
                  }}
                />
                <div className='relative'>
                <Typography
                  variant="caption"
                  color="textSecondary"
                >
                  {`${progress.toFixed(2)}% of Target`}

                </Typography>
                
                <Typography
                  variant="caption"
                  color="textSecondary"
                  className='absolute right-0'
                >
                {targetAmount} ETH

                </Typography>
                </div>
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
                <Typography
                  className="text-[15px] text-[#71797E] font-nanum mb-[1rem]"
                >
                  Invest Here
                </Typography>
                <ContributeForm address={address} />
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={8} className="mt-[2%] lg:mt-[-20%]">
          <Grid item xs={12} md={8}>
            <Paper className="bg-transparent border-none">
              <Tabs
                value={tabValue}
                onChange={handleChange}
                centered
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
                   {isManager && (
            <Link href={`/campaigns/${address}/edit`}>
              <Button 
                variant="contained"
                sx={{
                  backgroundColor: "transparent",
                  color: "#ffffff",
                  mt:1
                }}
                className='hover:bg-transparent'
              >
                <EditIcon/>
              </Button>
            </Link>
          )}
              </Tabs>
            
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
                {renderCards()}
              </Typography>
            </TabPanel>
            <TabPanel value={tabValue} index={2}>
              <Typography variant="body1">
                <RequestIndex />
              </Typography>
            </TabPanel>
            <TabPanel value={tabValue} index={3}>
              {renderLeaderboard()}
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

  const BasicDetails = await campaign.methods.getBasicSummary().call();
  const FundingDetails = await campaign.methods.getFundingSummary().call();
  const contributorsData = await campaign.methods.getContributors().call();

  const title = BasicDetails[8];
  const description = FundingDetails[3];
  const imageHash = BasicDetails[5];
  const target = FundingDetails[0].toString();
  const minimumContribution = BasicDetails[0].toString();
  const RemainingBalance = FundingDetails[1].toString();
  const requestCount = BasicDetails[2].toString();
  const approversCount = BasicDetails[3].toString();
  const rewards = BasicDetails[6];
  const teamMembers = BasicDetails[7];
  const creationTime = FundingDetails[4].toString();
  const duration = BasicDetails[7].toString();

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
    manager: BasicDetails[4],
    imageHash,
    target,
    rewards,
    teamMembers,
    creationTime,
    duration,
    contributors
  };
};
