import React, { Component } from "react";

class ContractComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            manager: '0x11111',
            accountConnected: '0x00000',
            players: [],
            balance: '0',
            value: 0,
            message: '',
            winnerMessage: '',
            pickWinnerDiv:''
        }
    }

    async componentDidUpdate(prevProps, prevState) {
        if (this.props.lottery && this.state.manager === '0x11111') {
            const manager = await this.props.lottery.methods.manager().call();
            const accountConnected = this.props.accountConnected[0];
            this.setState({ manager });
            this.setState({ accountConnected})
            if(manager === accountConnected){
                const pickWinnerDiv = () =>  {return (<>
                    <h4> Ready to extract a winner? </h4>
                    <button onClick={this.onClick}>Pick a winner</button>
                    <p>{this.state.winnerMessage}</p>
                </>)}
                this.setState({pickWinnerDiv: pickWinnerDiv()})
            }

        }
        if (this.props.lottery) {
            const players = await this.props.lottery.methods.getPlayers().call();
            const balance = await this.props.web3.eth.getBalance(this.props.lottery.options.address);
            this.setState({ players });
            this.setState({ balance });
        }
    }

    //To send ether
    onSubmit = async (event) => {
        event.preventDefault();
        try {
            this.setState({ 'message': 'Waiting for transaction execution' });

            await this.props.lottery.methods.enter().send({
                from: this.state.accountConnected,
                value: this.props.web3.utils.toWei(this.state.value, 'ether')
            });
            this.setState({ 'message': 'Transaction executed' });
        } catch (err) {
            this.setState({ 'message': 'Transaction error =>' + err });
        }
    }

    onClick = async () => {
        try {
            this.setState({winnerMessage: 'Choosing for a winner'})
            await this.props.lottery.methods.pickPlayer().call({
                from: this.state.accountConnected
            });
            this.setState({winnerMessage: 'Winner choosed'})
        }catch (err) {
            this.setState({winnerMessage: 'ERROR: ' + err})
        }
    }

    render() {
        if (this.props.lottery == null) {
            return (<>
                <div>
                    <h2> No lottery contract to display </h2>
                </div>
            </>);
        }
        else {
            return (<>
                <div>
                    <div>
                        <h2> Lottery contract</h2>
                        <p>
                            The contract is handled by the manager: {this.state.manager}.
                            There are {this.state.players.length} players, competing to win {this.props.web3.utils.fromWei(this.state.balance, 'ether')} ETH.
                        </p>
                    </div>

                    <hr />

                    <form onSubmit={this.onSubmit}>
                        <h4> Want you try to play this lottery?</h4>

                        <div>
                            <label> Amount to enter </label>
                            <input
                                value={this.state.value}
                                onChange={event => this.setState({ value: event.target.value })}
                            />
                        </div>
                        <button>Enter</button>
                    </form>

                    <hr />

                    {this.state.pickWinnerDiv}

                    <p> {this.state.message}</p>
                </div>
            </>);

        }

    }
}

export default ContractComponent