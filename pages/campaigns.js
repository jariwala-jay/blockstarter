import React from 'react';
import Layout from '../src/app/components/Layout';
import Link from 'next/link';
import factory from '../ethereum/factory';
import Campaign from '../ethereum/campaign';
import { Grid, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import InvestmentCard from '../src/app/components/InvestmentCard';

// Get IPFS image URL from Pinata
const getIPFSImageURL = (ipfsHash) => `https://gateway.pinata.cloud/ipfs/${ipfsHash}`;

class Campaigns extends React.Component {
  static async getInitialProps() {
    const campaignAddresses = await factory.methods.getDeployedCampaigns().call();
    const campaignDetails = await Promise.all(
      campaignAddresses.map(async (address) => {
        const campaign = Campaign(address);

        const BasicDetails = await campaign.methods.getBasicSummary().call();
        const Fundingdetails = await campaign.methods.getFundingSummary().call();
        const title = BasicDetails[8];
        const description = Fundingdetails[3];
        const raise = Fundingdetails[1].toString();
        const daysLeft = Fundingdetails[2].toString();
        const target = Fundingdetails[0].toString();
        const minimumContribution = BasicDetails[0].toString();
        const investors = BasicDetails[3].toString();
        const RemainingBalance = Fundingdetails[1].toString();
        const imageHash = BasicDetails[5];
        return { address, title, description, imageHash, raise, daysLeft, target, minimumContribution, investors ,RemainingBalance};
      })
    );

    return { campaignDetails };
  }

  constructor(props) {
    super(props);
    this.state = {
      campaigns: props.campaignDetails,
    };
  }

  renderCampaigns() {
    return this.state.campaigns.map((campaign, index) => {
      const shortDescription = campaign.description.split(" ").slice(0, 10).join(" ") + "...";
      const image = getIPFSImageURL(campaign.imageHash);
  
      return (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <InvestmentCard
            title={campaign.title}
            description={shortDescription}
            image={image}
            raised={campaign.raise}
            daysLeft={campaign.daysLeft}
            minimumContribution={campaign.minimumContribution} 
            target={campaign.target}
            investors={campaign.investors}
            RemainingBalance = {campaign.RemainingBalance}
          />
        </Grid>
      );
    });
  }
  
  render() {
    return (
      <Layout>
        <div className="max-w-[1440px] mx-auto px-[4rem]">
          <div className="relative max-w-4xl flex py-[1rem] mx-auto ">
            <h1 className="text-[1.1rem] md:text-3xl mt-3 mb-6 font-sofia font-semibold">
              Listed Projects
            </h1>
            <Button
              component={Link}
              href="/campaigns/new"
              className='absolute right-0'
              sx={{
                fontFamily: 'nanum',
                backgroundColor: '#f36128',
                color: '#ffffff',
                padding: {
                  xs: '10px 20px', // Small devices
                  sm: '15px 25px', // Small to medium devices
                  md: '20px 30px', // Medium to large devices
                },
                border: '3px solid',
                borderColor: 'black',
                borderRadius: '30px',
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  color: '#f36128',
                  borderColor: '#f36128',
                },
              }}
            >
              <span className="block md:hidden">
                <AddIcon />
              </span>
              <span className="hidden md:block">
                Create New Project
              </span>
            </Button>
          </div>
          <Grid container spacing={4}>
            {this.renderCampaigns()}
          </Grid>
        </div>
      </Layout>
    );
  }
}

export default Campaigns;
