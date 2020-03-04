import * as Abstract from "abstract-sdk";

const AbstractClient = ({ token }: { token: string }) => {
    const client = new Abstract.Client({
        accessToken: token,
        transportMode: ["cli", "api"]
    });
    return client;
};

export { AbstractClient };
