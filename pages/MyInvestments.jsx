import React, { useEffect, useState } from 'react';
import Layout from '../src/app/components/Layout';
import factory from '../ethereum/factory';
import Campaign from '../ethereum/campaign';
import web3 from '../ethereum/web3';
import { CircularProgress, Box, Typography } from '@mui/material';

const Investments = () => {
  const [state, setState] = useState({
    investments: [],
    loading: true,
    errorMessage: ''
  });

  useEffect(() => {
    const fetchInvestments = async () => {
      try {
        const accounts = await web3.eth.getAccounts();
        if (accounts.length != 0){
        const deployedCampaigns = await factory.methods.getDeployedCampaigns().call();
        
        const investments = await Promise.all(deployedCampaigns.map(async (campaignAddress) => {
          const campaign = Campaign(campaignAddress);
          const contribution = await campaign.methods.contributions(accounts[0]).call();
          
          if (contribution > 0) {
            // User has contributed to this campaign
            const campaignDetails = await campaign.methods.campaignDetails().call();
            return { address: campaignAddress, contribution: contribution, ...campaignDetails };
          } else {
            return null; // User has not contributed to this campaign
          }
        }));

        // Filter out null values (campaigns where user has not contributed)
        const userInvestments = investments.filter(investment => investment !== null);

        setState({ ...state, investments: userInvestments, loading: false });
    }
    setState({ ...state, loading: false });
      } catch (err) {
        setState({ ...state, errorMessage: err.message, loading: false });
      }
    };
    
    fetchInvestments();
  }, []);

  return (
    <Layout>
      <div className='max-w-[1440px] mx-auto px-8'>
        <Box sx={{ maxWidth: '800px', mx: 'auto', mt: 4 }}>
          <h1 className="text-3xl mt-6 mb-4 font-sofia font-semibold text-center">Your Investments</h1>
          {state.loading ? (
            <CircularProgress />
          ) : (
            <div>
              {state.investments.length === 0 ? (
                <Typography variant="body1" color="error" gutterBottom className='text-center'>
                  You haven't invested in any projects yet.
                </Typography>
              ) : (
                <div className='text-black'>
                  {state.investments.map((investment, index) => (
                    <Box
                      key={index}
                      sx={{
                        p: 2,
                        border: '1px solid #ccc',
                        borderRadius: '8px',
                        mt: 2,
                        backgroundColor: '#eefdfe'
                      }}
                    >
                      <Typography variant="h6">{`Project: ${investment.address}`}</Typography>
                      <Typography variant="body1">{`Your Contribution: ${web3.utils.fromWei(investment.contribution, 'ether')} ETH`}</Typography>
                      <Typography variant="body2">{`Title: ${investment.title}`}</Typography>
                      <Typography variant="body2">{`Description: ${investment.description}`}</Typography>
                      {/* Add other details you want to display */}
                    </Box>
                  ))}
                </div>
              )}
            </div>
          )}
          {state.errorMessage && (
            <Typography variant="body2" color="error" gutterBottom>
              {state.errorMessage}
            </Typography>
          )}
        </Box>
      </div>
    </Layout>
  );
}

export default Investments;
