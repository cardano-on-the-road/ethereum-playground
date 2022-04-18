import React, {Component} from "react";

class AccountDetails extends Component {


    render() {
        if (this.props.accountConnected !== '') {
            return (
                <>
                    <div style={{backgroundColor: 'orange'}}>
                        <p> Account: {this.props.accountConnected} </p>
                        <p> Balance: {this.props.accountBalance} </p>
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