import * as Abstract from "abstract-sdk";

const AbstractClient = ({ token }: { token: string }) => {
    return new Abstract.Client({
        accessToken: token,
        transportMode: ["cli", "api"]
    });
};

export { AbstractClient };
