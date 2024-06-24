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

  const BasicDetails = await campaign.methods.getBasicSummary().call();
  const FundingDetails = await campaign.methods.getFundingSummary().call();

  const initialDetails = {
    title: BasicDetails[8],
    description: FundingDetails[3],
    imageHash: BasicDetails[5],
    rewards: BasicDetails[6],
    teamMembers: BasicDetails[7],
  };

  return { address: campaignAddress, initialDetails };
};

export default EditCampaign;
