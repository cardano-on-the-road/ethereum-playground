import React, { useEffect, useState } from "react"
import ConnectionButton from "../components/ConnectionButton";
import CardList from "../components/CardList";
import instance from "../ethereum/factory";
import Layout from "../components/Layout";


function index() {

    const [connection, setConnection] = useState({
        status: false,
        wallet: '',
        web3Obj: null,
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
            let newConnection = {
                status: true,
                wallet: account[0],
                web3Obj: web3,
                campaignFactoryContract: campaignFactoryContract
            }
            setConnection(newConnection);

            console.log("web3", web3);
            localStorage.setItem("web3", web3);
        }
        else {
            setConnection({
                status: false,
                wallet: '',
                web3Obj: null,
                campaignContract: null
            });
            localStorage.setItem("web3", null);
        }

    }


    const loadCampaigns = async () => {
        if (connection.status) {
            let campaigns = await connection.campaignFactoryContract.methods.getDeployedCampaigns().call()
            setCampaigns(campaigns);
        }
    }

    useEffect(() => {
        let web3 = localStorage.getItem("web3");
        console.log('web3', web3);
        //tmpConnection = JSON.parse(tmpConnection);
        // if(tmpConnection){
        //     setConnection(tmpConnection);
        // }
        if (connection.web3Obj) {
            loadCampaigns();
        }
    }, []);

    // if(connection.status)
    //     return (
    //         <>   
    //             <div>
    //                 <ConnectionButton connection={connection} onClick={clickConnectionButton} />
    //             </div>
    //             <div>
    //                 <h1> Campaigns list </h1>
    //                 <CardList list={campaigns}/>
    //             </div>
    //         </>
    //     );
    // else 
    //         return (
    //             <div>
    //                 <ConnectionButton connection={connection} onClick={clickConnectionButton} />
    //             </div>
    //         )

    return (
        <Layout>
            <h1> Index </h1>
        </Layout>
    )
}


export default index;