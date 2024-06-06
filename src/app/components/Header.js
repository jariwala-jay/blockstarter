"use client";
import { ThirdwebProvider, ConnectButton, darkTheme } from 'thirdweb/react';
import { useEffect, useState } from 'react';
import { AppBar, Toolbar, Button, Typography, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';
import { createThirdwebClient } from "thirdweb";
import { createWallet, walletConnect, inAppWallet } from "thirdweb/wallets";

const Header = () => {
  const [client, setClient] = useState(null);
  const [wallets, setWallets] = useState(null);
  const [showConnectButton, setShowConnectButton] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

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

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <List>
        <ListItem button >
        <div className='mr-[15%] max-h-[10%] max-w-[30%]'>
                    {showConnectButton ? (
                      <ConnectWalletButton
                        client={client}
                        wallets={wallets}
                        onFailure={onFailure}
                      />
                    ) : (
                      <div style={{ width: '195px', height: '40px' }} />
                    )}
                  </div>
        </ListItem>
        <ListItem button component={Link} href="/">
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button component={Link} href="/campaigns">
          <ListItemText primary="Projects" />
        </ListItem>
        <ListItem button component={Link} href="/Faq">
          <ListItemText primary="FAQ" />
        </ListItem>
        <ListItem button component={Link} href="/community">
          <ListItemText primary="Community" />
        </ListItem>
        <ListItem button component={Link} href="/updates">
          <ListItemText primary="Updates" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <>
      <style jsx>{`
        .desktop-nav {
          display: none;
        }
        .mobile-nav {
          display: flex;
        }
        @media (min-width: 600px) {
          .desktop-nav {
            display: flex;
          }
          .mobile-nav {
            display: none;
          }
        }
      `}</style>
      <div className='relative bg-[#eefdfe] h-[12%]'>
        <div className='absolute top-0 right-0 bg-black h-[100%] w-1/2'>
        </div>
        <div className='max-w-[1440px] mx-auto'>
          <ThirdwebProvider client={client}>
            <AppBar position="static" sx={{ backgroundColor: '#000000', boxShadow: 'unset' }}>
              <Toolbar>
                <Typography
                  component="div"
                  sx={{
                    flexGrow: 1,
                    backgroundColor: '#eefdfe',
                    marginRight: '2%',
                    color: '#000000',
                    paddingY: '3.3%',
                    paddingX: '3.5%',
                    marginLeft: '-5%',
                    paddingLeft: '5.5%',
                    fontFamily: 'sofia',
                    fontWeight: 'bold',
                    fontSize: 'clamp(1.7rem, 2vw, 3rem)'
                  }}
                >
                  <Link href="/" passHref>
                    Blockstarter
                  </Link>
                </Typography>

                <div className="desktop-nav">
                  <Button color="inherit" component={Link} href="/campaigns" sx={{ marginX: '2%', fontSize: 'clamp(0.5rem, 1vw, 0.9rem)' }} className='font-nanum'>
                    Projects
                  </Button>
                  <Button color="inherit" component={Link} href="/Faq" sx={{ marginX: '2%', fontSize: 'clamp(0.5rem, 1vw, 0.9rem)' }} className='font-nanum'>
                    FAQ
                  </Button>
                  <Button color="inherit" component={Link} href="/community" sx={{ marginX: '2%', fontSize: 'clamp(0.5rem, 1vw, 0.9rem)' }} className='font-nanum'>
                    Community
                  </Button>
                  <Button color="inherit" component={Link} href="/updates" sx={{ marginX: '2%', fontSize: 'clamp(0.5rem, 1vw, 0.9rem)' , marginRight:'4%' }} className='font-nanum'>
                    Updates
                  </Button>
                  <div className='pr-[300px] max-h-[10%] max-w-[30%]'>
                    {showConnectButton ? (
                      <ConnectWalletButton
                        client={client}
                        wallets={wallets}
                        onFailure={onFailure}
                      />
                    ) : (
                      <div style={{ width: '195px', height: '40px' }} />
                    )}
                  </div>
                </div>

                <div className="mobile-nav">
                  <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="end"
                    onClick={handleDrawerToggle}
                  >
                    <MenuIcon />
                  </IconButton>
                  <Drawer
                    anchor="right"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                  >
                    {drawer}
                  </Drawer>
                </div>
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
        style: {
          fontSize: '0.75rem', // Smaller font size
          padding: '4px 8px',  // Smaller padding
        }
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
