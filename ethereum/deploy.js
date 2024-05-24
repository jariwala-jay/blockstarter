const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('./build/CampaignFactory.json');

const provider = new HDWalletProvider(
  'fan merry vault there position amateur tray behind vault loyal enact soft',
  'https://eth-sepolia.g.alchemy.com/v2/X0HNuADNsseq156PHx4L83Rb-Cw766ZF'
);
//'https://eth-goerli.g.alchemy.com/v2/kkMPAw4ItEasHSHdfixo99T_nJzg0o2o' OLD GEORLI CHAIN
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({ data: compiledFactory.bytecode })
    .send({ gas: '1000000', from: accounts[0] });
  
  console.log('Contract deployed to', result.options.address);
  provider.engine.stop();
};
deploy();

// Deployed Contract address 0xd1FD1937E17F93489ACD72ec003C2e560994ca75
