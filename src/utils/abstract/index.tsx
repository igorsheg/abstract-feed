import { Client } from "abstract-sdk";

const AbstractClient = ({ token }: { token: string }) => {
    return new Client({
        accessToken: token,
        transportMode: ["cli", "api"]
    });
};

export { AbstractClient };
