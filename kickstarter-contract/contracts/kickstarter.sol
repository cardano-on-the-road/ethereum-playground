//SPDX-Licence-Identifier: MIT

pragma solidity ^0.8.13;

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

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

    constructor(uint256 minimum) {
        manager = msg.sender;
        minimumContribution = minimum;
    }

    function contribute() public payable {
        require(msg.value >= minimumContribution);
        approvers[msg.sender] = true;
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
}
