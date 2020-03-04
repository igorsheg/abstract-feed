/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import nextCookie from "next-cookies";
import { Redirect } from "../utils/redirect";
import { NextPage, NextPageContext } from "next";
import useSWR from "swr";
import { AbstractClient } from "../utils/abstractClient";

type IndexProps = {
    token: string;
    organizationId: any;
    sectionId: any;
};

const Index: NextPage<IndexProps> = props => {
    const { token, organizationId, sectionId } = props;
    const api = AbstractClient({ token });

    const { data: projects } = useSWR(["projects", sectionId], () =>
        api.projects.list({ organizationId }, { filter: "active", sectionId })
    );

    useEffect(() => {
        console.log(projects);
    }, [projects]);

    return <div>Hello World. </div>;
};

Index.getInitialProps = async (ctx: NextPageContext): Promise<IndexProps> => {
    const { token } = nextCookie(ctx);
    const { sectionId, organizationId } = ctx.query;

    if (!token || !sectionId || !organizationId) {
        Redirect(ctx, "/token");
    }
    return { token, sectionId, organizationId };
};

export default Index;
