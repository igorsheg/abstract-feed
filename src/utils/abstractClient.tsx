/* eslint-disable @typescript-eslint/ban-ts-ignore */
// import { Client } from "../utils/types";
import { Client } from "abstract-sdk";

const AbstractClient = ({ token }: { token: string }) => {
    const client = new Client({
        accessToken: token,
        transportMode: ["cli", "api"]
    });

    return client;
};

export { AbstractClient };
