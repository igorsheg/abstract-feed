import React from "react";
import { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import theme from "../../lib/utils/theme";
import GlobalStyle from "../../lib/globalStyles";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <GlobalStyle />
            <ThemeProvider theme={theme}>
                <Component {...pageProps} />;
            </ThemeProvider>
        </>
    );
}

export default MyApp;
