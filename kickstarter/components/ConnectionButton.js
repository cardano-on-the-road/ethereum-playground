import React, { Component, useState } from "react";
import Web3 from "web3";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';



function ConnectionButton(props) {

    const web3Connection = async () => {
        if (window.ethereum) {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            return new Web3(window.ethereum);
        } else {
            // Show alert if Ethereum provider is not detected
            alert("Please install Metamask");
        }
    }

    const web3Disconnect = async () => {
        return await null;
    }

    if (!props.connection.status) {
        return (
            <>

                <Stack
                    direction="row"
                    spacing={3}
                    justifyContent="right"
                    alignItems="center">
                    <Button onClick={() => props.onClick(web3Connection)} variant="contained">Connect</Button>
                </Stack>

            </>);
    }
    else {
        return (
            <>

                <Stack
                    direction="row"
                    spacing={3}
                    justifyContent="right"
                    alignItems="center">
                    <Typography variant="h6"> Wallet addr: {props.connection.wallet} </Typography>
                    <Button onClick={() => props.onClick(web3Disconnect)} variant="contained">Disconnect</Button>
                </Stack>
            </>);
    }

}

export default ConnectionButton;