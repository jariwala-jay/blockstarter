import React from 'react';
import Layout from '../src/app/components/Layout';
import Link from 'next/link';
import factory from '../ethereum/factory';
import Campaign from '../ethereum/campaign';
import { BentoGrid, BentoGridItem } from "../src/app/components/ui/bento-grid";
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const getRandomImage = () => {
  const randomNum = Math.floor(Math.random() * 1000) + 1;
  return `https://picsum.photos/200/300?random=${randomNum}`;
};

class Campaigns extends React.Component {
  static async getInitialProps() {
    const campaignAddresses = await factory.methods.getDeployedCampaigns().call();
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
        description={
          <div>
            
            <p className="text-gray-700 mb-4">{campaign.description}</p>
            <Link href={`/campaigns/${campaign.address}`} passHref>
              <Button
                variant="contained"
                style={{ backgroundColor: 'black', color: 'white', alignSelf: 'center'}}
                className='text-center rounded-[20px] text-[0.7rem] mx-auto'
              >
                View Campaign
              </Button>
            </Link>
        </div>
        }
        header={
          <img
            src={getRandomImage()}
            alt="Campaign Image"
            className="w-full h-40 object-cover rounded-t-lg"
          />
        }
        className={index === 3 || index === 6 ? "md:col-span-2" : ""}
      >
        <div className="flex flex-col justify-between h-full">
          
        </div>
      </BentoGridItem>
    ));
  }

  render() {
    return (
      <Layout>
        <div className="max-w-[1440px] mx-auto px-[4rem]">
        <div className="flex text-center justify-center items-center pb-[1rem]">
      <h1 className="text-[1.2rem] md:text-3xl mt-6 mb-6 font-sofia font-semibold">
        Listed Projects
      </h1>
      <Button
        component={Link}
        href="/campaigns/new"
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
          marginLeft: {
            xs: '35%', // Small devices
            sm:'35%',
            md: '35%', // Medium to large devices
            lg: '35%'
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
          <BentoGrid className="max-w-4xl mx-auto">
            {this.renderCampaigns()}
          </BentoGrid>
        </div>
      </Layout>
    );
  }
}

export default Campaigns;
