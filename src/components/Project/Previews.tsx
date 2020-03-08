import React, { useEffect } from "react";
import useSWR, { mutate } from "swr";
import useFetch from "../../../lib/utils/useFetch";
import useInterval from "../../../lib/utils/useInterval";
import { animated, useTransition } from "react-spring";
import styled from "styled-components";
import { UiStore } from "../../../lib/store";

const Previews = ({ collection, project, token }) => {
    const { data: settings } = useSWR("store/settings");
    const { data: UiState } = useSWR("store/ui", { initialData: UiStore });

    const { delays } = settings;

    const [previewStep]: any = useInterval({
        data: collection.layers,
        delay: delays.previews,
        isLoading: UiState.isLoading
    });

    const previewData = {
        projectId: project.id,
        collection: collection,
        branchId: "master",
        sha: "latest"
    };

    const fetcher = useFetch(token);

    const { data: previews } = useSWR(["api/getPreviews", collection.id], url =>
        fetcher(url, previewData)
    );

    useEffect(() => {
        if (previews) {
            mutate("store/ui", { isLoading: false });
        } else if (!previews) {
            mutate("store/ui", { isLoading: true });
        }
    }, [previews]);

    useEffect(() => {
        console.log(UiState);
    }, [UiState]);

    if (!previews) return null;

    const transitions = useTransition(previews[previewStep], item => item.webUrl, {
        from: { opacity: 0, transform: "translateX(-20px)" },
        enter: { opacity: 1, transform: "translateX(0px)" },
        leave: { opacity: 0, transform: "translateX(20px)" }
    });

    return (
        <>
            {transitions.map(({ item, props, key }) => (
                <StyledPreview key={key} style={props}>
                    <img src={`data:image/png;base64,${item.webUrl}`} />
                </StyledPreview>
            ))}
        </>
    );
};

const StyledPreview = styled(animated.div)`
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    img {
        width: 100vw;
        display: block;
    }
`;

export default Previews;
