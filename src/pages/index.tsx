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
import { animated, useSpring } from "react-spring";
import Log from "../../lib/utils/Log";

type IndexProps = {
    token: string;
    organizationId: string | string[];
    sectionId: string | string[];
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
        (url, organizationId, sectionId) => fetcher(url, { organizationId, sectionId }),
        {
            refreshInterval: delays.refresh,
            onError: e => Log({ message: "Error Getting Projects:", e })
        }
    );

    const [projectSteps, setProjectStep] = useInterval({
        data: projects,
        delay: delays.projects
    });

    if (!projects) return null;
    console.log(projects);

    const lodaerAnimProps = useSpring({
        opacity: isLoading ? 1 : 0,
        display: isLoading ? "flex" : "none"
    });

    return (
        <>
            <CoverLoader style={lodaerAnimProps}>
                <Loader />
            </CoverLoader>
            <Wrap>
                <SingleProject
                    key={projects[projectSteps].id}
                    token={token}
                    projectSteps={[projectSteps, setProjectStep]}
                    project={projects[projectSteps]}
                />
            </Wrap>
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

const CoverLoader = styled(animated.div)`
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
