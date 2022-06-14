import React, { useState, useEffect, useContext } from "react";
import { GlobalContext } from "../components/GlobalContext";

function MyApp({ Component, pageProps }) {

    const [state, setState] = useState({
        isConnected: false,
        web3: undefined,
        wallet: ''
    });
    
    useEffect(() => {
            console.log('_app.js global state', state)
        }, []);

    return <>
        <title> Kickstart DeFi</title>
        <GlobalContext.Provider value={{state, setState}}>
            <Component {...pageProps} />
        </GlobalContext.Provider>
    </>
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default MyApp