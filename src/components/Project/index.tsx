import React, { FC, useEffect } from "react";
import { Project, Collection, Client } from "../../utils/types";
import useSWR from "swr";
import fetch from "isomorphic-unfetch";

interface ProjectProps {
    project: Project;
    api: Client;
    steps: any;
    token: string;
}

const SingleProject: FC<ProjectProps> = ({ steps, project, api, token }) => {
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

    useEffect(() => {
        if (collections) {
            fetch("api/getPreviews", {
                method: "POST",
                body: JSON.stringify({
                    token,
                    projectId: project.id,
                    branchId: "master",
                    fileId: collections[0].layers[0].fileId,
                    layerId: collections[0].layers[0].layerId,
                    sha: "latest"
                })
            });
        }
    }, []);

    if (!collections?.length) return null;
    return <p>{project.name}</p>;
};

export default SingleProject;
