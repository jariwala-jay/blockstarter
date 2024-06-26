import React, { useState } from 'react';
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

        const CampaignDetails = await campaign.methods.campaignDetails().call();
        const Fundingdetails = await campaign.methods.fundingDetails().call();
        const Otherdetails = await campaign.methods.getOtherDetails().call();
        
        const title = CampaignDetails.title.toString();
        console.log(title)
        const description = CampaignDetails.description.toString();
        const raise = Fundingdetails.remainingGoal.toString();
        const timeLeft = (await campaign.methods.getTimeLeft().call()).toString();
        const target = Fundingdetails.fundingGoal.toString();
        const minimumContribution = Fundingdetails.minimumContribution.toString();
        const investors = Otherdetails[2].toString();
        const RemainingBalance = Fundingdetails.remainingGoal.toString();
        const imageHash = CampaignDetails.photoHash.toString();
        const isClosed = Otherdetails[3];
        return { address, title, description, imageHash, raise, timeLeft, target, minimumContribution, investors, RemainingBalance, isClosed };
      })
    );

    return { campaignDetails };
  }

  constructor(props) {
    super(props);
    this.state = {
      campaigns: props.campaignDetails,
      searchQuery: '',
      filter: 'all',
    };
  }

  handleSearchChange = (event) => {
    this.setState({ searchQuery: event.target.value });
  };

  handleFilterChange = (event) => {
    this.setState({ filter: event.target.value });
  };

  filterCampaigns = () => {
    const { campaigns, searchQuery, filter } = this.state;
    return campaigns.filter((campaign) => {
      const matchesSearch = campaign.title.toLowerCase().includes(searchQuery.toLowerCase());
      const isOpen = !campaign.isClosed;
      if (filter === 'all') return matchesSearch;
      if (filter === 'open') return matchesSearch && isOpen;
      if (filter === 'closed') return matchesSearch && !isOpen;
      return false;
    });
  };

  renderCampaigns() {
    return this.filterCampaigns().map((campaign, index) => {
      const shortDescription = campaign.description.split(' ').slice(0, 10).join(' ') + '...';
      const image = getIPFSImageURL(campaign.imageHash);

      return (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Link href={`campaigns/${campaign.address}`} passHref>
            <InvestmentCard
              title={campaign.title}
              description={shortDescription}
              image={image}
              raised={campaign.raise}
              timeLeft={campaign.timeLeft}
              minimumContribution={campaign.minimumContribution}
              target={campaign.target}
              investors={campaign.investors}
              RemainingBalance={campaign.RemainingBalance}
              isClosed={campaign.isClosed}
            />
          </Link>
        </Grid>
      );
    });
  }

  render() {
    return (
      <Layout>
        <div className="max-w-[1440px] mx-auto px-[4rem]">
          <div className="relative max-w-4xl flex py-[1rem] mx-auto justify-between items-center">
            <h1 className="text-[1.1rem] md:text-3xl mt-3 mb-6 font-sofia font-semibold">
              Listed Projects
            </h1>

              <input
                type="text"
                placeholder="Search"
                value={this.state.searchQuery}
                onChange={this.handleSearchChange}
                className="p-2 border border-gray-300 rounded-md text-black bg-white text-center"
              />
              <select
                value={this.state.filter}
                onChange={this.handleFilterChange}
                className="p-2 border border-gray-300 rounded-md text-black bg-white"
              >
                <option value="all">All</option>
                <option value="open">Open</option>
                <option value="closed">Closed</option>
              </select>
                  
                  <Button
                  component={Link}
                  href="/campaigns/new"
                  sx={{
                    fontFamily: 'nanum',
                    backgroundColor: '#f36128',
                    color: '#ffffff',
                    padding: {
                      xs: '10px 20px',
                      sm: '15px 25px',
                      md: '20px 30px',
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
                  >Create New Project</Button>

          </div>
          <div className="max-w-[1140px] mx-auto">
            <Grid container spacing={4}>
              {this.renderCampaigns()}
            </Grid>
          </div>
        </div>
      </Layout>
    );
  }
}

export default Campaigns;

