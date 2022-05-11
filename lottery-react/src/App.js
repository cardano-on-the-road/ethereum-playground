import React, { Component,  } from 'react'
import AccountDetails from './components/accountDetails/accountDetails';
import contractInterface from './contractInterface'
import ContractComponent from './components/contractComponent/ContractComponent';
import Web3 from 'web3';
import Home from './components/home/Home';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import logo from './images/logo.svg'
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

  async componentDidUpdate(prevProp, prevState) {
    if ((this.state.web3 && prevState.web3 == null)) {
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
     <Navbar bg="dark" variant="dark"
        sticky="top" expand="sm" collapseOnSelect>
        <Navbar.Brand>
          <img src={logo} alt='logo' width="40px" height="40px" />{' '}
          Lottery is now
        </Navbar.Brand>

        <Navbar.Toggle className="coloring" />
        <Navbar.Collapse>
          <Nav>
          <Nav.Link href="#Home"  onClick={() => this.setState({currentChoice: 'home'})}>Home</Nav.Link>
          <Nav.Link href="#MyWallet"  onClick={() => this.setState({currentChoice: 'accountDetails'})}>My Wallet</Nav.Link>

          <NavDropdown title="Account">
              <NavDropdown.Item href="#logout">Logout</NavDropdown.Item>
            </NavDropdown>
            
          </Nav>
        </Navbar.Collapse>

      </Navbar>
        <div style={{marginTop:'4rem',marginLeft:'.5rem'}}>
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
