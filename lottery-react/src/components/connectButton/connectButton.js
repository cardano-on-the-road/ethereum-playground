import React, { Component } from "react";
import Web3 from 'web3';


class ConnectButton extends Component {

    constructor() {
        super();
        this.web3 = null;
    }

    async connection() {

        if (window.ethereum) {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            this.web3 = new Web3(window.ethereum);
        } else {
            // Show alert if Ethereum provider is not detected
            alert("Please install Metamask");
        }
        //return "Bottone cliccato"
    }

    render() {
        return (
            <>
                <div>
                    <button onClick={async () => {
                        await this.connection();
                        this.props.onConnect(this.web3);
                    }
                    }> {this.web3 === null ? 'Connect' : 'Disconnect'}  </button>
                </div>
            </>
        );
    }
}

export default ConnectButton;