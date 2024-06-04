import React from 'react';
import { Grid, Card, CardMedia, CardContent, Typography, Button } from '@mui/material';
import Layout from '../src/app/components/Layout';
import Link from 'next/link';
import factory from '../ethereum/factory';
import Campaign from '../ethereum/campaign';

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
      <Grid item xs={12} sm={6} md={4} key={index}>
        <Card style={{ backgroundColor: '#eefdfe', boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)', color: 'black', height:'500px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <CardMedia
            component="img"
            alt="Campaign Image"
            height="100"
            image={getRandomImage()}
            title="Campaign Image"
            className='h-[300px]'
          />
          <CardContent style={{ padding: '16px', flexGrow: 1 }}>
            <Typography gutterBottom variant="h5" component="h2" style={{ marginBottom: '0.5rem' }}>
              {campaign.title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {campaign.description}
            </Typography>
          </CardContent>

          <Button
            variant="contained"
            style={{ backgroundColor: 'black', color: 'white', alignSelf: 'center'}}
            component={Link}
            href={`/campaigns/${campaign.address}`}
            className='text-center rounded-[20px] text-[1rem] mb-4'
          >
            View Campaign
          </Button>
        </Card>
      </Grid>
    ));
  }

  render() {
    return (
      
      <Layout >
      <div className="max-w-[1440px] mx-auto">
        <h1 className="text-3xl mt-6 mb-4 font-sofia font-semibold text-center">Listed Projects</h1>
        <Grid container spacing={3}>
          {this.renderCampaigns()}
        </Grid>
        </div>
      </Layout>
      
    );
  }
}

export default Campaigns;
