import React from 'react';
import Layout from '../../../src/app/components/Layout';
import Campaign from '../../../ethereum/campaign';
import { Grid, Card, Typography, Button , CardContent } from '@mui/material';
import web3 from '../../../ethereum/web3';
import ContributeForm from '../../../src/app/components/ContributeForm';
import Link from 'next/link';

export default function CampaignShow(props) {
  const {
    title,
    Description,
    contractBalance,
    manager,
    minimumContribution,
    requestCount,
    approversCount,
    address
  } = props;

  const renderCards = () => {
    const items = [
      {
        title: title,
        meta: 'About Campaign',
        description: Description
      },
      {
        title: manager,
        meta: 'Address of Manager',
        description: 'Manager created this campaign and can create requests to withdraw money'
      },
      {
        title: web3.utils.fromWei(minimumContribution, 'ether'),
        meta: 'Minimum Contribution (ether)',
        description: 'You must contribute at least this much ETH to become an approver'
      },
      {
        title: requestCount,
        meta: 'Number of Requests',
        description: 'A request tries to withdraw money from the contract. Requests must be approved by approvers'
      },
      {
        title: approversCount,
        meta: 'Number of Contributors',
        description: 'Number of people who have already contributed'
      },
      {
        title: web3.utils.fromWei(contractBalance, 'ether'),
        meta: 'Campaign Balance (ether)',
        description: 'The balance is how much money this campaign has left'
      }
    ];

    return (
      <Grid container spacing={2}>
        {items.map((item, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <Card sx={{ backgroundColor: '#eefdfe', boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)' , fontFamily:'nanum' ,height:'130px'}}>
              <CardContent>
                <Typography variant="p" gutterBottom className='text-[1.2rem] font-semibold'>
                  {item.title}
                </Typography>
                <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                  {item.meta}
                </Typography>
                <Typography variant="body2">
                  {item.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  };

  return (
    <Layout>
    <div className='max-w-[1440px] mx-auto '>
      <h1 className="text-3xl mt-6 mb-4 font-sofia font-semibold text-center">Campaign Details</h1>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          {renderCards()}
        </Grid>
        <Grid item xs={12} md={4}>
          <ContributeForm address={address} />
          <Link href={`/campaigns/${address}/requests`} passHref>
            <Button variant="contained" sx={{
            fontFamily:'nanum',
            backgroundColor: '#f36128',
            color: '#ffffff',
            padding: '20px',
            width:'190px',
            border: '2px solid',
            borderColor: '#f36128',
            borderRadius: '30px',
            transition: 'all 0.3s ease-in-out',
            '&:hover': {
              color: '#f36128',
              borderColor: '#f36128',
              backgroundColor: 'transparent'
            },
            marginTop:'1rem',
            marginLeft:'30%'
          }}
        > View Requests</Button>
          </Link>        
        </Grid>
          
      </Grid>
      </div>
    </Layout>
  );
}

CampaignShow.getInitialProps = async ({ query }) => {
    const { campaignAddress } = query;
    const campaign = Campaign(campaignAddress);
  
    const summary = await campaign.methods.getSummary().call();
    const title = await campaign.methods.CampaignTitle().call();
    const Description = await campaign.methods.CampaignDescription().call();
  
    // Convert BigInt values to strings or numbers
    const minimumContribution = summary[0].toString(); // or summary[0].toNumber()
    const contractBalance = summary[1].toString(); // or summary[1].toNumber()
    const requestCount = summary[2].toString(); // or summary[2].toNumber()
    const approversCount = summary[3].toString(); // or summary[3].toNumber()
  
    return {
      title: title,
      Description: Description,
      address: campaignAddress,
      minimumContribution: minimumContribution,
      contractBalance: contractBalance,
      requestCount: requestCount,
      approversCount: approversCount,
      manager: summary[4]
    };
};
