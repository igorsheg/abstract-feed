/* eslint-disable @typescript-eslint/ban-ts-ignore */
import React, { useEffect } from "react";
import { NextPage, NextPageContext } from "next";
import { Redirect } from "../utils/redirect";
import nextCookie from "next-cookies";
import useSWR, { mutate } from "swr";
import Dropdown from "../components/Dropdown";
import { feedSettings } from "../utils/store";
import Router from "next/router";
import { Organization } from "abstract-sdk";
import useFetch from "../utils/useFetch";

const Setup: NextPage<{ token: string }> = ({ token }) => {
    const { data: settings } = useSWR("store", { initialData: feedSettings });
    const { sectionId, organizationId } = settings;

    const fetcher = useFetch(token);

    const { data: orgs } = useSWR<Organization[]>(["api/listOrganizations"], fetcher);

    const { data: sections } = useSWR(
        organizationId ? ["api/listSections", organizationId] : null,
        (url, organizationId) => fetcher(url, { organizationId })
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

    const clickHandler = () => {
        Router.replace(`/index?sectionId=${sectionId}&organizationId=${organizationId}`, "/");
    };

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
