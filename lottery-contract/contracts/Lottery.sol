//SPDX-Licence-Identifier: MIT

pragma solidity ^0.8.13;

contract lottery{
    address public manager;
    address[] public players;

    constructor () {
        manager = msg.sender;
    }

    function enter() public payable{
        require(msg.value > .001 ether);
        players.push(msg.sender);
    }

    function random() private view returns (uint){
        return uint(keccak256(abi.encodePacked(block.timestamp, players)));
    }

    function pickPlayer() public restricted{ 
        require(players.length > 0);
        uint i = random() % players.length;
        payable(players[i]).transfer(address(this).balance);
        players = new address[](0);
    }
    
    function getPlayers() public view returns (address[] memory){
        return players;
    }
    
    modifier restricted(){
        require(msg.sender==manager);
        _;
    }
}