"use client"
import { ThirdwebProvider, ConnectButton, darkTheme } from 'thirdweb/react';
import { useEffect, useState } from 'react';
import { AppBar, Toolbar, Button, Typography } from '@mui/material';
import Link from 'next/link';
import { createThirdwebClient } from "thirdweb";
import { createWallet, walletConnect, inAppWallet } from "thirdweb/wallets";

const Header = () => {
  const [client, setClient] = useState(null);
  const [wallets, setWallets] = useState(null);
  const [showConnectButton, setShowConnectButton] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (isInitialized) return;

    const initializeThirdweb = async () => {
      const thirdwebClient = createThirdwebClient({
        clientId: "45d7da099d921451fb82e62733d35768",
      });

      const walletList = [
        createWallet("io.metamask"),
        createWallet("com.coinbase.wallet"),
        walletConnect(),
        inAppWallet({
          auth: {
            options: [
              "email",
              "google",
              "apple",
              "facebook",
              "phone",
            ],
          },
        }),
        createWallet("me.rainbow"),
        createWallet("app.phantom"),
      ];

      setClient(thirdwebClient);
      setWallets(walletList);
      setShowConnectButton(true); // Set to true when client and wallets are initialized
      setIsInitialized(true);

    };

    initializeThirdweb();
  }, []);

  const onFailure = (error) => {
    console.error('Connection error:', error);
    if (error?.response?.data) {
      console.error('Error details:', error.response.data);
    }
  };


  return (
    <>
    <div className='relative bg-[#eefdfe] h-[122px] '>
    <div className='absolute top-0 right-0 bg-black h-[122px] w-1/2  '>
    </div>
    <div className='max-w-[1440px] mx-auto '>
    <ThirdwebProvider client={client}>
      <AppBar position="static" sx={{ backgroundColor: '#000000', boxShadow: 'unset', height:'125px'}}>
        <Toolbar>
          <Typography
            variant="h4"
            component="div"
            sx={{
              flexGrow: 1,
              backgroundColor: '#eefdfe',
              marginRight: '20px',
              color: '#000000',
              paddingY: '40px',
              marginLeft: '-25px',
              paddingLeft: '65px',
              fontFamily:'sofia',
              fontWeight:'bold'
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
          
          {showConnectButton ? (
            <ConnectWalletButton
              client={client}
              wallets={wallets}
              onFailure={onFailure}
            />
          ) : (
            <div style={{ width: '195px', height: '40px' }} /> 
          )}
          
        </Toolbar>
      </AppBar>

        </ThirdwebProvider> 
        </div>
        </div>
        </>
  );
};

const ConnectWalletButton = ({ client, wallets, onFailure }) => {
  return (
    <ConnectButton 
      client={client}
      wallets={wallets}
      theme={darkTheme({
        colors: {
          accentText: "#eefdfe",
          accentButtonBg: "#eefdfe",
          primaryText: "#ffffff",
          secondaryButtonText: "#ffffff",
          accentButtonText: "#131418",
        },
      })}
      connectButton={{
        label: "Connect Wallet",
      }}
      connectModal={{
        size: "wide",
        title: "Blockstarter",
        titleIcon: "",
      }}
      onFailure={onFailure}
    />
  );
};

export default Header;

