//SPDX-Licence-Identifier: MIT

pragma solidity ^0.8.13;

contract Inbox{
    string private message;

    constructor(string memory initMessage ) {
        message = initMessage;
    }

    function setMessage(string memory newMsg) public {
        message = newMsg;
    }

    function getMessage() public view returns (string memory) {
        return message;
    }
}
