"use client";
import { ThirdwebProvider, ConnectButton, darkTheme } from "thirdweb/react";
import { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  styled,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import { createThirdwebClient } from "thirdweb";
import { createWallet, walletConnect, inAppWallet } from "thirdweb/wallets";

const CustomAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: "transparent",
  boxShadow: "unset",
}));
const RoundedBackground = styled(Box)(({ theme }) => ({
  backgroundColor: "#000000",
  borderRadius: "0 0 0 200px",
  height: "100%",
  width: "100%", // Default width to cover the entire app bar
  position: "absolute",
  top: 0,
  left: "calc(27% + 20px)", // Adjust this to start after the Blockstarter text
  zIndex: -1,
  "@media (max-width: 600px)": {
    width: "0", // Set width to 0 on mobile devices
  },
}));

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
        clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
      });

      const walletList = [
        createWallet("io.metamask"),
        createWallet("com.coinbase.wallet"),
        walletConnect(),
        inAppWallet({
          auth: {
            options: ["email", "google", "apple", "facebook", "phone"],
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
  }, [isInitialized]);

  const onFailure = (error) => {
    console.error("Connection error:", error);
    if (error?.response?.data) {
      console.error("Error details:", error.response.data);
    }
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div >
      <List>
        <ListItem button>
          <div className="mr-[15%] max-h-[10%] max-w-[30%]">
            {showConnectButton ? (
              <ConnectWalletButton
                client={client}
                wallets={wallets}
                onFailure={onFailure}
              />
            ) : (
              <div style={{ width: "195px", height: "40px" }} />
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
      <div className="relative bg-[#eefdfe] h-[12%]">
        <div className="absolute top-0 right-0 bg-black h-[100%] w-[10%] sm:w-1/2"></div>
        <div className="max-w-[1440px] mx-auto transition-transform duration-500 transform translate-x-0">
          <ThirdwebProvider client={client}>
            <CustomAppBar position="static">
              <Toolbar sx={{ position: "relative" }}>
              <Typography
      component="div"
      sx={{
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#eefdfe',
        color: '#000000',
        py: '3.3%',
        px: '3.5%',
        ml: '-5%',
        pl: '5.5%',
        fontFamily: 'sofia',
        fontWeight: 'bold',
      }}
    >
      <Link href="/" style={{ display: 'flex', alignItems: 'center' }}>
        <img
          src="/fav.png"
          alt="Logo"
          style={{ width: '50px', maxWidth: '50px', height: 'auto', marginRight: '5px' }}
        />
        <span className="text-[2rem]">Blockstarter</span>
      </Link>
    </Typography>

                <RoundedBackground />

                {isInitialized && (
                  <>
                    <div
                      className="desktop-nav"
                      style={{
                        zIndex: 1,
                        flexGrow: 1,
                        justifyContent: "flex-end",
                      }}
                    >
                      <Button
                        color="inherit"
                        component={Link}
                        href="/campaigns"
                        sx={{
                          marginX: "2%",
                          fontSize: "clamp(0.5rem, 1vw, 0.9rem)",
                          backgroundColor: "transparent",
                        }}
                        className="font-nanum"
                      >
                        Projects
                      </Button>
                      <Button
                        color="inherit"
                        component={Link}
                        href="/Faq"
                        sx={{
                          marginX: "2%",
                          fontSize: "clamp(0.5rem, 1vw, 0.9rem)",
                        }}
                        className="font-nanum"
                      >
                        FAQ
                      </Button>
                      <Button
                        color="inherit"
                        component={Link}
                        href="/community"
                        sx={{
                          marginX: "2%",
                          fontSize: "clamp(0.5rem, 1vw, 0.9rem)",
                        }}
                        className="font-nanum"
                      >
                        Community
                      </Button>
                      <Button
                        color="inherit"
                        component={Link}
                        href="/updates"
                        sx={{
                          marginX: "2%",
                          fontSize: "clamp(0.5rem, 1vw, 0.9rem)",
                          marginRight: "4%",
                        }}
                        className="font-nanum"
                      >
                        Updates
                      </Button>
                      <div className="pr-[300px] max-h-[10%] max-w-[30%]">
                        {showConnectButton ? (
                          <ConnectWalletButton
                            client={client}
                            wallets={wallets}
                            onFailure={onFailure}
                          />
                        ) : (
                          <div style={{ width: "195px", height: "40px" }} />
                        )}
                      </div>
                    </div>

                    <div className="absolute mobile-nav right-[2%]">
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
                  </>
                )}
              </Toolbar>
            </CustomAppBar>
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
          fontSize: "0.9rem", // Smaller font size
          padding: "15px 18px", // Smaller padding
          fontFamily: "nanum",
          backgroundColor: "#f36128",
          color: "#ffffff",
          borderRadius: "30px",
          transition: "all 0.3s ease-in-out",
          "&:hover": {
            color: "#f36128",
            borderColor: "#f36128",
          },
        },
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
