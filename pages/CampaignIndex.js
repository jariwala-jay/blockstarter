import React from 'react';
import factory from '../ethereum/factory';
import { Card, Button } from 'semantic-ui-react';
import Layout from '../src/app/components/Layout';
import Link from 'next/link';
import Campaign from '../ethereum/campaign';
import '@fortawesome/fontawesome-free/css/all.min.css';
import LRU from 'lru-cache';

// Initialize LRU cache
const cache = new LRU({
  max: 500,
  maxAge: 1000 * 60 * 10 // Cache for 10 minutes
});

export async function getServerSideProps(context) {
  // Check if data is in cache
  let campaignDetails = cache.get('campaignDetails');

  if (!campaignDetails) {
    const campaignAddresses = await factory.methods.getDeployedCampaign().call();
    campaignDetails = await Promise.all(
      campaignAddresses.map(async (address) => {
        const title = await Campaign(address).methods.CampaignTitle().call();
        const description = await Campaign(address).methods.CampaignDescription().call();
        return { address, title, description };
      })
    );

    // Store data in cache
    cache.set('campaignDetails', campaignDetails);
  }

  return {
    props: { campaignDetails }, // will be passed to the page component as props
  };
}

const CampaignIndex = ({ campaignDetails }) => {
  const renderCampaigns = () => {
    return campaignDetails.map((campaignDetail, index) => (
      <Card
        header={campaignDetail.title}
        meta="Description"
        description={campaignDetail.description}
        extra={
          <Link href={`/campaigns/${campaignDetail.address}`} key={index}>
            <a>View Campaign</a>
          </Link>
        }
        fluid
        style={{ backgroundColor: '#f5f5f5', boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)' }}
        key={index}
      />
    ));
  };

  return (
    <Layout>
      <h1 style={{ paddingBottom: '10px' }}>Open Campaign</h1>
      <Link href="/campaigns/new">
        <Button
          style={{
            backgroundColor: '#4056a1',
            color: 'white',
            marginLeft: '30px',
            fontSize: '17px',
          }}
          content="Create Campaign"
          icon="add"
          primary
          floated="right"
        />
      </Link>
      <div>
        <Card.Group items={renderCampaigns()} />
      </div>
    </Layout>
  );
};

export default CampaignIndex;
