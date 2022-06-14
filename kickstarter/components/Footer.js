import { Grid, Box, AppBar, Toolbar, Typography, Container, Stack } from '@mui/material';
import React from 'react';
import ConnectionButton from './ConnectionButton';
import { useEffect, useState } from 'react';
import instance from '../ethereum/factory';

function Footer() {

    return (

        <Grid container
            spacing={4}
            direction="row"
        >
            <Grid item
                xs={4}>
                <Typography
                    variant="h5">
                    Footer 1
                </Typography>
            </Grid>

            <Grid item
                xs={4}>
                <Typography
                    variant="h5">
                    Footer 2
                </Typography>
            </Grid>

            <Grid item
                xs={4}>
                <Typography
                    variant="h5">
                    Footer 3
                </Typography>
            </Grid>
        </Grid>
    )
}

export default Footer;