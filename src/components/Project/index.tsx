import React, { FC, useEffect } from "react";
import { Project } from "abstract-sdk";
import useSWR from "swr";
import useInterval from "../../utils/useInterval";
import Previews from "./Previews";
import useFetch from "../../utils/useFetch";

interface ProjectProps {
    project: Project;
    projectSteps: [number, (x: number) => void];
    token: string;
}

const SingleProject: FC<ProjectProps> = ({ projectSteps, project, token }) => {
    const [pSteps, setProjectStep] = projectSteps;

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
        delay: 4000
    });

    return (
        <div>
            <h1>{project.name}</h1>
            <Previews token={token} project={project} collection={collections[collectionStep]} />
        </div>
    );
};

export default SingleProject;
