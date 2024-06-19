import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

if (!CONTRACT_ADDRESS) {
  console.error('Contract address is not defined. Please check the environment variable NEXT_PUBLIC_CONTRACT_ADDRESS.');
}

const instance = new web3.eth.Contract(CampaignFactory.abi, CONTRACT_ADDRESS);

export default instance;

// LATEST NEW CONTRACT ADDRESS - 0x7E6B6061143BAfA420d6Ff8ee53DA9cC87b52Df8
// CURRENT NO IPFS CONTRACT - 0x7B9c4665AF12d8b2778e1bF742470C39Bb89180a
// NEW IPFS CONTRACT - 0x13b6569214e8Dc5919F70DBE8f84cC68291d0789
// OLD GEORLI CONTRACT - 0x7B9c4665AF12d8b2778e1bF742470C39Bb89180a
