import React, { useEffect, useState } from "react"
import ConnectionButton from "../components/ConnectionButton";
import CardList from "../components/CardList";
import instance from "../ethereum/factory";


function index() {

    const [connection, setConnection] = useState({
        status: false,
        wallet: '',
        web3: null,
        campaignFactoryContract: null
    });

    const [campaigns, setCampaigns] = useState([]);
    //verify is the web3 is stored in the cookie

    const clickConnectionButton = async (web3callback) => {
        //web3connection is a callback from ConnectionButton
        let web3 = await web3callback();
        
        console.log('ConnectionButton clicked');
        if (web3) {
            let account = await web3.eth.getAccounts();
            //Security issue here in the settings file
            let campaignFactoryContract = await instance(web3);
            setConnection({
                status: true,
                wallet: account[0],
                web3: web3,
                campaignFactoryContract: campaignFactoryContract
            })
            //Save web3 in cookies the connection
        }
        else {
            setConnection({
                status: false,
                wallet: '',
                web3: null,
                campaignContract: null
            });
        }
    }


    const loadCampaigns = async () => {
        if(connection.status){
            let campaigns = await connection.campaignFactoryContract.methods.getDeployedCampaigns().call() 
            setCampaigns(campaigns);
        }
    }

    useEffect(() => {
            if (connection.web3){
                loadCampaigns();
            }
    }, [connection]); 

    if(connection.status)
        return (
            <>   
                <div>
                    <ConnectionButton connection={connection} onClick={clickConnectionButton} />
                </div>
                <div>
                    <h1> Campaigns list </h1>
                    <CardList list={campaigns}/>
                </div>
            </>
        );
    else 
            return (
                <div>
                    <ConnectionButton connection={connection} onClick={clickConnectionButton} />
                </div>
            )
}


export default index;