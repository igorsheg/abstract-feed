/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import nextCookie from "next-cookies";
import { Redirect } from "../utils/redirect";
import { NextPage, NextPageContext } from "next";
import useSWR from "swr";
import { AbstractClient } from "../utils/abstractClient";
import { Project } from "../utils/types";
import SingleProject from "../components/Project";
import useInterval from "../utils/useInterval";

type IndexProps = {
    token: string;
    organizationId: any;
    sectionId: any;
};

const Index: NextPage<IndexProps> = props => {
    const { token, organizationId, sectionId } = props;
    const api = AbstractClient({ token });
    const delay = 10000;

    const { data: projects } = useSWR<Project[]>(["projects", sectionId], () =>
        api.projects.list({ organizationId }, { filter: "active", sectionId })
    );

    const { step, setStep } = useInterval({ data: projects, delay });

    if (!projects) return null;

    return (
        <SingleProject token={token} api={api} steps={[step, setStep]} project={projects[step]} />
    );
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
