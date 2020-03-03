/* eslint-disable @typescript-eslint/ban-ts-ignore */
import React, { useState, useEffect } from "react";
import { NextPage, NextPageContext } from "next";
import { Redirect } from "../utils/redirect";
import nextCookie from "next-cookies";
import { AbstractClient } from "../utils/abstractApi";
import { Organization, Section } from "abstract-sdk";
import useSWR from "swr";

const Dropdown = ({ data, changeHandler, type }: DropdownProps) => {
    if (data)
        return (
            <select
                onChange={e =>
                    changeHandler({
                        type,
                        id: e.target.value
                    })
                }
            >
                {data.map(item => (
                    <option value={item.id} key={item.id}>
                        {item.name}
                    </option>
                ))}
            </select>
        );
    return null;
};

const Setup: NextPage<{ token: string }> = ({ token }) => {
    const api = AbstractClient({ token });

    const [feedSettings, setFeedSettings] = useState({
        sectionId: null,
        organizationId: null
    });

    const { sectionId, organizationId } = feedSettings;

    const { data: orgs } = useSWR("orgs", () => api.organizations.list());

    const { data: sections } = useSWR(
        organizationId ? ["sections", organizationId] : null,
        //@ts-ignore
        () => api.sections.list({ organizationId })
    );

    useEffect(() => {
        if (orgs) {
            setFeedSettings({
                ...feedSettings,
                organizationId: orgs[0].id
            });
        }
    }, [orgs]);

    const changeHandler = ({ type, id }) => {
        setFeedSettings({ ...feedSettings, [type]: id });
    };

    return (
        <div>
            Setup.
            <Dropdown type="organizationId" changeHandler={changeHandler} data={orgs} />
            {sections ? (
                <Dropdown type="sectionId" changeHandler={changeHandler} data={sections} />
            ) : (
                <p>no items</p>
            )}
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

type DropdownProps = {
    data: Organization[] | Section[] | null;
    type: string;
    changeHandler: ({ type, id }: { type: string; id: string }) => void;
};

export default Setup;
