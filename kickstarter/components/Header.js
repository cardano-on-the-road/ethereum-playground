import { Grid, Box, AppBar, Toolbar, Typography, Container, Stack } from '@mui/material';
import React from 'react';
import ConnectionButton from './ConnectionButton';
import { useEffect, useState } from 'react';
import instance from '../ethereum/factory';



const Header = () => {

    const [connection, setConnection] = useState({
        status: false,
        wallet: '',
        web3Obj: null,
        campaignFactoryContract: null
    });

    const [campaigns, setCampaigns] = useState([]);
    //verify is the web3 is stored in the cookie

    const storageEventHandler = e => {
        console.log('event triggered')
    }

    useEffect(() => {
        if (typeof window !== "undefined") {

        }
        console.log('Event listner');
        window.addEventListener("storage", storageEventHandler);
        return () => {
            // Remove the handler when the component unmounts
            window.removeEventListener("storage", storageEventHandler);
        };
    }, []);


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
            localStorage.setItem("campaignFactory", "test campaign factory");
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
        localStorage.setItem("test", 'Trigger test');

    }


    return (
        <AppBar position="static">
            <Container maxWidth="xl">
            <Toolbar disableGutters>
                <Grid container
                    spacing={4}
                    direction="row"
                >
                    <Grid item
                        xs={2}>
                        <Typography
                            variant="h5"
                        >
                            Kickstart
                        </Typography>
                    </Grid>

                    <Grid item
                        justify="flex-end"
                        xs={10}>
                        <ConnectionButton connection={connection} onClick={clickConnectionButton} />
                    </Grid>
                </Grid>
            </Toolbar>
            </Container>
        </AppBar>
    )
}

export default Header;