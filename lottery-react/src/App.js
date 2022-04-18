import React, { Component } from 'react'
import ConnectButton from './components/connectButton/connectButton'
import AccountDetails from './components/accountDetails/accountDetails';
import Web3 from 'web3';
//import lottery from './lottery';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      web3: null
    }

    this.accountConnected = '';
    this.connectionStatus = 'Not connected';
    this.accountBalance = 0;
  }

  async componentDidUpdate() {
    if (this.state.web3) {
      this.accountConnected = await this.state.web3.eth.getAccounts();
      const weiBalance = await this.state.web3.eth.getBalance(this.accountConnected[0]);
      this.accountBalance = Web3.utils.fromWei(weiBalance, 'ether');
      this.connectionStatus = 'Connected';
    }
  }

  render() {
    return (
      <>
        <div>
          <ConnectButton onConnect={(web3 => this.setState({ web3 }))} />
          <AccountDetails accountBalance={this.accountBalance}
            accountConnected={this.accountConnected} />
        </div>
      </>
    );
  }
}

export default App;
