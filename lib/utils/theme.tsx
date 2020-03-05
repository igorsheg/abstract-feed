// @flow
import { darken, lighten } from "polished";

const colors = {
    dark: "#111",
    D10: "#111",

    D20: "#F3F3F3",
    D70: "#DADADA",
    D80: "#FFFFFF",

    B10: "rgb(0, 85, 255)"
};

const spacing = {};

export const base = {
    ...colors,
    ...spacing
};
export const theme = {
    ...base
};
export default theme;
