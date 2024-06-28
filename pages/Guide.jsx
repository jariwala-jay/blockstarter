import React, { useState } from 'react';
import 'tailwindcss/tailwind.css';
import Layout from '../src/app/components/Layout';

const StepByStepGuide = () => {
  const [openStep, setOpenStep] = useState(null);

  const toggleStep = (step) => {
    setOpenStep(openStep === step ? null : step);
  };

  const steps = [
    {
      id: 1,
      title: 'Setting Up MetaMask',
      description: 'Install MetaMask and add the Sepolia testnet.',
      details: `1. Go to MetaMask and download the browser extension or mobile app. 
                2. Follow the installation instructions and create a new wallet.
                3. Open MetaMask, click on the network dropdown at the top. Select "Sepolia Testnet".`
                
    },
    {
      id: 2,
      title: 'Getting Testnet ETH',
      description: 'Request testnet ETH from a faucet.',
      details: `1. Go to a Sepolia testnet faucet like Sepolia Faucet.
                2. Enter your MetaMask wallet address and request ETH.
                3. It should be sent to your wallet in a few minutes.`
    },
    {
      id: 3,
      title: 'Creating a Campaign',
      description: 'Fill in the details and create your campaign.',
      details: `1. Connect your wallet on the Blockstarter application.
                2. Navigate to the "Create Campaign" page.
                3. Fill in the details of your campaign such as the title, description, target amount, and duration.
                4. Submit the form. This will create a new campaign on the blockchain.`
    },
    {
      id: 4,
      title: 'Investing in Projects',
      description: 'Browse and invest in existing campaigns.',
      details: `1. Go to the "Campaigns" page to see a list of all active campaigns.
                2. Select a campaign you are interested in.
                3. Click on the "Invest" button.
                4. Enter the amount of ETH you want to invest and confirm the transaction through MetaMask.`
    }
  ];

  return (
    <Layout>
    <h2 className="text-3xl font-bold text-center mb-12 mt-6 font-sofia">Step by Step Guide</h2>
    <div className="max-w-[1140px] mx-auto relative p-6 bg-black text-black justify-center font-nanum ">
      <div className="relative ">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-start mb-12 relative">
            <div className="flex-shrink-0 bg-[#f36128] w-12 h-12 rounded-full flex items-center justify-center text-white font-bold z-10 relative">
              {step.id}
            </div>
            <div className="ml-6 bg-[#eefdfe] p-6 rounded-lg shadow-lg relative w-full">
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-500 mb-4">{step.description}</p>
              <button
                className="text-[#f36128] hover:underline"
                onClick={() => toggleStep(step.id)}
              >
                {openStep === step.id ? 'Hide Details' : 'Show Details'}
              </button>
              {openStep === step.id && (
                <div className="mt-4 text-gray-600">
                  {step.details.split('\n').map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
              )}
            </div>
            {index < steps.length - 1 && (
              <div className="absolute left-6 top-12 bottom-12 w-px bg-[#f36128] z-0"></div>
            )}
          </div>
        ))}
        <div className="absolute left-6 top-12 bottom-12 w-px bg-[#f36128] z-0"></div>
      </div>
      
    </div>
    <div className="max-w-[1140px] mx-auto mt-8 font-nanum px-10">
          <p className="text-center text-sm text-gray-400">
            Notes
            </p>
            <p className="text-sm text-gray-400">
            <br />
            <span className="font-bold">Testnet Environment:</span> Remember, all transactions and investments are done using testnet ETH, which has no real monetary value.
            <br />
            <span className="font-bold">Security:</span> Always be cautious and ensure you are interacting with the correct contracts and applications.
          </p>
        </div>
    
    </Layout>
  );
};

export default StepByStepGuide;
