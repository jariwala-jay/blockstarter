import React, { useState, useEffect } from 'react';
import Layout from '../src/app/components/Layout';
import Link from 'next/link';
import factory from '../ethereum/factory';
import Campaign from '../ethereum/campaign';
import { Card,CardContent,Typography,Box,LinearProgress,Grid, Button, IconButton, TextField, Select, MenuItem, Skeleton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import InvestmentCard from '../src/app/components/InvestmentCard';
import Divider from '@mui/material/Divider';
import InvestmentCardSkeleton from '../src/app/components/InvestmentCardSkeleton';

// Get IPFS image URL from Pinata
const getIPFSImageURL = (ipfsHash) => `https://gateway.pinata.cloud/ipfs/${ipfsHash}`;

const Campaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [numSkeletons, setNumSkeletons] = useState(4);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const campaignAddresses = await factory.methods.getDeployedCampaigns().call();
        setNumSkeletons(campaignAddresses.length);
        const campaignDetails = await Promise.all(
          campaignAddresses.map(async (address) => {
            const campaign = Campaign(address);
            const CampaignDetails = await campaign.methods.campaignDetails().call();
            const Fundingdetails = await campaign.methods.fundingDetails().call();
            const Otherdetails = await campaign.methods.getOtherDetails().call();
            const title = CampaignDetails.title.toString();
            const description = CampaignDetails.description.toString();
            const raise = Fundingdetails.remainingGoal.toString();
            const timeLeft = (await campaign.methods.getTimeLeft().call()).toString();
            const target = Fundingdetails.fundingGoal.toString();
            const minimumContribution = Fundingdetails.minimumContribution.toString();
            const investors = Otherdetails[2].toString();
            const RemainingBalance = Fundingdetails.remainingGoal.toString();
            const imageHash = CampaignDetails.photoHash.toString();
            const isClosed = Otherdetails[3];
            return { address, title, description, imageHash, raise, timeLeft, target, minimumContribution, investors, RemainingBalance, isClosed };
          })
        );

        setCampaigns(campaignDetails);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filterCampaigns = () => {
    return campaigns.filter((campaign) => {
      const matchesSearch = campaign.title.toLowerCase().includes(searchQuery.toLowerCase());
      const isOpen = !campaign.isClosed;
      if (filter === 'all') return matchesSearch;
      if (filter === 'open') return matchesSearch && isOpen;
      if (filter === 'closed') return matchesSearch && !isOpen;
      return false;
    });
  };

  const renderCampaigns = () => {
    if (loading) {
      return (
        <Grid container spacing={4} className='mx-auto sm:mx-0 justify-center sm:justify-normal'>
          {Array.from(new Array(numSkeletons)).map((_, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index} sx={{ maxWidth: '310px' ,marginTop:'2rem', 
             paddingRight: {
              sm: '2rem', // Apply padding only on small screens and up
            },
   
        paddingLeft: '0!important', // Apply padding only on small screens 
            }}>
                  <InvestmentCardSkeleton />
            </Grid>
          ))}
        </Grid>
      );
    }

    return filterCampaigns().map((campaign, index) => {
      const shortDescription = campaign.description.split(' ').slice(0, 10).join(' ') + '...';
      const image = getIPFSImageURL(campaign.imageHash);

      return (
        <Grid item xs={12} sm={6} md={4} lg={3} key={index}  
        sx={{ maxWidth: '310px',
        paddingRight: {
              sm: '2rem', // Apply padding only on small screens and up
            },
   
        paddingLeft: '0!important', // Apply padding only on small screens and up
   
        }}>
          <Link href={`campaigns/${campaign.address}`} passHref style={{ display: 'block', textDecoration: 'none', maxWidth: '310px' }}>
            <InvestmentCard
              title={campaign.title}
              description={shortDescription}
              image={image}
              raised={campaign.raise}
              timeLeft={campaign.timeLeft}
              minimumContribution={campaign.minimumContribution}
              target={campaign.target}
              investors={campaign.investors}
              RemainingBalance={campaign.RemainingBalance}
              isClosed={campaign.isClosed}
            />
          </Link>
        </Grid>
      );
    });
  };

  return (
    <Layout>
      <div className="max-w-[1440px] mx-auto px-[1rem] sm:px-[4rem]">
        <h1 className="text-center text-[1.5rem] md:text-3xl mt-6 mb-3 font-sofia font-semibold">
          Listed Projects
        </h1>
        <div className="relative max-w-[1440px] flex py-[1rem] flex-wrap mb-3">
          <div className="flex justify-between space-x-6 w-full max-w-[1280px]">
            <TextField
              variant="outlined"
              placeholder="Search"
              value={searchQuery}
              onChange={handleSearchChange}
              size="small"
              className="bg-white text-black rounded-full w-full p-2 text-center "
              InputProps={{
                sx: {
                  '& .MuiOutlinedInput-notchedOutline': {
                    border: 'none',
                  },
                  '& .MuiInputBase-input': {
                    '&:focus': {
                      outline: 'none',
                    },
                  },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      border: 'none',
                    },
                  },
                },
              }}
            />
            <Select
              value={filter}
              onChange={handleFilterChange}
              variant="outlined"
              size="small"
              className="bg-white text-black rounded-[30px] text-center lg:w-[100px]"
              sx={{
                height: '60px',
                width: '70px',
                '& .MuiOutlinedInput-notchedOutline': {
                  border: 'none',
                },
                '&:focus': {
                  outline: 'none',
                },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    border: 'none',
                  },
                },
              }}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="open">Open</MenuItem>
              <MenuItem value="closed">Closed</MenuItem>
            </Select>
            <Button
              className='md:min-w-[210px] text-center'
              component={Link}
              href="/campaigns/new"
              sx={{
                fontFamily: 'nanum',
                backgroundColor: '#f36128',
                color: '#ffffff',
                padding: '15px 20px',
                border: '3px solid',
                borderColor: 'black',
                borderRadius: '30px',
                transition: 'all 0.3s ease-in-out',
                display: {
                  xs: 'none',
                  md: 'block',
                },
                '&:hover': {
                  color: '#f36128',
                  borderColor: '#f36128',
                },
                '&:focus': {
                  outline: 'none',
                },
              }}
            >
              Create New Project
            </Button>
            <IconButton
              component={Link}
              href="/campaigns/new"
              sx={{
                backgroundColor: '#f36128',
                color: '#ffffff',
                border: '3px solid',
                borderColor: 'black',
                borderRadius: '50%',
                transition: 'all 0.3s ease-in-out',
                px: '15px',
                display: {
                  xs: 'block',
                  md: 'none',
                },
                '&:hover': {
                  color: '#f36128',
                  borderColor: '#f36128',
                },
                '&:focus': {
                  outline: 'none',
                },
              }}
            >
              <AddIcon />
            </IconButton>
          </div>
        </div>
        <div className="flex flex-center">
          <Grid container spacing={4} className='mx-auto sm:mx-0 justify-center sm:justify-normal'>
            {renderCampaigns()}
          </Grid>
        </div>
      </div>
    </Layout>
  );
};

export default Campaigns;
