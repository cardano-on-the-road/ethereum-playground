import Web3 from 'web3';

// let web3 = null

// const ethEnabled = () => {
//     if (window.ethereum) {
//       window.ethereum.request({ method: 'eth_requestAccounts' }).then(() => {
//         web3 = new Web3(window.ethereum);
//         console.log('Web3 connected to Metamask');
//       });
//       return web3;
//     }
//     console.log('Install Metamask')
//     return null;
//   }

//   ethEnabled();
//

window.ethereum.request({ method: 'eth_requestAccounts' })
const web3 = new Web3(window.ethereum);

export default web3;