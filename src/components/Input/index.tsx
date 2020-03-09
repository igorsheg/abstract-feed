import React, { FC } from "react";
import Trigger from "rc-trigger";
import styled from "styled-components";
import { ArrowDown } from "../../../lib/Icons";
import { Organization, Collection } from "abstract-sdk";

type DropdownProps = {
    options?: Organization[] | Collection[];
    value: string;
    onChange?: (e?) => void;
    withArrow?: boolean;
    disabled?: boolean;
    placeholder?: string;
};

const Dropdown = ({ options, onChange }) => {
    return (
        <StyledDropdown>
            {options.map(x => (
                <li onClick={() => onChange(x)} key={x.id}>
                    {x.name}
                </li>
            ))}
        </StyledDropdown>
    );
};
const Input: FC<DropdownProps> = ({
    options,
    value,
    onChange,
    withArrow,
    disabled,
    placeholder
}) => {
    if (!options?.length || disabled)
        return (
            <StyledInput disabled={disabled}>
                {withArrow && <ArrowDown size={24} />}
                <input
                    placeholder={placeholder}
                    onChange={onChange}
                    disabled={disabled}
                    value={value}
                />
            </StyledInput>
        );
    return (
        <StyledInput disabled={disabled}>
            <Trigger
                action={["focus"]}
                popup={<Dropdown options={options} onChange={onChange} />}
                stretch="width"
                destroyPopupOnHide
                forceRender
                popupAlign={{
                    points: ["t", "b"],
                    offset: [0, 3]
                }}
            >
                <input
                    placeholder={placeholder}
                    onChange={onChange}
                    disabled={disabled}
                    value={value}
                />
            </Trigger>
            {withArrow && <ArrowDown size={24} />}
        </StyledInput>
    );
};

const StyledInput = styled.div<{ disabled?: boolean }>`
    position: relative;
    display: flex;
    align-items: center;
    height: 66px;

    input {
        height: 100%;
        width: 100%;
        border-radius: 0;
        border: 2px solid ${props => props.theme.D50};
        font-size: 16px;
        margin: 0;
        padding: 0 21px;
        background: ${props => props.theme.D80};
        color: ${props => props.theme.D10};

        &:hover:not(:disabled) {
            background: ${props => props.theme.D70};
        }

        &:focus {
            border: 2px solid ${props => props.theme.D10};
            outline: none;
            z-index: 991;
        }
        &:disabled {
            border: 2px solid ${props => props.theme.D50};
            color: ${props => props.theme.D30};
        }
    }

    svg {
        position: absolute;
        right: 12px;
        pointer-events: none;
        z-index: 9991;
        fill: ${props => (props.disabled ? props.theme.D50 : props.theme.D10)};
    }
`;
const StyledDropdown = styled.ul`
    max-height: 200px;
    overflow-y: scroll;
    box-shadow: rgba(0, 0, 0, 0.0470588) 0px 0px 0px 1px, rgba(0, 0, 0, 0.0784314) 0px 4px 8px,
        rgba(0, 0, 0, 0.0784314) 0px 2px 4px;
    list-style: none;
    padding: 6px 0;
    margin: 0;
    border-radius: 4px;
    background: ${props => props.theme.D50};
    li {
        height: 36px;
        padding: 0 12px;
        line-height: 36px;
        white-space: nowrap;
        display: block;
        text-overflow: ellipsis;
        overflow-x: hidden;
        font-size: 14px;
        color: ${props => props.theme.D10};
        &:hover {
            cursor: pointer;
            background: ${props => props.theme.D70};
        }
    }
`;

export default Input;
