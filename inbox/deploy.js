const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const configuration = require('./confReader')

// the interface is the ABI
const { interface, bytecode } = require('./compile');

const INIT_MESSAGE = 'Hello world!'

const provider = new HDWalletProvider(
    configuration.wallet_passphrase,
    configuration.infura_endpoint
);

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    
    console.log('Attempting to deploy from account', accounts[0]);
    
    depolyResult = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({data: bytecode, arguments: [INIT_MESSAGE]})
        .send({from: accounts[0], gas: '1000000'});

    console.log('Contract deployed at', depolyResult.options.address);
    provider.engine.stop();
};

deploy();