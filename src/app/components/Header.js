"use client";
import { AppBar, Toolbar, Button, Typography } from '@mui/material';
import Link from 'next/link';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { useState } from 'react';

const Header = () => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [balance, setBalance] = useState(null);

  const connectWallet = async () => {
    if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
      try {
        window.ethereum.request({ method: 'eth_requestAccounts' });
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setWalletAddress(accounts[0]);
        // You can use ethers.js or web3.js to get the balance of the wallet
        // For simplicity, let's assume you're using ethers.js
        // Initialize ethers provider
        // const provider = new ethers.providers.Web3Provider(window.ethereum);
        // const signer = provider.getSigner();
        // const balance = await signer.getBalance();
        // setBalance(balance);
      } catch (error) {
        console.error('User denied account access or an error occurred', error);
      }
    } else {
      alert('Please install MetaMask!');
    }
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#000000', boxShadow: 'unset', maxWidth: '1440px', marginX: 'auto' }}>
      <Toolbar>
        <Typography
          variant="h5"
          component="div"
          sx={{
            flexGrow: 1,
            backgroundColor: '#eefdfe',
            marginRight: '20px',
            color: '#000000',
            paddingY: '42px',
            marginLeft: '-25px',
            paddingLeft: '65px',
          }}
        >
          <Link href="/" passHref>
            Blockstarter
          </Link>
        </Typography>

        <Button color="inherit" component={Link} href="/campaigns" sx={{ marginX: '20px' }} className='font-nanum'>
          Projects
        </Button>
        <Button color="inherit" component={Link} href="/Faq" sx={{ marginX: '20px' }} className='font-nanum'>
          FAQ
        </Button>
        <Button color="inherit" component={Link} href="/community" sx={{ marginX: '20px' }} className='font-nanum'>
          Community
        </Button>
        <Button color="inherit" component={Link} href="/updates" sx={{ marginX: '20px', marginRight: '300px' }} className='font-nanum'>
          Updates
        </Button>
        {walletAddress ? (
          <Typography
            sx={{
              marginX: '10px',
              marginRight: '100px',
              backgroundColor: '#eefdfe',
              color: '#000000',
              padding: '15px',
              paddingX: '25px',
              border: '3px solid',
              borderRadius: '30px',
              transition: 'all 0.3s ease-in-out',
            }}
            className='font-nanum'
          >
            {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)} ({balance} ETH)
          </Typography>
        ) : (
          <Button
            startIcon={<AccountBalanceWalletIcon />}
            onClick={connectWallet}
            sx={{
              marginX: '10px',
              marginRight: '100px',
              backgroundColor: '#eefdfe',
              color: '#000000',
              padding: '15px',
              paddingX: '25px',
              border: '3px solid',
              borderRadius: '30px',
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                color: 'white',
                borderColor: '#eefdfe',
              },
            }}
            className='font-nanum'
          >
            Connect Wallet
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
