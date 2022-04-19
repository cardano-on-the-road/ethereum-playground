import React, {Component} from "react";
import '../../css/accountDetails.css';

class AccountDetails extends Component {


    render() {
        if (this.props.accountConnected !== '') {
            return (
                <>
                    <div style={{backgroundColor: 'orange'}}>
                        <p> Connection status: {this.props.connectionStatus}</p>
                        <p> Account: {this.props.accountConnected} </p>
                        <p> Balance: {this.props.accountBalance} </p>
                        <p> Version: 1.00</p>
                    </div>
                </>
            );
        }
        else {
            return (<>
                <div>
                    <p> NO ACCOUNT DETAILS AVAILABLE</p>
                </div>
            </>)
        }
    }
}

export default AccountDetails;