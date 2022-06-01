const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('Web3');
const path = require('path');
const fs = require('fs-extra');


const campaignBuild = fs.readJSONSync(
    path.resolve(__dirname, '../ethereum', 'build', 'Campaign.json')
)

const campaignFactoryBuild = fs.readJSONSync(
    path.resolve(__dirname, '../ethereum', 'build', 'CampaignFactory.json')
)


const REQUEST_NAME = 'request1';


const web3 = new Web3(ganache.provider());

let accounts;
let kickContract;
let kickFactoryContract;
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
    kickContract = await new web3.eth.Contract(campaignBuild.abi)
        .deploy({
            data: campaignBuild.evm.bytecode.object,
            arguments: [manager, web3.utils.toWei("0.01", "ether")]
        })
        .send({from: manager, gas: '1000000'});

    kickFactoryContract = await new web3.eth.Contract(campaignFactoryBuild.abi)
        .deploy({
            data: campaignFactoryBuild.evm.bytecode.object,
        })
        .send({from: manager, gas: '3000000'});

    await kickContract.methods.createRequest(REQUEST_NAME, "Request description", REQUEST_VALUE, supplier).send({
        from: manager,
        gas: '1000000'
    });
});

describe('Campaign factory', async () => {

    it('Campaign deploy and test', async () => {
        await kickFactoryContract.methods.createCampaign('100').send({
            from: manager,
            gas:'1000000'
        });
        const campaigns = await kickFactoryContract.methods.getDeployedCampaigns().call();
        const campaignContract = await new web3.eth.Contract(
            campaignBuild.abi,
            campaigns[0]
        );
        const ris = await campaignContract.methods.manager().call();
        assert.equal(ris, manager);
    });

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
        let failRequest = "Fail"
        try {
            await kickContract.methods.createRequest(failRequest, "Request description", REQUEST_VALUE, supplier).send({
                from: approver1,
                gas: '1000000'
            });
        } catch (error){
            isFail = true;
        }

        assert.equal(isFail, true);

    });

    describe('Kickstarter approving process', async () => {

        it('Contribute', async () => {
            let contribute = await kickContract.methods.contribute().send({
                from: approver1,
                value: REQUEST_VALUE
            });

            let ris = await kickContract.methods.approverCount().call();
            assert.equal(ris, 1);
        });

        it('Approve request', async () => {
            
            let contribute = await kickContract.methods.contribute().send({
                from: approver1,
                value: REQUEST_VALUE
            });

            let approve = await kickContract.methods.approveRequest(REQUEST_NAME).send({
                from:approver1
            });

            let ris = await kickContract.methods.requests(REQUEST_NAME).call(); 
            assert.equal(ris.approvalCount, 1);
        });

        it('Finalize', async () => {

        });
    });

});
