import React from "react";
import Header from "./Header"

import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Stack, Container, Box } from "@mui/material";

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

function Layout(props) {

    return (
        <>
            <ThemeProvider theme={darkTheme}>
                    
                    <Header/>

                    <Container maxWidth="xl">
                    {props.children}
                    </Container>
                    
                    <Container maxWidth="xl">
                        Footer
                    </Container>
                
            </ThemeProvider>
        </>
    );
}

export default Layout;