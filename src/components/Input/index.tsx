import React, { FC } from "react";
import Trigger from "rc-trigger";
import styled from "styled-components";

type DropdownProps = {
    options?: any[];
    value: string;
    onChange?: (e?) => void;
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
const Input: FC<DropdownProps> = ({ options, value, onChange }) => {
    if (!options) return <input onChange={onChange} value={value} />;
    return (
        <Trigger
            action={["click", "focus"]}
            popup={<Dropdown options={options} onChange={onChange} />}
            mask={false}
            destroyPopupOnHide
            popupAlign={{
                points: ["t", "b"]
            }}
        >
            <StyledInput onChange={e => console.log(e)} value={value} />
        </Trigger>
    );
};

const StyledInput = styled.input`
    height: 42px;
    border-radius: 4px;
    border: 1px solid ${props => props.theme.D70};
    font-size: 14px;
    padding: 0 12px;
`;
const StyledDropdown = styled.ul`
    width: 144px;
    box-shadow: rgba(0, 0, 0, 0.0470588) 0px 0px 0px 1px, rgba(0, 0, 0, 0.0784314) 0px 4px 8px,
        rgba(0, 0, 0, 0.0784314) 0px 2px 4px;
    list-style: none;
    padding: 6px 0;
    margin: 0;
    border-radius: 6px;
    li {
        height: 30px;
        padding: 0 12px;
        display: flex;
        align-items: center;

        &:hover {
            background: ${props => props.theme.D20};
        }
    }
`;

export default Input;
