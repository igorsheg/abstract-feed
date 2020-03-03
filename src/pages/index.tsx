import React from "react";
import nextCookie from "next-cookies";
import { Redirect } from "../utils/redirect";
import { NextPage, NextPageContext } from "next";

const Index: NextPage = () => {
    return <div>Hello World. </div>;
};

Index.getInitialProps = async (ctx: NextPageContext) => {
    const { token } = nextCookie(ctx);
    if (!token) {
        Redirect(ctx, "/token");
        return { token: "" };
    }
    return { token };
};

export default Index;
