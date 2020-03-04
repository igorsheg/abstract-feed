/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import nextCookie from "next-cookies";
import { Redirect } from "../utils/redirect";
import { NextPage, NextPageContext } from "next";
import useSWR from "swr";
import SingleProject from "../components/Project";
import useInterval from "../utils/useInterval";
import useFetch from "../utils/useFetch";

type IndexProps = {
    token: string;
    organizationId: any;
    sectionId: any;
};

const Index: NextPage<IndexProps> = props => {
    const { token, organizationId, sectionId } = props;
    const delay = 1000 * 30;

    const fetcher = useFetch(token);

    const { data: projects } = useSWR(
        organizationId ? ["api/listProjects", organizationId, sectionId] : null,
        (url, organizationId, sectionId) => fetcher(url, { organizationId, sectionId })
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
