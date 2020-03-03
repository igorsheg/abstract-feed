import { Client } from "abstract-sdk";

const AbstractClient = ({ token }: { token: string }) => {
    return new Client({
        accessToken: token,
        transportMode: ["cli", "api"]
    });
};

const listOrganizations = ({ client }: { client: Client }) => {
    return client.organizations.list();
};

const listProjects = ({ client, organizationId }: listProjectsProps) => {
    return client.projects.list(
        { organizationId: organizationId },
        { filter: "active" }
    );
};

type listProjectsProps = {
    client: Client;
    organizationId: string;
};

export { AbstractClient, listOrganizations, listProjects };
