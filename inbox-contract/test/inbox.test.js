const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('Web3');
const HDWalletProvider = require('@truffle/hdwallet-provider');
const{interface, bytecode} = require('../compile');


const INIT_MESSAGE = 'Hello world!'


web3Ganache = new Web3(ganache.provider());

let accountsGanache;
let inboxGanache;

beforeEach(async () => {
    // get a list of the account
    accountsGanache = await web3Ganache.eth.getAccounts()
    //Use account to deploy
    inboxGanache = await new web3Ganache.eth.Contract(JSON.parse(interface))
        .deploy({data: bytecode, arguments: [INIT_MESSAGE]})
        .send({from: accountsGanache[0], gas: '1000000'});

});

describe('Ganache local tests', () => {
 
    it('deploy contract', () => {
        assert.ok(inboxGanache.options.address);
    });

    it('initial message', async () => {
        const message = await inboxGanache.methods.getMessage().call();
        assert.equal(message, INIT_MESSAGE)
    });

    it('Set message', async () => {
        const NEW_MSG = 'Bye'
        await inboxGanache.methods.setMessage(NEW_MSG).send({from: accountsGanache[0]})
        const message = await inboxGanache.methods.getMessage().call();
        assert.equal(message, NEW_MSG)
    });
});
