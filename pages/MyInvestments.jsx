import React, { useEffect, useState } from 'react';
import Layout from '../src/app/components/Layout';
import factory from '../ethereum/factory';
import Campaign from '../ethereum/campaign';
import web3 from '../ethereum/web3';
import Link from 'next/link';
import { Card, CardContent, Typography, Box, LinearProgress, Grid, CardMedia, Divider } from '@mui/material';
import InvestmentCardSkeleton from '../src/app/components/InvestmentCardSkeleton';

const getIPFSImageURL = (ipfsHash) => `https://gateway.pinata.cloud/ipfs/${ipfsHash}`;

const Investments = () => {
  const [investments, setInvestments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [walletConnected, setWalletConnected] = useState(false);

  useEffect(() => {
    const fetchInvestments = async () => {
      try {
        const accounts = await web3.eth.getAccounts();
        if (accounts.length !== 0) {
          setWalletConnected(true);

          const deployedCampaigns = await factory.methods.getDeployedCampaigns().call();

          // Filter only the campaigns where the user has made contributions
          const investedCampaigns = await Promise.all(deployedCampaigns.map(async (campaignAddress) => {
            const campaign = Campaign(campaignAddress);
            const contribution = await campaign.methods.contributions(accounts[0]).call();

            if (contribution > 0) {
              const campaignDetails = await campaign.methods.campaignDetails().call();
              const fundingDetails = await campaign.methods.fundingDetails().call();
              const otherDetails = await campaign.methods.getOtherDetails().call();

              const remainingGoal = fundingDetails.remainingGoal.toString();
              const timeLeft = (await campaign.methods.getTimeLeft().call()).toString();
              const targetAmount = fundingDetails.fundingGoal.toString();
              const investors = otherDetails[2].toString();
              const remainingBalance = fundingDetails.remainingGoal.toString();
              const imageHash = campaignDetails.photoHash.toString();
              const req = otherDetails[1].toString();
              const image = getIPFSImageURL(imageHash);
              const isClosed = otherDetails[3];

              return {
                address: campaignAddress,
                contribution,
                title: campaignDetails.title,
                description: campaignDetails.description,
                targetAmount,
                remainingBalance,
                timeLeft,
                image,
                req,
                isClosed
              };
            } else {
              return null;
            }
          }));

          // Update state with invested campaigns
          const userInvestments = investedCampaigns.filter(investment => investment !== null);
          setInvestments(userInvestments);
          setLoading(false);
        } else {
          setLoading(false);
        }
      } catch (err) {
        console.error(err);
        setErrorMessage(err.message);
        setLoading(false);
      }
    };

    fetchInvestments();
  }, []);

  const InvestmentCard = ({ title, description, address, contribution, targetAmount, remainingBalance, timeLeft, image, req, isClosed }) => {
    const target = targetAmount ? parseFloat(web3.utils.fromWei(targetAmount, "ether")) : 0;
    const remaining = remainingBalance ? parseFloat(web3.utils.fromWei(remainingBalance, "ether")) : 0;
    const raisedAmount = target - remaining;
    const progress = Math.round(Math.min((raisedAmount / target) * 100, 100) * 100) / 100;
    const daysLeft = timeLeft ? Math.floor(timeLeft / (60 * 60 * 24)) : 0;

    const contributeLink = `/campaigns/${address}`;

    return (
      <Card sx={{ maxWidth: 310, minWidth: 220, minHeight: 500, borderRadius: 2, boxShadow: 3, padding: 0.2, backgroundColor: isClosed ? "#808080" : "#eefdfe", display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative', marginBottom: 2 }}>
        <CardMedia
          component="img"
          height="200"
          image={image}
          alt={title}
          className='p-[5px] h-[200px]'
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h6" component="div" className='font-sofia font-semibold h-[60px]'>
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary" className='h-[70px]'>
            {description}
          </Typography>
          <Typography variant="body2" color="text.primary" className='font-sofia font-semibold mt-[3px]'>
            Raised
          </Typography>
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              height: 10,
              borderRadius: 5,
              mt: 1,
              backgroundColor: "#f5f5f5",
              "& .MuiLinearProgress-bar": {
                backgroundColor: "#f36128",
              },
            }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
            <Typography variant="body2" color="text.secondary">
              {progress}%
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {daysLeft} days left
            </Typography>
          </Box>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                <Grid item xs={4}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="body2" color="text.secondary">
                      Contribution
                    </Typography>
                    <Typography variant="body2" color="text.primary">
                      {web3.utils.fromWei(contribution, 'ether')} ETH
                    </Typography>
                  </Box>
                </Grid>
                <Divider orientation="vertical" flexItem />
                <Grid item xs={4}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="body2" color="text.secondary">
                      Target
                    </Typography>
                    <Typography variant="body2" color="text.primary">
                      {web3.utils.fromWei(targetAmount, 'ether')} ETH
                    </Typography>
                  </Box>
                </Grid>
                <Divider orientation="vertical" flexItem />
                <Grid item xs={4}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="body2" color="text.secondary">
                      Requests
                    </Typography>
                    <Typography variant="body2" color="text.primary">
                      {req}
                    </Typography>
                  </Box>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
        {!contribution && (
          <Box sx={{ p: 2, textAlign: 'center', backgroundColor: '#f36128', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}>
            <Link href={contributeLink} passHref>
              <span>
                Please Contribute
              </span>
            </Link>
          </Box>
        )}
      </Card>
    );
  };

  return (
    <Layout>
      <div className='max-w-[1440px] mx-auto px-[4rem]'>

        <h1 className="text-3xl mt-6 mb-4 font-sofia font-semibold text-center">Your Investments</h1>

        {loading ? (
          <div className="flex flex-center">
            <Grid container spacing={4} className='mx-auto sm:mx-0 justify-center sm:justify-normal'>
              {Array.from(new Array(4)).map((_, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index} sx={{ maxWidth: '310px' }}>
                  <InvestmentCardSkeleton />
                </Grid>
              ))}
            </Grid>
          </div>
        ) : (
          <div>
            {errorMessage && (
              <Typography variant="body2" color="error" gutterBottom>
                {errorMessage}
              </Typography>
            )}

            {!walletConnected && (
              <Typography variant="body2" color="error" gutterBottom className='text-center'>
                Please connect your wallet first.
              </Typography>
            )}

            {walletConnected && investments.length === 0 && (
              <>
              <Typography variant="body1" color="error" gutterBottom className='text-center'>
                You haven't invested in any projects yet.
              </Typography>
              <Link href="/campaigns">
              <Typography variant="body1" color="primary" gutterBottom className='text-center'>
                Click Here to see Top Projects to Invest.
              </Typography>
              </Link>
              </>
            )}

            {investments.length > 0 && (
              <div className='text-black'>
                <Grid container spacing={4} className='mx-auto sm:mx-0 justify-center sm:justify-normal'>
                  {investments.map((investment, index) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={index} sx={{ maxWidth: '310px' }}>
                      <InvestmentCard
                        title={investment.title}
                        description={investment.description}
                        address={investment.address}
                        contribution={investment.contribution}
                        targetAmount={investment.targetAmount}
                        remainingBalance={investment.remainingBalance}
                        timeLeft={investment.timeLeft}
                        image={investment.image}
                        req={investment.req}
                        isClosed={investment.isClosed}
                      />
                    </Grid>
                  ))}
                </Grid>
              </div>
            )}
          </div>
        )}

      </div>
    </Layout>
  );
};

export default Investments;
