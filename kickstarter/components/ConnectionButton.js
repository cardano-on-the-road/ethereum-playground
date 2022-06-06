import React, { Component, useState } from "react";
import Web3 from "web3";



function ConnectionButton(props) {

    const web3Connection = async () => {
        if (window.ethereum) {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            return new Web3(window.ethereum);
        } else {
            // Show alert if Ethereum provider is not detected
            alert("Please install Metamask");
        }
    }

    const web3Disconnect = async () => {
        return await null;
    }

    if (!props.connection.status) {
        return (
        <>
            <div>
                <button onClick={() => props.onClick(web3Connection)}>
                    Connect
                </button>
            </div>
        </>);
    }
    else{
        return (
        <>
            <div>
                <label>Wallet addr: {props.connection.wallet}</label>
                <button onClick={() => props.onClick(web3Disconnect)}>
                    disconnect
                </button>
            </div>
        </>);
    }

}

export default ConnectionButton;

// class ConnectButton extends Component {

//     constructor() {
//         super();
//         this.web3 = null;
//     }

//     async connection() {

//         if (window.ethereum) {
//             await window.ethereum.request({ method: 'eth_requestAccounts' });
//             this.web3 = new Web3(window.ethereum);
//         } else {
//             // Show alert if Ethereum provider is not detected
//             alert("Please install Metamask");
//         }
//         //return "Bottone cliccato"
//     }

//     render() {
//         return (
//             <>
//                 <div>
//                     <button onClick={async () => {
//                         await this.connection();
//                         this.props.onConnect(this.web3);
//                     }
//                     }> Connect </button>
//                 </div>
//             </>
//         );
//     }
// }

// export default ConnectButton;