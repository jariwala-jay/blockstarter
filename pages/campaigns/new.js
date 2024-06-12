import React, { useState } from 'react';
import Layout from '../../src/app/components/Layout';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import { useRouter } from 'next/router';
import { TextField, Button, CircularProgress, Snackbar, Typography, Box } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { create } from 'ipfs-http-client'; // Import IPFS client library

const ipfsClient = create({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' }); // Initialize IPFS client

const CampaignNew = () => {
  const router = useRouter();

  const [state, setState] = useState({
    minimumContribution: '',
    errorMessage: '',
    loading: false,
    title: '',
    description: '',
    photo: null, // Add state for photo
    successMessage: '',
    openSnackbar: false
  });

  const onSubmit = async (event) => {
    event.preventDefault();
    setState({ ...state, loading: true, errorMessage: '' });

    try {
      // Upload photo to Pinata
      const ipfsHash = await uploadPhotoToPinata(state.photo);

      // Create campaign with photo IPFS hash
      await factory.methods.createCampaign(
        state.title,
        state.description,
        web3.utils.toWei(state.minimumContribution, 'ether'),
        ipfsHash // Pass the IPFS hash to your smart contract
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
        photo: null // Reset photo state
      });
      router.push('/');
    } catch (err) {
      setState({ ...state, errorMessage: err.message, loading: false });
    }
  };

  const uploadPhotoToPinata = async (photo) => {
    try {
      const { cid } = await ipfsClient.add(photo); // Upload photo to IPFS
      return cid.toString(); // Return IPFS hash
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
            {/* Other form fields */}
            <Box sx={{ mb: 2 }}>
              <input
                type="file"
                accept="image/*"
                onChange={event => setState({ ...state, photo: event.target.files[0] })}
              />
            </Box>
            <Button
              variant="contained"
              // Other button styles
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
