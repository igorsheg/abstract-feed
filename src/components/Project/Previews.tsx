import React, { FC, useEffect } from "react";
import { Project, Collection, Client } from "../../utils/types";
import useSWR from "swr";
import fetch from "isomorphic-unfetch";
import useInterval from "../../utils/useInterval";

const getPreviews = ({ token, projectId, fileId, layerId }) => {
    return fetch("api/getPreviews", {
        method: "POST",
        body: JSON.stringify({
            token,
            projectId,
            branchId: "master",
            fileId,
            layerId,
            sha: "latest"
        })
    }).then(x => x.json());
};

const Previews = ({ collection, project, token }) => {
    const previewData = {
        token,
        projectId: project.id,
        fileId: collection.layers[0].fileId,
        layerId: collection.layers[0].layerId
    };

    const { data: previews } = useSWR(["previews", collection.id], () => getPreviews(previewData));

    useEffect(() => {
        console.log(previews);
    }, [previews]);

    if (!previews) return null;
    return (
        <div>
            <h2>{collection.name}</h2>
            <img src={`data:image/png;base64,${previews.webUrl}`} />
        </div>
    );
};

export default Previews;
