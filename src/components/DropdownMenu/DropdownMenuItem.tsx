import React, { ReactNode } from "react";
import styled from "styled-components";

type Props = {
    onClick?: (SyntheticEvent) => void | Promise<void>;
    children?: ReactNode;
    disabled?: boolean;
};

const DropdownMenuItem = ({ onClick, children, disabled, ...rest }: Props) => {
    return (
        <MenuItem
            onClick={disabled ? undefined : onClick}
            disabled={disabled}
            role="menuitem"
            tabIndex="-1"
            {...rest}
        >
            {children}
        </MenuItem>
    );
};

const MenuItem = styled.a`
    display: flex;
    margin: 0;
    padding: 0px 12px;
    height: 30px;

    color: ${props => (props.disabled ? props.theme.textTertiary : props.theme.textSecondary)};
    justify-content: left;
    align-items: center;
    font-size: 14px;
    cursor: default;
    user-select: none;

    svg:not(:last-child) {
        margin-right: 8px;
    }

    svg {
        opacity: ${props => (props.disabled ? ".5" : 1)};
    }

    ${props =>
        props.disabled
            ? "pointer-events: none;"
            : `

  &:hover {
    color: ${props.theme.white};
    background: ${props.theme.primary};
    box-shadow: none;
    cursor: pointer;

    svg {
      fill: ${props.theme.white};
    }
  }
  `};
`;

export default DropdownMenuItem;
