import React, { useState } from 'react';
import Layout from '../../src/app/components/Layout';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import { useRouter } from 'next/router';
import { TextField, Button, CircularProgress, Snackbar, Typography, Box,Paper } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import axios from 'axios';

const CampaignNew = () => {
  const router = useRouter();

  const [state, setState] = useState({
    minimumContribution: '',
    errorMessage: '',
    loading: false,
    title: '',
    description: '',
    photo: null,
    successMessage: '',
    openSnackbar: false,
    fundingGoal: '',
    duration: '',
    rewards: '',
    teamMembers: ''
  });

  const onSubmit = async (event) => {
    event.preventDefault();
    if (!state.photo) {
      setState({ ...state, errorMessage: 'Please upload a photo.' });
      return;
    }
    setState({ ...state, loading: true, errorMessage: '' });

    try {
      const ipfsHash = await uploadPhotoToPinata(state.photo);

      const gasEstimate = await factory.methods.createCampaign(
        state.title,
        state.description,
        web3.utils.toWei(state.minimumContribution, 'ether'),
        ipfsHash,
        web3.utils.toWei(state.fundingGoal, 'ether'),
        state.duration,
        state.rewards,
        state.teamMembers
      ).estimateGas({ from: ethereum.selectedAddress });

      await factory.methods.createCampaign(
        state.title,
        state.description,
        web3.utils.toWei(state.minimumContribution, 'ether'),
        ipfsHash,
        web3.utils.toWei(state.fundingGoal, 'ether'),
        state.duration,
        state.rewards,
        state.teamMembers
      ).send({
        from: ethereum.selectedAddress,
        gas: gasEstimate
      });

      setState({
        ...state,
        successMessage: 'Campaign created successfully!',
        openSnackbar: true,
        loading: false,
        minimumContribution: '',
        title: '',
        description: '',
        photo: null,
        fundingGoal: '',
        duration: '',
        rewards: '',
        teamMembers: ''
      });
      router.push('/campaigns');
    } catch (err) {
      setState({ ...state, errorMessage: err.message, loading: false });
    }
  };

  const uploadPhotoToPinata = async (photo) => {
    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
    const data = new FormData();
    data.append('file', photo);

    try {
      const response = await axios.post(url, data, {
        headers: {
          'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
          pinata_api_key: process.env.PINATA_API_KEY,
          pinata_secret_api_key: process.env.PINATA_SECRET_API_KEY
        }
      });
      return response.data.IpfsHash;
    } catch (error) {
      console.error('Error uploading photo to Pinata:', error.message);
      throw error;
    }
  };

  const handleCloseSnackbar = () => {
    setState({ ...state, openSnackbar: false });
  };

  return (
    <Layout>
      <div className='mt-[2rem] max-w-[800px] mx-auto'>
      <h1 className="text-3xl mt-6 mb-4 font-sofia font-semibold text-center">Create New Project</h1>
      <Paper
          className='mx-[2rem]'
          elevation={3}
          style={{
            padding: "20px",
            backgroundColor: "#eefdfe",
            borderRadius: "15px",
          }}
        >
          
          <form onSubmit={onSubmit}>
            <Box sx={{ mb: 2 }}>
              <TextField
                label="Title"
                fullWidth
                value={state.title}
                required
                onChange={event => setState({ ...state, title: event.target.value })}
                InputProps={{
                    style: { color: "#000000" },
                  }}
                  InputLabelProps={{
                    style: { color: "#000000" },
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "&.Mui-focused fieldset": {
                        borderColor: "black",
                      },
                      "&:hover fieldset": {
                        borderColor: "black",
                      },
                      borderColor: "black",
                    },
                  }}
                  className="text-[#000000]"
              />
            </Box>
            <Box sx={{ mb: 2 }}>
              <TextField
                label="Description"
                fullWidth
                multiline
                rows={4}
                value={state.description}
                required
                onChange={event => setState({ ...state, description: event.target.value })}
                InputProps={{
                    style: { color: "#000000" },
                  }}
                  InputLabelProps={{
                    style: { color: "#000000" },
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "&.Mui-focused fieldset": {
                        borderColor: "black",
                      },
                      "&:hover fieldset": {
                        borderColor: "black",
                      },
                      borderColor: "black",
                    },
                  }}
                  className="text-[#000000]"
              />
            </Box>
            <Box sx={{ mb: 2 }}>
              <TextField
                label="Minimum Contribution (ether)"
                fullWidth
                value={state.minimumContribution}
                required
                onChange={event => setState({ ...state, minimumContribution: event.target.value })}
                InputProps={{
                    endAdornment: 'Ether',
                    style: { color: "#000000" },
                  }}
                  InputLabelProps={{
                    style: { color: "#000000" },
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "&.Mui-focused fieldset": {
                        borderColor: "black",
                      },
                      "&:hover fieldset": {
                        borderColor: "black",
                      },
                      borderColor: "black",
                    },
                  }}
                  className="text-[#000000]"
              />
            </Box>
            <Box sx={{ mb: 2 }}>
              <TextField
                label="Funding Goal (ether)"
                fullWidth
                value={state.fundingGoal}
                required
                onChange={event => setState({ ...state, fundingGoal: event.target.value })}
                InputProps={{
                  endAdornment: 'Ether',
                  style: { color: 'black' }
                }}
                  InputLabelProps={{
                    style: { color: "#000000" },
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "&.Mui-focused fieldset": {
                        borderColor: "black",
                      },
                      "&:hover fieldset": {
                        borderColor: "black",
                      },
                      borderColor: "black",
                    },
                  }}
                  className="text-[#000000]"
              />
            </Box>
            <Box sx={{ mb: 2 }}>
              <TextField
                label="Campaign Duration (days)"
                fullWidth
                value={state.duration}
                required
                onChange={event => setState({ ...state, duration: event.target.value })}
                InputProps={{
                    style: { color: "#000000" },
                  }}
                  InputLabelProps={{
                    style: { color: "#000000" },
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "&.Mui-focused fieldset": {
                        borderColor: "black",
                      },
                      "&:hover fieldset": {
                        borderColor: "black",
                      },
                      borderColor: "black",
                    },
                  }}
                  className="text-[#000000]"
              />
            </Box>
            <Box sx={{ mb: 2 }}>
              <TextField
                label="Rewards"
                fullWidth
                multiline
                rows={4}
                value={state.rewards}
                required
                onChange={event => setState({ ...state, rewards: event.target.value })}
                InputProps={{
                    style: { color: "#000000" },
                  }}
                  InputLabelProps={{
                    style: { color: "#000000" },
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "&.Mui-focused fieldset": {
                        borderColor: "black",
                      },
                      "&:hover fieldset": {
                        borderColor: "black",
                      },
                      borderColor: "black",
                    },
                  }}
                  className="text-[#000000]"
              />
            </Box>
            <Box sx={{ mb: 2 }}>
              <TextField
                label="Team Members"
                fullWidth
                multiline
                rows={4}
                value={state.teamMembers}
                required
                onChange={event => setState({ ...state, teamMembers: event.target.value })}
                InputProps={{
                    style: { color: "#000000" },
                  }}
                  InputLabelProps={{
                    style: { color: "#000000" },
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "&.Mui-focused fieldset": {
                        borderColor: "black",
                      },
                      "&:hover fieldset": {
                        borderColor: "black",
                      },
                      borderColor: "black",
                    },
                  }}
                  className="text-[#000000]"
              />
            </Box>
            <Box sx={{ mb: 2 }}>
              <label className="block mb-2 text-md font-sofia font-medium text-black pl-[12px]" htmlFor="file_input">Cover Image*</label>
              <input
                className='block w-full text-md text-black pl-[10px] py-[0.8rem] border border-[#ADAFB3] hover:border-black rounded-md cursor-pointer  focus:outline-none '
                type="file"
                accept="image/*"
                required
                onChange={event => setState({ ...state, photo: event.target.files[0] })}
              />
            </Box>
            {state.errorMessage && (
              <Typography variant="body2" color="error" gutterBottom className='text-center mt-[8px]'>
                {state.errorMessage}
              </Typography>
            )}
            <Button
              variant="contained"
              sx={{
                fontFamily: 'nanum',
                backgroundColor: '#f36128',
                color: '#ffffff',
                padding: '20px',
                width: '190px',
                border: '2px solid',
                borderColor: '#f36128',
                borderRadius: '30px',
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  color: '#f36128',
                  borderColor: '#f36128',
                  backgroundColor: 'transparent'
                },
                marginTop: '10px',
              }}
              type="submit"
              disabled={state.loading}
              className='flex mx-auto'
            >
              {state.loading ? <CircularProgress size={24} className='text-[#f36128]' /> : 'Create'}
            </Button>
            <Snackbar
              open={state.openSnackbar}
              autoHideDuration={6000}
              onClose={handleCloseSnackbar}
            >
              <MuiAlert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                {state.successMessage}
              </MuiAlert>
            </Snackbar>
          </form>
        </Paper>
      </div>
    </Layout>
  );
}

export default CampaignNew;
