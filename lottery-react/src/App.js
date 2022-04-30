import React, { Component,  } from 'react'
import AccountDetails from './components/accountDetails/accountDetails';
import contractInterface from './contractInterface'
import ContractComponent from './components/contractComponent/ContractComponent';
import Web3 from 'web3';
import Home from './components/home/Home';
//import contractInterfacetery from './contractInterfacetery';


class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      web3: null,
      accountsConnected: [],
      connectionStatus: 'Not connected',
      accountBalance: 0,
      lottery: null,
      currentChoice: 'home',
      firstRun: false
    }

    console.log(contractInterface.contractAddress, '\n', contractInterface.abi);
  }

  async componentDidUpdate()
  {
    
    if (window.ethereum && (this.state.web3 !== null || this.state.web3 !== 'undefined') && this.state.firstRun === true) {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      this.setState({web3: new Web3(window.ethereum)});

      const accounts = await this.state.web3.eth.getAccounts()
      this.setState({ accountsConnected: accounts });
      const weiBalance = await this.state.web3.eth.getBalance(accounts[0]);
      this.setState({ accountBalance: Web3.utils.fromWei(weiBalance, 'ether') });
      this.setState({ connectionStatus: 'Connected' });
      this.setState({currentChoice: 'accountDetails'});
      // init contract
      this.setState({
        lottery: new this.state.web3.eth.Contract(contractInterface.abi, contractInterface.contractAddress)
      });
      console.log('web', this.state.web3, '\nAccount connected', this.state.accountsConnected[0], '\nAccount balance', this.state.accountBalance);
      this.setState({firstRun: false});
    }
  }

  async componentDidMount()
  {
    if (window.ethereum) {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      this.setState({web3: new Web3(window.ethereum)});
      this.setState({firstRun: true});
     
    }
  }

  render() {
    return (
      <>
        <div style={{margin:'2rem'}}>
          {
            (this.state.currentChoice === 'home') ? 
            <Home></Home> :
            <React.Fragment>
              <AccountDetails
            connectionStatus={this.state.connectionStatus}
            accountBalance={this.state.accountBalance}
            accountConnected={this.state.accountsConnected[0]} />
            <ContractComponent lottery={this.state.lottery}
            accountConnected={this.state.accountsConnected}
          web3={this.state.web3} />
            </React.Fragment>            
          }
        </div>
      </>
    );
  }
}

export default App;
