const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('Web3');
const{ abi, evm } = require('../compile');


const INIT_MESSAGE = 'Hello world!'


const web3 = new Web3(ganache.provider());

let accounts;
let kickContract;
let manager;

beforeEach(async () => {
    // get a list of the account
    accounts = await web3.eth.getAccounts()
    manager = accounts[0]
    //Use account to deploy
    lotteryContract = await new web3.eth.Contract(abi)
        .deploy({
            data: evm.bytecode.object
        })
        .send({from: manager, gas: '1000000'});
});

describe('Lottery tests', () => {
 
    it('deploy contract', () => {
        assert.ok(kickContract.options.address);
    });    
});
