import React from "react";
import Icon from "./Icon";

export default function ArrowDown(props) {
    return (
        <Icon {...props}>
            <path fill="none" d="M0 0h24v24H0z" />
            <path d="M12 15l-4.243-4.243 1.415-1.414L12 12.172l2.828-2.829 1.415 1.414z" />
        </Icon>
    );
}
