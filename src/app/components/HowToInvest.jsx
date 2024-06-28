import React from 'react';

const steps = [
  {
    id: 1,
    title: 'Setting Up MetaMask',
    description: 'Install MetaMask and add the Sepolia testnet.',
  },
  {
    id: 2,
    title: 'Getting Testnet ETH',
    description: 'Request testnet ETH from a faucet.',
  },
  {
    id: 3,
    title: 'Creating a Campaign',
    description: 'Fill in the details and create your campaign.',
  },
  {
    id: 4,
    title: 'Investing in Projects',
    description: 'Browse and invest in existing campaigns.',
  },
];

const HowToInvest = () => {
  return (
    <section id="how-to-invest" className="py-16 bg-black text-white">
      <h2 className="text-center text-3xl font-bold mb-10">HOW TO INVEST?</h2>
      <div className="flex flex-col space-y-8 items-center">
        {steps.map((step) => (
          <div key={step.id} className="w-10/12 md:w-8/12 lg:w-6/12 p-6 bg-gray-800 rounded-lg shadow-lg">
            <div className="text-xl font-semibold mb-2">STEP {step.id}</div>
            <div className="text-lg font-bold mb-2">{step.title}</div>
            <div className="text-base">{step.description}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowToInvest;
