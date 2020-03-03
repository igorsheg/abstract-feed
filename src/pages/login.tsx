import React, { useState, useRef } from "react";
import { AbstractClient, listOrganizations } from "../utils/abstractApi";
import { NextPage } from "next";
import { Client, Organization } from "abstract-sdk";

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

const Login: NextPage = () => {
    const [orgs, setOrgs] = useState<Organization[] | null>(null);
    const tokenInput = useRef<HTMLInputElement>(null);

    const handleTokenSubmit = async () => {
        if (tokenInput.current) {
            const client: Client = AbstractClient({
                token: tokenInput.current.value
            });
            try {
                const orgs = await listOrganizations({ client });
                setOrgs(orgs);
            } catch {}
        }
    };

    return (
        <div>
            Login
            <form>
                <input
                    name="token"
                    ref={tokenInput}
                    type="text"
                    placeholder="token"
                ></input>
                <OrganizationDropDown organizations={orgs} />
                <button onClick={handleTokenSubmit} type="button">
                    Go!
                </button>
            </form>
        </div>
    );
};

export default Login;
