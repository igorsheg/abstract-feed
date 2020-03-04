/* eslint-disable @typescript-eslint/ban-ts-ignore */
import React, { useEffect } from "react";
import { NextPage, NextPageContext } from "next";
import { Redirect } from "../utils/redirect";
import nextCookie from "next-cookies";
import { AbstractClient } from "../utils/abstractApi";
import useSWR, { mutate } from "swr";
import Dropdown from "../components/Project/Dropdown";
import { feedSettings } from "../utils/store";

const Setup: NextPage<{ token: string }> = ({ token }) => {
    const api = AbstractClient({ token });

    const { data: settings } = useSWR("store", { initialData: feedSettings });
    const { sectionId, organizationId } = settings;

    const { data: orgs } = useSWR("orgs", () => api.organizations.list());

    const { data: sections } = useSWR(
        organizationId ? ["sections", organizationId] : null,
        //@ts-ignore
        () => api.sections.list({ organizationId }),
        { shouldRetryOnError: false }
    );

    const { data: projects } = useSWR(sectionId ? ["projects", sectionId] : null, () =>
        api.projects.list({ organizationId }, { filter: "active", sectionId })
    );

    useEffect(() => {
        if (orgs?.length) mutate("store", { ...settings, organizationId: orgs[0].id });
    }, [orgs]);

    useEffect(() => {
        mutate("store", { ...settings, sectionId: sections?.length ? sections[0].id : null });
    }, [sections]);

    const changeHandler = ({ type, id }) => {
        mutate("store", { ...settings, [type]: id });
    };

    useEffect(() => {
        console.log("organizationId", organizationId, projects);
    }, [organizationId, projects]);

    const clickHandler = () => {};

    if (!orgs) return null;
    return (
        <div>
            Setup.
            <Dropdown type="organizationId" changeHandler={changeHandler} data={orgs} />
            <Dropdown type="sectionId" changeHandler={changeHandler} data={sections} />
            <button onClick={clickHandler}>Go to App</button>
        </div>
    );
};

Setup.getInitialProps = async (ctx: NextPageContext) => {
    const { token } = nextCookie(ctx);
    if (!token) Redirect(ctx, "/token");
    return { token };
};

export default Setup;
