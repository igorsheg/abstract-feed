import React, { FC } from "react";
import LoadingDots from "./LoadingDots";
import styled from "styled-components";

const Loader: FC<{ centered?: boolean }> = ({ centered }) => {
    return (
        <StlyedLoader centered={centered}>
            <LoadingDots color="white" size={3}>
                Loading
            </LoadingDots>
        </StlyedLoader>
    );
};

const StlyedLoader = styled.div<{ centered: boolean }>`
    font-size: 12px;
    text-transform: uppercase;
    font-weight: 600;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    align-self: center;
    letter-spacing: 0.1em;
    padding: 18px 24px;
    /* border: 1px solid ${props => props.theme.D50}; */
    ${props =>
        props.centered &&
        ` 
        position: absolute;
        top: 0;
        transform: translateY(50vh);
    `}
`;

export default Loader;
