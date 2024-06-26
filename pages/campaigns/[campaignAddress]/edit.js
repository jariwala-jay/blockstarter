import React from 'react';
import Layout from '../../../src/app/components/Layout';
import UpdateDetails from '../../../src/app/components/UpdateDetails';
import Campaign from '../../../ethereum/campaign';

const EditCampaign = (props) => {
  return (
    <Layout>
      <div className="max-w-[1440px] mx-auto px-4">
        <UpdateDetails address={props.address} initialDetails={props.initialDetails} />
      </div>
    </Layout>
  );
};

EditCampaign.getInitialProps = async ({ query }) => {
  const { campaignAddress } = query;
  const campaign = Campaign(campaignAddress);

  const CampaignDetails = await campaign.methods.campaignDetails().call();

  const initialDetails = {
    title: CampaignDetails.title,
    description: CampaignDetails.description,
    imageHash: CampaignDetails.photoHash,
    rewards: CampaignDetails.rewards,
    teamMembers: CampaignDetails.teamMembers,
  };

  return { address: campaignAddress, initialDetails };
};

export default EditCampaign;
