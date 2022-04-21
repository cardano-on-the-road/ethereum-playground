import React, { Component } from 'react'
import ConnectButton from './components/connectButton/connectButton'
import AccountDetails from './components/accountDetails/accountDetails';
import contractInterface from './contractInterface'
import ContractComponent from './components/contractComponent/ContractComponent';
import Web3 from 'web3';
//import contractInterfacetery from './contractInterfacetery';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      web3: null,
      accountsConnected: [],
      connectionStatus: 'Not connected',
      accountBalance: 0,
      lottery: null
    }

    console.log(contractInterface.contractAddress, '\n', contractInterface.abi);
  }

  async componentDidUpdate(prevProp, prevState) {
    if ((this.state.web3 && prevState.web3 == null)) {
      console.log('old state', prevState.web3)
      const accounts = await this.state.web3.eth.getAccounts()
      this.setState({ accountsConnected: accounts });
      const weiBalance = await this.state.web3.eth.getBalance(accounts[0]);
      this.setState({ accountBalance: Web3.utils.fromWei(weiBalance, 'ether') });
      this.setState({ connectionStatus: 'Connected' });
      // init contract
      this.setState({
        lottery: new this.state.web3.eth.Contract(contractInterface.abi, contractInterface.contractAddress)
      });
      console.log('web', this.state.web3, '\nAccount connected', this.state.accountsConnected[0], '\nAccount balance', this.state.accountBalance);
    }
  }

  render() {
    return (
      <>
        <div>
          <ConnectButton onConnect={(web3 => this.setState({ web3 }))} />
          <AccountDetails
            connectionStatus={this.state.connectionStatus}
            accountBalance={this.state.accountBalance}
            accountConnected={this.state.accountsConnected[0]} />
          <ContractComponent lottery={this.state.lottery}
            accountConnected={this.state.accountsConnected}
            web3={this.state.web3} />
        </div>
      </>
    );
  }
}

export default App;
