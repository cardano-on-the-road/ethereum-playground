const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

//should not be hardcorded
const provider = new HDWalletProvider(
    'people army sweet elder harvest pioneer dinner dash grant fade flag clarify',
    'https://rinkeby.infura.io/v3/f926eb4c36934c07afa271a77a42c53f'
);

const web3 = new Web3(provider)