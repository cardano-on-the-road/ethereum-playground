const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('Web3');
const{ abi, evm } = require('../compile');


const REQUEST_NAME = 'request1';


const web3 = new Web3(ganache.provider());

let accounts;
let kickContract;
let manager;
let approver1;
let approver2;
let approver3;
let supplier;
let REQUEST_VALUE;

beforeEach(async () => {
    // get a list of the account
    accounts = await web3.eth.getAccounts();
    manager = accounts[0];
    approver1= accounts[1];
    approver2=accounts[2];
    approver3=accounts[3];
    supplier = accounts[4];
    REQUEST_VALUE = web3.utils.toWei("1", "ether");

    //Use account to deploy
    kickContract = await new web3.eth.Contract(abi)
        .deploy({
            data: evm.bytecode.object,
            arguments: [web3.utils.toWei("0.01", "ether")]
        })
        .send({from: manager, gas: '1000000'});
});

describe('Kickstarter deploy tests', async () => {
 
    it('deploy contract', () => {
        assert(kickContract.options.address);
    });    
});

describe ('Kickstarter request', async () => {

    it('Create request', async () => {
        const requestName = 'CreateTestRequest';
        const requestValue = web3.utils.toWei("1", "ether");
        const ris = await kickContract.methods.createRequest(requestName, "first description",requestValue, supplier).send({
            from: manager,
            gas: '1000000'
        });

        const request = await kickContract.methods.requests(requestName).call();
        assert.equal(requestValue, request.value);

    });

    it('Request failing from approver', async () => {
        let isFail = false;

        try {
            await kickContract.methods.createRequest(REQUEST_NAME, "first description", REQUEST_VALUE, supplier).send({
                from: approver1,
                gas: '1000000'
            });
        } catch (error){
            isFail = true;
        }

        assert.equal(isFail, true);

    });

    describe('Kickstarter approving process', async () => {

    });

});
