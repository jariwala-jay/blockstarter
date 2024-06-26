const HDWalletProvider = require('@truffle/hdwallet-provider');
const {Web3} = require('web3');
const compiledFactory = require('./build/CampaignFactory.json');

const provider = new HDWalletProvider(
  'fan merry vault there position amateur tray behind vault loyal enact soft',
  "https://eth-holesky.g.alchemy.com/v2/HxGbaoCyKSSGyPSIBg_XaEprEzmeTBel"
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  try {
    const gasEstimate = await new web3.eth.Contract(compiledFactory.abi)
    .deploy({ data: compiledFactory.evm.bytecode.object })
    .estimateGas();

  const result = await new web3.eth.Contract(compiledFactory.abi)
    .deploy({ data: compiledFactory.evm.bytecode.object })
    .send({ gas: gasEstimate, from: accounts[0] });

    console.log('Contract deployed to', result.options.address);
  } catch (error) {
    console.error('Deployment failed:', error);
  } finally {
    provider.engine.stop();
  }
};

deploy();
