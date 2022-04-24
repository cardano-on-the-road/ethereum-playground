const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('Web3');
const{ abi, evm } = require('../compile');


const INIT_MESSAGE = 'Hello world!'


const web3 = new Web3(ganache.provider());

let accounts;
let lotteryContract;
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
        assert.ok(lotteryContract.options.address);
    });

    it('Manager test', async () => {
        const managerCall = await lotteryContract.methods.manager().call();
        assert.equal(managerCall, manager)
    });

    it('Players array', async () => {
        await lotteryContract.methods.enter().send({
            from: accounts[1], 
            value: web3.utils.toWei('0.002', 'ether')
        });
        await lotteryContract.methods.enter().send({
            from: accounts[2], 
            value: web3.utils.toWei('0.002', 'ether')
        });
        const players = await lotteryContract.methods.getPlayers().call();
        assert.equal(players[0], accounts[1]);  
        assert.equal(players[1], accounts[2]); 
        assert.equal(players.length, 2);
    });

    it('Balance test end2end', async () => {
        await lotteryContract.methods.enter().send({
            from: accounts[0], 
            value: web3.utils.toWei('2', 'ether')
        });
 
        const initialBalance = await web3.eth.getBalance(accounts[0]);
        await lotteryContract.methods.pickPlayer().send({
            from:accounts[0]
        });
        const finalBalance = await web3.eth.getBalance(accounts[0]);
        const difference = finalBalance - initialBalance;

        assert(difference > web3.utils.toWei('1.8', 'ether'));
    });

    it('Player exception min amount', async () => {
        let error = false;
        try{
            await lotteryContract.methods.enter().send({
                from: accounts[1], 
                value: web3.utils.toWei('0.00002', 'ether')
            });
        }catch (err){
            error = true;
        }        
        assert.equal(error, true);
    });

    it('Not manager permission', async () => {
        let error = false;
        try{
            await lotteryContract.methods.enter().send({
                from: accounts[1], 
                value: web3.utils.toWei('0.002', 'ether')
            });

            await lotteryContract.methods.pickPlayer().call({
                from: accounts[2]
            });
        }catch (err){
            error = true;
        }        
        assert.equal(error, true);
    });
    
});
