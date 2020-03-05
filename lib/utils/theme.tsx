// @flow
import { darken, lighten } from "polished";

const colors = {
    D10: "#FFFFFF",
    D20: "#F3F3F3",
    D30: "#DADADA",
    D40: "#9A9A9A",
    D50: "#2F3336",
    D60: "#16181D",
    D70: "#222324",
    D80: "#111111",

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
