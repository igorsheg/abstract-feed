import React, { useState, useEffect } from "react";
import { NextPage, NextPageContext } from "next";
import { Redirect } from "../utils/redirect";
import nextCookie from "next-cookies";
import { AbstractClient } from "../utils/abstractApi";
import { Organization, Section } from "abstract-sdk";

const OrganizationDropDown = (props: {
    organizations: Organization[] | null;
}) => {
    const { organizations } = props;
    if (organizations)
        return (
            <select>
                {organizations.map(org => (
                    <option key={org.id}>{org.name}</option>
                ))}
            </select>
        );
    return null;
};

type SetupProps = {
    organizations: Organization[] | null;
    sections: Section[] | null;
};

const Setup: NextPage<{ token: string }> = ({ token }) => {
    const api = AbstractClient({ token });

    const [data, setData] = useState<SetupProps>({
        organizations: null,
        sections: null
    });

    useEffect(() => {
        api.listOrganizations().then(orgs =>
            setData({ ...data, organizations: orgs })
        );
    }, []);

    return (
        <div>
            Hello World.
            <OrganizationDropDown organizations={data.organizations} />
        </div>
    );
};

Setup.getInitialProps = async (ctx: NextPageContext) => {
    const { token } = nextCookie(ctx);
    if (!token) {
        Redirect(ctx, "/token");
        return { token: "" };
    }
    return { token };
};
export default Setup;
