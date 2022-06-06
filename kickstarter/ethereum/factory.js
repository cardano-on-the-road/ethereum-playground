
import settings from "./settings.json"
import CampaignFactory from "./build/CampaignFactory.json"


async function instance (web3) { 
    let inst = await new web3.eth.Contract(
        CampaignFactory.abi,
        settings.campaignFactoryAddress
    );
    return inst;
}



export default instance;