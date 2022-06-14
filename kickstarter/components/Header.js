import { Grid, Box, AppBar, Toolbar, Typography, Container, Stack } from '@mui/material';
import React from 'react';
import ConnectionButton from './ConnectionButton';
import { useEffect, useState, useContext } from 'react';
import CampaignFactoryInstance from '../ethereum/factory';
import { GlobalContext } from './GlobalContext';



const Header = () => {


    const {state, setState} = useContext(GlobalContext);

    //Insert reducer

    useEffect(() => {
        console.log('Loading header')
        // Check if wallet connection from storage
    }, [])


    const clickConnectionButton = async (web3callback) => {
        //web3connection is a callback from ConnectionButton
        let web3 = await web3callback();
        console.log('ConnectionButton clicked');

        if (web3) {
            let account = await web3.eth.getAccounts();
            let campaignFactoryInstance = await CampaignFactoryInstance(web3);
            let newState = {
                isConnected: true,
                wallet: account[0],
                web3:web3,
                campaignFactoryInstance: campaignFactoryInstance
            }
            setState(newState);
            localStorage.setItem("isConnected", true);
            localStorage.setItem("wallet", account[0]);
        }
        else {
            setState({
                isConnected: false,
                wallet: '',
                web3: undefined,
                campaignFactoryInstance: undefined
            });
            localStorage.setItem("isConnected", false);
            localStorage.removeItem("wallet");
        }
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
                        <ConnectionButton connection={state} onClick={clickConnectionButton} />
                    </Grid>
                </Grid>
            </Toolbar>
            </Container>
        </AppBar>
    )
}

export default Header;