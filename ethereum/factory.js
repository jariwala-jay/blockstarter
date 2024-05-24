import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const CONTRACT_ADDRESS = '0x7B9c4665AF12d8b2778e1bF742470C39Bb89180a';

const instance = new web3.eth.Contract(JSON.parse(CampaignFactory.interface),CONTRACT_ADDRESS);

export default instance;

//OLD GEORLI CONTRACT 0x7B9c4665AF12d8b2778e1bF742470C39Bb89180a