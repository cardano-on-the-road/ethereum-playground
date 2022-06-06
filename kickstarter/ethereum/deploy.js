
const fs = require("fs-extra");
const path = require("path");
const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const configuration = require('./confReader')

const campaignFactoryBuild = fs.readJSONSync(
    path.resolve(__dirname, '../ethereum', 'build', 'CampaignFactory.json')
)


const provider = new HDWalletProvider(
    configuration.wallet_passphrase,
    configuration.infura_endpoint
);

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    console.log('Attempting to deploy from account', accounts[0]);

    depolyResult = await new web3.eth.Contract(campaignFactoryBuild.abi)
        .deploy({
            data: campaignFactoryBuild.evm.bytecode.object,
        })
        .send({ from: accounts[0], gas: '3000000' });

    console.log('Contract deployed at: ', depolyResult.options.address);
    provider.engine.stop();
};

deploy();