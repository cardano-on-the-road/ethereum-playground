const assert = require('assert');
const ganache = require('ganache-cli');
const { interfaces } = require('mocha');
const Web3 = require('Web3');
const{interface, bytecode} = require('../compile')
const INIT_MESSAGE = 'Hello world!'

web3 = new Web3(ganache.provider());



let account;
let inbox;

beforeEach(async () => {
    // get a list of the account
    account = await web3.eth.getAccounts()
    //Use account to deploy
    inbox = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({data: bytecode, arguments: [INIT_MESSAGE]})
        .send({from: account[0], gas: '1000000'});
});

describe('test collection', () => {
    it('deploy contract', () => {
        assert.ok(inbox.options.address);
    });

    it('initial message', async () => {
        const message = await inbox.methods.getMessage().call();
        assert.equal(message, INIT_MESSAGE)
    });

    it('set message', async () => {
        const NEW_MSG = 'Bye'
        await inbox.methods.setMessage(NEW_MSG).send({from: account[0]})
        const message = await inbox.methods.getMessage().call();
        assert.equal(message, NEW_MSG)
    });
});