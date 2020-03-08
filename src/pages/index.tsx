/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import nextCookie from "next-cookies";
import { Redirect } from "../../lib/utils/redirect";
import { NextPage, NextPageContext } from "next";
import useSWR from "swr";
import SingleProject from "../components/Project";
import useInterval from "../../lib/utils/useInterval";
import useFetch from "../../lib/utils/useFetch";
import { UiStore } from "../../lib/store";
import Loader from "../components/Loader";
import styled from "styled-components";
import { useTransition, animated } from "react-spring";

type IndexProps = {
    token: string;
    organizationId: any;
    sectionId: any;
};

const Index: NextPage<IndexProps> = props => {
    const { token, organizationId, sectionId } = props;
    const { data: settings } = useSWR("store/settings");
    const { delays } = settings;

    const { data: UiState } = useSWR("store/ui", { initialData: UiStore });
    const { isLoading } = UiState;

    const fetcher = useFetch(token);

    const { data: projects } = useSWR(
        organizationId ? ["api/listProjects", organizationId, sectionId] : null,
        (url, organizationId, sectionId) => fetcher(url, { organizationId, sectionId })
    );

    const [projectSteps, setProjectStep]: any = useInterval({
        data: projects,
        delay: delays.projects
    });

    if (!projects) return null;
    const transitions = useTransition(projects[projectSteps], item => item.id, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 }
    });

    return (
        <>
            {isLoading && (
                <CoverLoader>
                    <Loader />
                </CoverLoader>
            )}
            {transitions.map(
                ({ props, key }) =>
                    projects && (
                        <Wrap key={key} style={props}>
                            <SingleProject
                                key={projects[projectSteps].id}
                                token={token}
                                projectSteps={[projectSteps, setProjectStep]}
                                project={projects[projectSteps]}
                            />
                        </Wrap>
                    )
            )}
        </>
    );
};

const Wrap = styled(animated.div)`
    width: 100vw;
    height: 100vh;
    position: absolute;
    left: 0;
    top: 0;
    background: ${props => props.theme.D80};
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 991;
`;

const CoverLoader = styled.div`
    width: 100vw;
    height: 100vh;
    position: absolute;
    left: 0;
    top: 0;
    background: ${props => props.theme.D80};
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999991;
`;

Index.getInitialProps = async (ctx: NextPageContext): Promise<IndexProps> => {
    const { token } = nextCookie(ctx);
    const { sectionId, organizationId } = ctx.query;

    if (!token || !sectionId || !organizationId) {
        Redirect(ctx, "/token");
    }
    return { token, sectionId, organizationId };
};

export default Index;
