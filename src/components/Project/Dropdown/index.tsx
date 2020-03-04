import React from "react";
import { Organization } from "abstract-sdk";

type DropdownProps = {
    data: Organization[];
    type: string;
    changeHandler: ({ type, id }: { type: string; id: string }) => void;
};

const Dropdown = ({ data, changeHandler, type }: DropdownProps) => {
    return (
        <select
            disabled={data ? false : true}
            onChange={e => changeHandler({ type, id: e.target.value })}
        >
            {data ? (
                data.map(item => (
                    <option value={item.id} key={item.id}>
                        {item.name}
                    </option>
                ))
            ) : (
                <option>No avalible sections</option>
            )}
        </select>
    );
};

export default Dropdown;
