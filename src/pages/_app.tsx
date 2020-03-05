import React from "react";
import { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import theme from "../../lib/utils/theme";
import GlobalStyle from "../../lib/globalStyles";
import Flex from "../components/Flex";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <GlobalStyle />
            <head>
                <meta
                    name="viewport"
                    content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=0,viewport-fit=cover"
                />
                <meta name="apple-mobile-web-app-status-bar-style" content="white" />
            </head>
            <ThemeProvider theme={theme}>
                <Flex justify="center" align="center">
                    <Component {...pageProps} />
                </Flex>
            </ThemeProvider>
        </>
    );
}

export default MyApp;
