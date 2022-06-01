//SPDX-Licence-Identifier: MIT

pragma solidity ^0.8.13;

contract CampaignFactory{

    address[] deployedCampaings;

    function createCampaign(uint minimumAmount) public {

        address newCampaign = address(new Campaign(msg.sender, minimumAmount));
        deployedCampaings.push(newCampaign);
    }

    function getDeployedCampaigns() public view returns(address[] memory){
        return deployedCampaings;
    }

}

contract Campaign {

    struct Request {
        string description;
        uint256 value;
        address recipient;
        bool completed;
        uint256 approvalCount;
        mapping(address => bool) approvals;
    }
    mapping(string => Request) public requests;

    address public manager;
    uint256 public minimumContribution;
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
        require(msg.value >= minimumContribution);
        approvers[msg.sender] = true;
        approverCount ++;
    }

    function createRequest(
        string memory name,
        string memory description,
        uint256 value,
        address recipient
    ) public restricted {
        Request storage r = requests[name];
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
}
