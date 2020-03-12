import React, { useEffect, useState } from "react";
import useSWR, { mutate } from "swr";
import useFetch from "../../../lib/utils/useFetch";
import useInterval from "../../../lib/utils/useInterval";
import { animated, useTransition, useSpring } from "react-spring";
import styled from "styled-components";
import Log from "../../../lib/utils/Log";

const Previews = ({ collection, project, token }) => {
    const { data: settings } = useSWR("store/settings");
    const [currentPreviews, setCurrentPreviews] = useState(null);

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
        {
            onError: e => Log({ message: "Error Getting Previews:", e }),
            onErrorRetry: (error, key, option, revalidate, { retryCount }) => {
                if (retryCount >= 10) return;
                if (error.status === 404) return;

                // retry after 5 seconds
                setTimeout(() => revalidate({ retryCount: retryCount + 1 }), 5000);
            }
        }
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
        null,
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
                    {item ? (
                        <img src={`data:image/png;base64,${item.webUrl}`} />
                    ) : (
                        <pre>No Preview</pre>
                    )}
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
