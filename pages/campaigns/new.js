import React, { useState } from 'react';
import Layout from '../../src/app/components/Layout';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import { useRouter } from 'next/router';
import { TextField, Button, CircularProgress, Snackbar, Typography, Box } from '@mui/material';
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
    openSnackbar: false
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

      await factory.methods.createCampaign(
        state.title,
        state.description,
        web3.utils.toWei(state.minimumContribution, 'ether'),
        ipfsHash
      ).send({
        from: ethereum.selectedAddress
      });

      setState({
        ...state,
        successMessage: 'Campaign created successfully!',
        openSnackbar: true,
        loading: false,
        minimumContribution: '',
        title: '',
        description: '',
        photo: null
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
      <div className='max-w-[1440px] mx-auto'>
        <Box sx={{ maxWidth: '600px', mx: 'auto', mt: 4 }}>
          <h1 className="text-3xl mt-6 mb-4 font-sofia font-semibold text-center">Create New Project</h1>
          <form onSubmit={onSubmit}>
            <Box sx={{ mb: 2 }}>
              <TextField
                label="Title"
                fullWidth
                value={state.title}
                required
                onChange={event => setState({ ...state, title: event.target.value })}
                InputLabelProps={{
                  style: { color: 'white' }
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': {
                      borderColor: '#f36128'
                    },
                    '&:hover fieldset': {
                      borderColor: '#f36128'
                    },
                    borderColor: '#f36128'
                  },
                  input: { color: 'white' }
                }}
              />
            </Box>
            <Box sx={{ mb: 2 }}>
              <TextField
                label="Description"
                fullWidth
                value={state.description}
                required
                onChange={event => setState({ ...state, description: event.target.value })}
                InputLabelProps={{
                  style: { color: 'white' }
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': {
                      borderColor: '#f36128'
                    },
                    '&:hover fieldset': {
                      borderColor: '#f36128'
                    },
                    borderColor: '#f36128'
                  },
                  input: { color: 'white' }
                }}
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
                  style: { color: 'white' }
                }}
                InputLabelProps={{
                  style: { color: 'white' }
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': {
                      borderColor: '#f36128'
                    },
                    '&:hover fieldset': {
                      borderColor: '#f36128'
                    },
                    borderColor: '#f36128'
                  },
                  input: { color: 'white' }
                }}
              />
            </Box>
            <Box sx={{ mb: 2 }}>
            <label class="block mb-2 text-md font-sofia font-medium text-white pl-[12px]" for="file_input">Cover Image*</label>
              <input
                className='block w-full text-md text-white pl-[10px] py-[0.8rem] border border-transparent hover:border-[#f36128] rounded-md cursor-pointer  focus:outline-none '
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
                marginLeft: '30%'
              }}
              type="submit"
              disabled={state.loading}
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
        </Box>
      </div>
    </Layout>
  );
}

export default CampaignNew;
