import React, { useRef } from "react";
import { NextPage } from "next";
import Router from "next/router";
import nextCookie from "next-cookies";
import { Redirect } from "../utils/redirect";
// import fetch from "isomorphic-unfetch";

const Login: NextPage = () => {
    const tokenInput = useRef<HTMLInputElement>(null);

    const handleTokenSubmit = async () => {
        if (tokenInput.current) {
            const token = tokenInput.current.value;
            const authHeader = { headers: { Authorization: `bearer ${token}` } };

            const isValidToken = await fetch(`api/listOrganizations`, authHeader);
            console.log(await isValidToken.json());

            if (!isValidToken.ok) return;

            await fetch(`api/tokenCookie`, authHeader);
            Router.replace("/setup");
        }
    };

    return (
        <div>
            Login
            <form>
                <input name="token" ref={tokenInput} type="text" placeholder="token"></input>
                <button onClick={handleTokenSubmit} type="button">
                    Go!
                </button>
            </form>
        </div>
    );
};

Login.getInitialProps = async ctx => {
    const { token } = nextCookie(ctx);
    if (token) Redirect(ctx, "/setup");
    return {};
};

export default Login;
