import React, { FC, useEffect } from "react";
import { Project, Collection, Client } from "../../utils/types";
import useSWR from "swr";
import fetch from "isomorphic-unfetch";
import useInterval from "../../utils/useInterval";
import Previews from "./Previews";

interface ProjectProps {
    project: Project;
    api: Client;
    projectSteps: any;
    token: string;
}

const SingleProject: FC<ProjectProps> = ({ projectSteps, project, api, token }) => {
    const [pSteps, setProjectStep] = projectSteps;

    const { data: collections } = useSWR<Collection[]>(["collections", project.id], () =>
        api.collections.list({ projectId: project.id, branchId: "master" })
    );

    useEffect(() => {
        if (collections) {
            if (!collections.length) return setProjectStep(pSteps + 1);
        }
    }, [collections]);

    if (!collections?.length) return null;

    const [collectionStep, setCollectionStep]: any = useInterval({
        data: collections,
        delay: 4000
    });

    useEffect(() => {
        console.log(collectionStep, collections);
    }, [collectionStep]);

    return (
        <div>
            <h1>{project.name}</h1>
            <Previews token={token} project={project} collection={collections[collectionStep]} />
        </div>
    );
};

export default SingleProject;
