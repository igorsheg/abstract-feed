import React, { FC, useEffect } from "react";
import { Project } from "abstract-sdk";
import useSWR from "swr";
import useInterval from "../../../lib/utils/useInterval";
import Previews from "./Previews";
import useFetch from "../../../lib/utils/useFetch";
import styled from "styled-components";

interface ProjectProps {
    project: Project;
    projectSteps: [number, (x: number) => void];
    token: string;
}

const SingleProject: FC<ProjectProps> = ({ projectSteps, project, token }) => {
    const [pSteps, setProjectStep] = projectSteps;
    const { data: settings } = useSWR("store");
    const { delays } = settings;

    const fetcher = useFetch(token);

    const { data: collections } = useSWR(["api/listCollections", project.id], (url, projectId) =>
        fetcher(url, { projectId })
    );

    useEffect(() => {
        if (collections) {
            if (!collections.length) return setProjectStep(pSteps + 1);
        }
    }, [collections]);

    if (!collections?.length) return null;

    const [collectionStep] = useInterval({
        data: collections,
        delay: delays.collections
    });

    return (
        <StyledProject>
            <ProjectData>
                <img src={project.createdByUser.avatarUrl} />
                <div>
                    <h1>{project.name}</h1>
                    <h2>{project.about}</h2>
                </div>
            </ProjectData>
            <Previews token={token} project={project} collection={collections[collectionStep]} />
        </StyledProject>
    );
};

const StyledProject = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
`;
const ProjectData = styled.div`
    z-index: 991;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100vw;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0 6em;
    height: 40vh;
    background: linear-gradient(
        to bottom,
        hsla(0, 0%, 0%, 0) 0%,
        hsla(0, 0%, 0%, 0.013) 8.1%,
        hsla(0, 0%, 0%, 0.049) 15.5%,
        hsla(0, 0%, 0%, 0.104) 22.5%,
        hsla(0, 0%, 0%, 0.175) 29%,
        hsla(0, 0%, 0%, 0.259) 35.3%,
        hsla(0, 0%, 0%, 0.352) 41.2%,
        hsla(0, 0%, 0%, 0.45) 47.1%,
        hsla(0, 0%, 0%, 0.55) 52.9%,
        hsla(0, 0%, 0%, 0.648) 58.8%,
        hsla(0, 0%, 0%, 0.741) 64.7%,
        hsla(0, 0%, 0%, 0.825) 71%,
        hsla(0, 0%, 0%, 0.896) 77.5%,
        hsla(0, 0%, 0%, 0.951) 84.5%,
        hsla(0, 0%, 0%, 0.987) 91.9%,
        hsl(0, 0%, 0%) 100%
    );
    h1 {
        font-size: 42px;
        margin: 0 0 0.5em 0;
    }
    h2 {
        font-size: 20px;
        margin: 0;
    }
    img {
        width: 66px;
        height: 66px;
        border-radius: 66px;
        overflow: hidden;
        margin: 0 24px 0 0;
    }
    div {
        flex-direction: column;
    }
`;

export default SingleProject;
