import { Client, Organization } from "abstract-sdk";

const AbstractClient = ({ token }: { token: string }) => {
    const client: Client = new Client({
        accessToken: token,
        transportMode: ["cli", "api"]
    });

    return {
        listOrganizations: (): Promise<Organization[]> => {
            return client.organizations.list();
        }
    };
};

export { AbstractClient };
