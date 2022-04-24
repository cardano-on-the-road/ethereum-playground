import React, {Component} from "react";
import './accountDetails.css';

class AccountDetails extends Component {


    render() {
        if (this.props.accountConnected !== '') {
            return (
                    <div className="accountBalance-main-div">
                        <div className="accountBalance-main-div-card">
                            <div>
                                <p className="accountBalance-div-p"> Account: {this.props.accountConnected} </p>
                            </div>
                            <div>
                                <p className="accountBalance-div-p"> Balance: {this.props.accountBalance} </p>
                            </div>
                            <div style={{position:'absolute',marginTop:'140px'}}>
                                <p className="accountBalance-div-p"> Version: 1.00</p>
                            </div>
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