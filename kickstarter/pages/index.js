import React, { useEffect, useState, useContext } from "react"
import Layout from "../components/Layout";
import { GlobalContext} from "../components/GlobalContext";
import CardList from "../components/CardList";

async function getFunction(){

}

function index() {

    const {state, setState} = useContext(GlobalContext);

    const [campaigns, setCampaigns] = useState([]);

    const getCampaignsList = async (campaignFactoryInstance) => { 
       let ris =  await campaignFactoryInstance.methods.getDeployedCampaigns().call();
       console.log(ris);
       setCampaigns(ris);
    }  

    useEffect(() => {
        console.log('index page loaded =>', state)
    }, []);

    useEffect(() => {
        console.log("Index.js State changed => ", state)
 
        if(state.isConnected && state.campaignFactoryInstance){
            getCampaignsList(state.campaignFactoryInstance);
            console.log(campaigns);         
        }
    }, [state]);



    if (state?.isConnected) {
        return (<>
                <Layout>
                    <CardList list={campaigns} />
                </Layout>
        </>)
    }
    else {
        return (<>
                <Layout>
                    <h1> Connect your wallet</h1>
                </Layout>
        </>)
    }

}


export default index;