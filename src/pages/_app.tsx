import React from "react";
import { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import theme from "../../lib/utils/theme";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ThemeProvider theme={theme}>
            <Component {...pageProps} />;
        </ThemeProvider>
    );
}

export default MyApp;
