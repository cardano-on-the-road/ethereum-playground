import Web3 from "web3";
 
let web3;

async function connection() {

    if (window.ethereum) {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        web3 = new Web3(window.ethereum);
    } else {
        // Show alert if Ethereum provider is not detected
        alert("Please install Metamask");
    }
    //return "Bottone cliccato"
}

 
export default web3;