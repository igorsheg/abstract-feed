import React from "react";
import { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import theme from "../../lib/utils/theme";
import GlobalStyle from "../../lib/globalStyles";
import Flex from "../components/Flex";
import { animated, useTransition } from "react-spring";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }: AppProps) {
    const router = useRouter();

    const transitions = useTransition(router, item => item.pathname, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 }
    });

    return (
        <>
            <GlobalStyle />
            <head>
                <link
                    rel="stylesheet"
                    as="font"
                    href="https://rsms.me/inter/inter.css"
                    type="font/woff2"
                    crossOrigin="anonymous"
                ></link>
                <meta
                    name="viewport"
                    content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=0,viewport-fit=cover"
                />
            </head>
            <ThemeProvider theme={theme}>
                {transitions.map(({ props, key }) => (
                    <animated.div key={key} style={props}>
                        <Flex justify="center" align="center">
                            <Component {...pageProps} />
                        </Flex>
                    </animated.div>
                ))}
            </ThemeProvider>
        </>
    );
}

export default MyApp;
