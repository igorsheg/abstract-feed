import React from "react";

function Icon({ children, className, onClick, theme, ...rest }) {
    const size = rest.size ? rest.size + "px" : "24px";
    let fill = rest.stroke ? "none" : rest.color ? rest.color : "#111";
    const stroke = rest.color ? rest.color : "#111";
    if (rest.stroke) fill = "none";
    if (rest.color) fill = rest.color;
    if (rest.light) fill = "#FFF";
    if (rest.black) fill = "#111";

    return (
        <svg
            fill={fill}
            stroke={rest.stroke ? stroke : "none"}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            onClick={onClick}
        >
            {children}
        </svg>
    );
}

export default Icon;
