//SPDX-Licence-Identifier: MIT

pragma solidity ^0.8.13;

contract CampaignFactory{

    struct deployedCampaing {
        string name;
        string description;
        address cAddress;
    }
    deployedCampaing[] deployedCampaings;

    function createCampaign(string memory name, string memory description, uint minimumAmount) public {

        address newCampaignAddress = address(new Campaign(msg.sender, minimumAmount));
        deployedCampaing memory d = deployedCampaing({
            name: name,
            description: description,
            cAddress: newCampaignAddress
        });
        deployedCampaings.push(d);
    }

    function getDeployedCampaigns() public view returns(deployedCampaing[] memory){
        return deployedCampaings;
    }

}

contract Campaign {

    struct Request {
        string description;
        uint256 value;
        address payable recipient;
        bool completed;
        uint256 approvalCount;
        mapping(address => bool) approvals;
    }
    mapping(string => Request) public requests;

    address public manager;
    uint256 public minimumContribution;
    string[] public requestNames;
    mapping(address => bool) public approvers;
    uint256 public approverCount;

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

    constructor(address creator, uint256 minimum) {
        manager = creator;
        minimumContribution = minimum;
        approverCount = 0;
    }

    function contribute() public payable {
        require(msg.value >= minimumContribution, "not enough money");
        approvers[msg.sender] = true;
        approverCount ++;
    }

    function createRequest(
        string memory name,
        string memory description,
        uint256 value,
        address payable recipient
    ) public restricted {
        Request storage r = requests[name];
        requestNames.push(name);
        r.description = description;
        r.value = value;
        r.recipient = recipient;
        r.completed = false;
        r.approvalCount = 0;
    }

    function approveRequest(string memory requestName) public payable{
        Request storage r = requests[requestName];
        require(approvers[msg.sender]);
        require(!r.approvals[msg.sender]);
        
        if (r.value > 0){
            r.approvals[msg.sender]= true;
            r.approvalCount++;
        }
    }

    function finalizeRequest(string memory name) public payable restricted{
        Request storage r = requests[name];
        require(r.approvalCount > (approverCount / 2), "No enough approvals");
        require(!r.completed, "completed yet");

        r.recipient.transfer(r.value);
        r.completed=true;

    }
}
