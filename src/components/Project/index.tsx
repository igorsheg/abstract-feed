import React, { FC, useEffect } from "react";
import { Project, Collection } from "abstract-sdk";
import useSWR from "swr";
import { Client } from "abstract-sdk";

interface ProjectProps {
    project: Project;
    api: Client;
    steps: any;
}

const SingleProject: FC<ProjectProps> = ({ steps, project, api }) => {
    const [step, setStep] = steps;

    const { data: collections } = useSWR<Collection[]>(["collections", project.id], () =>
        api.collections.list({ projectId: project.id, branchId: "master" })
    );

    useEffect(() => {
        if (collections) {
            if (!collections.length) return setStep(step + 1);
            console.log(collections);
        }
    }, [collections]);

    if (!collections?.length) return null;
    return <p>{project.name}</p>;
};

export default SingleProject;
