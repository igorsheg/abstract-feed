/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import nextCookie from "next-cookies";
import { Redirect } from "../utils/redirect";
import { NextPage, NextPageContext } from "next";
import useSWR from "swr";
import { AbstractClient } from "../../abstractClient";
import { Project } from "abstract-sdk";
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
    const delay = 1000 * 30;

    const { data: projects } = useSWR<Project[]>(["projects", sectionId], () =>
        api.projects.list({ organizationId }, { filter: "active", sectionId })
    );

    const [projectSteps, setProjectStep]: any = useInterval({
        data: projects,
        delay
    });

    if (!projects) return null;

    return (
        <SingleProject
            key={projects[projectSteps].id}
            token={token}
            api={api}
            projectSteps={[projectSteps, setProjectStep]}
            project={projects[projectSteps]}
        />
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
