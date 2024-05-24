import React from 'react';
import { Card, Button } from 'semantic-ui-react';
import Layout from '../app/components/Layout';
import Link from 'next/link'; // Import Link from Next.js
import factory from '../../ethereum/factory';
import Campaign from '../../ethereum/campaign';

class Campaigns extends React.Component {
  static async getInitialProps() {
    const AllCampaignDetails = [];

    const campaignAddresses = await factory.methods.getDeployedCampaign().call();

    for (let i = 0; i < campaignAddresses.length; i++) {
      const address = campaignAddresses[i];
      const title = await Campaign(address).methods.CampaignTitle().call();
      const description = await Campaign(address).methods.CampaignDescription().call();
      AllCampaignDetails.push({ address, title, description });
    }

    return { AllCampaignDetails };
  }

  renderCampaigns() {
    return this.props.AllCampaignDetails.map((campaign, index) => (
      <Card key={index} fluid style={{ backgroundColor: '#f5f5f5', boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)' }}>
        <Card.Content>
          <Card.Header>{campaign.title}</Card.Header>
          <Card.Meta>Description</Card.Meta>
          <Card.Description>{campaign.description}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          {/* Wrap the Button component inside the Link component */}
          <Link href={`/campaigns/${campaign.address}`}>
            <Button primary>View Campaign</Button>
          </Link>
        </Card.Content>
      </Card>
    ));
  }

  render() {
    return (
      <Layout>
        <h1 align="center" style={{ paddingBottom: '10px' }}>Open Campaign</h1>
        {this.renderCampaigns()}
      </Layout>
    );
  }
}

export default Campaigns;
