/* eslint-disable no-console */

export default function Log(msgOrObj) {
    const isInDev = process.env.NODE_ENV !== "production";

    if (isInDev) {
        console.log(`# ->: ${msgOrObj}`);
    }
}
