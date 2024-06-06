import React from 'react';
import Layout from '../src/app/components/Layout';
import Link from 'next/link';
import factory from '../ethereum/factory';
import Campaign from '../ethereum/campaign';
import { BentoGrid, BentoGridItem } from "../src/app/components/ui/bento-grid";
import { Button } from '@mui/material';

const getRandomImage = () => {
  const randomNum = Math.floor(Math.random() * 1000) + 1;
  return `https://picsum.photos/200/300?random=${randomNum}`;
};

class Campaigns extends React.Component {
  static async getInitialProps() {
    const campaignAddresses = await factory.methods.getDeployedCampaign().call();
    const campaignDetails = await Promise.all(
      campaignAddresses.map(async (address) => {
        const title = await Campaign(address).methods.CampaignTitle().call();
        const description = await Campaign(address).methods.CampaignDescription().call();
        return { address, title, description };
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
    return this.state.campaigns.map((campaign, index) => (
      <BentoGridItem
        key={index}
        title={campaign.title}
        description={campaign.description}
        header={
          <img
            src={getRandomImage()}
            alt="Campaign Image"
            className="w-full h-40 object-cover rounded-t-lg"
          />
        }
        className={index === 3 || index === 6 ? "md:col-span-2" : ""}
      >
        <div className="p-4">
          <Button variant="contained" color="primary">
            View Campaign
          </Button>
        </div>
      </BentoGridItem>
    ));
  }

  render() {
    return (
      <Layout>
        <div className="max-w-[1440px] mx-auto px-[4rem]">
          <h1 className="text-3xl mt-6 mb-6 font-sofia font-semibold text-center">Listed Projects</h1>
          <BentoGrid className="max-w-4xl mx-auto ">
            {this.renderCampaigns()}
          </BentoGrid>
        </div>
      </Layout>
    );
  }
}

export default Campaigns;
