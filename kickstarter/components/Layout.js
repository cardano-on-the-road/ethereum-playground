import React, {useEffect, useState} from "react";
import Header from "./Header"

import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Stack, Container, Box } from "@mui/material";
import Footer from "./Footer";

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

function Layout(props) {



    return (
        <>
            <ThemeProvider theme={darkTheme}>
                    <Header />

                    <Container maxWidth="xl">
                        {props.children}
                    </Container>

                    <Footer />
            </ThemeProvider>
        </>
    );
}

export default Layout;