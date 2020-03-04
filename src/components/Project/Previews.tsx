import React from "react";
import useSWR from "swr";
import useFetch from "../../utils/useFetch";

const Previews = ({ collection, project, token }) => {
    const previewData = {
        projectId: project.id,
        branchId: "master",
        fileId: collection.layers[0].fileId,
        layerId: collection.layers[0].layerId,
        sha: "latest"
    };

    const fetcher = useFetch(token);

    const { data: previews } = useSWR(["api/getPreviews", collection.id], url =>
        fetcher(url, previewData)
    );

    if (!previews) return null;
    return (
        <div>
            <h2>{collection.name}</h2>
            <img src={`data:image/png;base64,${previews.webUrl}`} />
        </div>
    );
};

export default Previews;
