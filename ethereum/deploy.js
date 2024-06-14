const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('./build/CampaignFactory.json');

const provider = new HDWalletProvider(
  process.env.ETH_SECRET_KEY,
  process.env.ETH_API
);
//'https://eth-goerli.g.alchemy.com/v2/kkMPAw4ItEasHSHdfixo99T_nJzg0o2o' OLD GEORLI CHAIN


const deploy = async () => {
  const web3 = new Web3(provider);
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({ data: compiledFactory.bytecode })
    .send({ gas: '3000000', from: accounts[0] });
  
  console.log('Contract deployed to', result.options.address);
  provider.engine.stop();
};
deploy();

// Deployed Contract address 0xd1FD1937E17F93489ACD72ec003C2e560994ca75
// NEW IPFS CONTRACT DEPLOYED ADDRESS - 0x13b6569214e8Dc5919F70DBE8f84cC68291d0789



