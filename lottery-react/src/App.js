import React, { Component } from 'react'
import web3 from './web3';

class App extends Component {

  render() {

    web3.eth.getAccounts().then(console.log)
    console.log(web3.version);

    return (
      <>
        <div>

        </div>
      </>
    );
  }
}

export default App;
