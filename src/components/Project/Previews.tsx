import React, { useEffect, useState } from "react";
import useSWR, { mutate } from "swr";
import useFetch from "../../../lib/utils/useFetch";
import useInterval from "../../../lib/utils/useInterval";
import { animated, useTransition, useSpring } from "react-spring";
import styled from "styled-components";

const Previews = ({ collection, project, token, collectionSteps }) => {
    const { data: settings } = useSWR("store/settings");
    const [currentPreviews, setCurrentPreviews] = useState(null);
    const [collectionStep, setCollectionStep] = collectionSteps;

    const { delays } = settings;

    const [previewStep] = useInterval({
        data: collection.layers,
        delay: delays.previews
    });

    const previewData = {
        projectId: project.id,
        collection: collection,
        branchId: "master",
        sha: "latest"
    };

    const fetcher = useFetch(token);

    const { data: previews } = useSWR(
        ["api/getPreviews", collection.id],
        url => fetcher(url, previewData),
        { onError: e => console.log("Error in Previews", e) }
    );

    useEffect(() => {
        if (previews) {
            mutate("store/ui", { isLoading: false });
            setCurrentPreviews(previews);
        }
    }, [previews]);

    if (!previews && !currentPreviews) return null;

    const transitions = useTransition(
        previews ? previews[previewStep] : currentPreviews[previewStep],
        item => item.webUrl,
        {
            from: { opacity: 0, transform: "translateX(-20px)" },
            enter: { opacity: 1, transform: "translateX(0px)" },
            leave: { opacity: 0, transform: "translateX(20px)" }
        }
    );

    const fadeProps = useSpring({ opacity: !previews ? 0 : 1 });

    return (
        <animated.div style={fadeProps}>
            {transitions.map(({ item, props, key }) => (
                <StyledPreview key={key} style={props}>
                    <img src={`data:image/png;base64,${item.webUrl}`} />
                </StyledPreview>
            ))}
        </animated.div>
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
