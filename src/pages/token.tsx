import React, { useState } from "react";
import { NextPage } from "next";
import Router from "next/router";
import nextCookie from "next-cookies";
import { Redirect } from "../../lib/utils/redirect";
import styled from "styled-components";
import Input from "../components/Input";
import Button from "../components/Button";
import LoadingDots from "../components/Loader/LoadingDots";
import { useToasts } from "../components/Toasts";
import useFetch from "../../lib/utils/useFetch";

const Login: NextPage = () => {
    const [token, setToken] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const toasts = useToasts();
    const fetcher = useFetch(token);

    const handleTokenSubmit = async () => {
        if (!token?.length) {
            toasts?.current.error(`Token field cannot be empty.`);
            return;
        }
        if (token?.length) {
            setIsLoading(true);
            const listOrgs = await fetcher("api/listOrganizations");

            if (!listOrgs?.length) {
                setIsLoading(false);
                toasts?.current.error("Invalid token, please try again.");
                return;
            }
            await fetcher("api/tokenCookie", { token });
            Router.replace("/setup");
        }
    };

    return (
        <StyledPage>
            <Title>
                <h1>Setup Access Token</h1>
                <h3>
                    Enter your Abstract personal access token. Don&apos;t have one yet? You can{" "}
                    <a href="https://app.goabstract.com/account/tokens">
                        generate a personal access token
                    </a>
                    .
                </h3>
            </Title>
            <Body>
                <Input
                    placeholder="Your access token"
                    onChange={e => setToken(e.target.value)}
                    value={token}
                />
                <Button disabled={isLoading} type="button" onClick={handleTokenSubmit}>
                    {isLoading ? (
                        <LoadingDots color="#9A9A9A" size={3}>
                            Loading
                        </LoadingDots>
                    ) : (
                        " Submit Token"
                    )}
                </Button>
            </Body>
        </StyledPage>
    );
};

Login.getInitialProps = async ctx => {
    const { token } = nextCookie(ctx);
    if (token) Redirect(ctx, "/setup");
    return {};
};

const StyledPage = styled.div`
    display: flex;
    width: 720px;
    height: 100vh;
    justify-content: center;
    flex-direction: column;
`;
const Title = styled.div`
    margin: 0 0 0 0;
    border: 2px solid ${props => props.theme.D50};
    border-bottom: none;
    h1 {
        font-size: 3.8em;
        margin: 0;
        border-bottom: 2px solid ${props => props.theme.D50};
        padding: 36px;
    }
    h3 {
        font-size: 20px;
        font-weight: 300;
        line-height: 1.6em;
        margin: 0;
        padding: 36px;
    }
`;

const Body = styled.div`
    display: flex;
    flex-direction: row;

    button {
        width: 204px;
    }

    & div {
        flex: 5;
    }
`;

export default Login;
