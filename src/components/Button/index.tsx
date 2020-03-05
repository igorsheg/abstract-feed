import styled from "styled-components";
import { darken, lighten } from "polished";

const Button = styled.button`
    display: inline-block;
    margin: 0;
    padding: 0 36px;
    border: 0;
    background: ${props => props.theme.B10};
    color: ${props => props.theme.D10};
    box-shadow: rgba(0, 0, 0, 0.2) 0px 1px 2px;
    border-radius: 4px;
    font-size: 16px;
    font-weight: 600;
    height: 54px;
    text-decoration: none;
    flex-shrink: 0;
    outline: none;
    cursor: pointer;
    user-select: none;
    svg {
        fill: ${props => props.theme.D80};
    }
    &::-moz-focus-inner {
        padding: 0;
        border: 0;
    }
    &:hover {
        background: ${props => darken(0.05, props.theme.B10)};
    }
    &:focus {
        transition-duration: 0.05s;
        box-shadow: ${props => lighten(0.4, props.theme.B10)} 0px 0px 0px 3px;
        outline: none;
    }
    &:disabled {
        cursor: default;
        pointer-events: none;
        color: ${props => props.theme.D80};
        background: ${props => props.theme.D70};
    }
`;

export default Button;
