import React from "react";
import styled from "styled-components";
import { darken, lighten } from "polished";

const RealButton = styled.button`
    display: inline-block;
    margin: 0;
    padding: 0;
    border: 0;
    background: ${props => props.theme.buttonBackground};
    color: ${props => props.theme.buttonText};
    box-shadow: rgba(0, 0, 0, 0.2) 0px 1px 2px;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 500;
    height: 32px;
    text-decoration: none;
    flex-shrink: 0;
    outline: none;
    cursor: pointer;
    user-select: none;
    svg {
        fill: ${props => props.theme.buttonText};
    }
    &::-moz-focus-inner {
        padding: 0;
        border: 0;
    }
    &:hover {
        background: ${props => darken(0.05, props.theme.buttonBackground)};
    }
    &:focus {
        transition-duration: 0.05s;
        box-shadow: ${props => lighten(0.4, props.theme.buttonBackground)} 0px 0px 0px 3px;
        outline: none;
    }
    &:disabled {
        cursor: default;
        pointer-events: none;
        color: ${props => props.theme.white50};
    }
`;

export default RealButton;
