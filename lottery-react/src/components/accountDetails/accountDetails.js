import React, {Component} from "react";
import './accountDetails.css';

class AccountDetails extends Component {


    render() {
        if (this.props.accountConnected !== '') {
            return (
                    <div className="accountBalance-main-div">
                        <div className="accountBalance-main-div-card">
                                <p className="accountBalance-div-p"> Account: {this.props.accountConnected} </p>
                                <p className="accountBalance-div-p"> Balance: {this.props.accountBalance} </p>
                        </div>
                    </div>               
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