import Router from "next/router";
import { NextPageContext } from "next";

export const Redirect = (context: NextPageContext, target: string) => {
    if (context.res) {
        context.res.statusCode = 302;
        context.res.setHeader("Location", target);
        context.res.end();
    } else {
        Router.replace(target);
    }
};
