/* eslint-disable @typescript-eslint/ban-ts-ignore */
import { Client } from "./types";

const AbstractClient = ({ token }: { token: string }) => {
    const client: Client = new Client({
        accessToken: token,
        transportMode: ["cli", "api"]
    });
    return client;
};

export { AbstractClient };
