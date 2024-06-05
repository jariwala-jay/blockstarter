// thirdwebClientProvider.js
'use client'; // Ensure the file is treated as a client-side component

import React from 'react';
import { ThirdwebProvider as ThirdwebProviderBase, darkTheme, ConnectButton } from "thirdweb/react";
import { createThirdwebClient } from "thirdweb";
import { createWallet, walletConnect, inAppWallet } from "thirdweb/wallets";

// Initialize the Thirdweb client
const client = createThirdwebClient({
  clientId: "45d7da099d921451fb82e62733d35768",
});

// Define the wallets
const wallets = [
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

export const ThirdwebClientProvider = ({ children }) => {
  return (
    <ThirdwebProviderBase client={client}>
      {children}
    </ThirdwebProviderBase>
  );
};

export const ThirdwebConnectButton = () => (
  <ConnectButton
    wallets={wallets}
    theme={darkTheme({
      colors: {
        accentText: "#eefdfe",
        accentButtonBg: "#eefdfe",
        primaryText: "#ffffff",
        secondaryButtonText: "#131418",
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
    onFailure={(error) => {
      console.error('Connection error:', error);
      if (error?.response?.data) {
        console.error('Error details:', error.response.data);
      }
    }}
  />
);
