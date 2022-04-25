//SPDX-Licence-Identifier: MIT

pragma solidity ^0.8.13;

contract Campaign {
    struct Request {
        string description;
        uint256 value;
        address recipient;
        bool completed;
    }

    address public manager;
    address[] public approvers;
    uint256 public minimumContribution;

    constructor(uint256 minimum) {
        manager = msg.sender;
        minimumContribution = minimum;
    }

    function contribute() public payable {
        require(msg.value >= minimumContribution);
        approvers.push(msg.sender);
    }
}
