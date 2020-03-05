/* eslint-disable @typescript-eslint/ban-ts-ignore */
import React, { useEffect, useRef } from "react";
import { NextPage, NextPageContext } from "next";
import { Redirect } from "../../lib/utils/redirect";
import nextCookie from "next-cookies";
import useSWR, { mutate } from "swr";
import Dropdown from "../components/Dropdown";
import { feedSettings } from "../../lib/utils/store";
import Router from "next/router";
import { Organization } from "abstract-sdk";
import useFetch from "../../lib/utils/useFetch";
import Trigger from "rc-trigger";
import Button from "../components/Button";
import Flex from "../components/Flex";
import styled from "styled-components";

const Setup: NextPage<{ token: string }> = ({ token }) => {
    const { data: settings } = useSWR("store", { initialData: feedSettings });
    const { section, organization } = settings;

    const fetcher = useFetch(token);

    const { data: orgs } = useSWR<Organization[]>(["api/listOrganizations"], fetcher);

    const { data: sections } = useSWR(
        organization.id ? ["api/listSections", organization.id] : null,
        (url, organizationId) => fetcher(url, { organizationId })
    );

    useEffect(() => {
        if (orgs?.length)
            mutate("store", { ...settings, organization: { id: orgs[0].id, name: orgs[0].name } });
    }, [orgs]);

    useEffect(() => {
        if (sections?.length) {
            mutate("store", {
                ...settings,
                section: { id: sections[0].id, name: sections[0].name }
            });
        }
    }, [sections]);

    const changeHandler = ({ type, id, name }) => {
        mutate("store", { ...settings, [type]: { id, name } });
    };

    const clickHandler = () => {
        Router.push(`/index?sectionId=${section.id}&organizationId=${organization.id}`, "/");
    };

    if (!orgs) return null;

    const orgInput = useRef<HTMLInputElement>();

    const OrgsDropdown = () => {
        return (
            <StyledDropdown>
                {orgs.map(x => (
                    <li
                        onClick={() =>
                            changeHandler({ type: "organization", id: x.id, name: x.name })
                        }
                        key={x.id}
                    >
                        {x.name}
                    </li>
                ))}
            </StyledDropdown>
        );
    };

    const SectionsDropdown = () => {
        return (
            <StyledDropdown>
                {sections.map(x => (
                    <li
                        onClick={() => changeHandler({ type: "section", id: x.id, name: x.name })}
                        key={x.id}
                    >
                        {x.name}
                    </li>
                ))}
            </StyledDropdown>
        );
    };

    return (
        <StyledPage justify="center">
            <Trigger
                action={["click"]}
                popup={<OrgsDropdown />}
                mask={false}
                destroyPopupOnHide
                popupAlign={{
                    points: ["t", "b"]
                }}
            >
                <input onChange={e => console.log(e)} value={organization.name} />
            </Trigger>

            <Trigger
                action={["click"]}
                popup={<SectionsDropdown />}
                mask={false}
                destroyPopupOnHide
                popupAlign={{
                    points: ["t", "b"]
                }}
            >
                <input onChange={e => console.log(e)} value={section.name} />
            </Trigger>

            {/* <Dropdown type="section" changeHandler={changeHandler} data={sections} /> */}
            <Button onClick={clickHandler}>Go to App</Button>
        </StyledPage>
    );
};

Setup.getInitialProps = async (ctx: NextPageContext) => {
    const { token } = nextCookie(ctx);
    if (!token) Redirect(ctx, "/token");
    return { token };
};

const Styledinput = styled.div``;

const StyledPage = styled(Flex)``;

const StyledDropdown = styled.ul`
    width: 144px;
    box-shadow: rgba(0, 0, 0, 0.0470588) 0px 0px 0px 1px, rgba(0, 0, 0, 0.0784314) 0px 4px 8px,
        rgba(0, 0, 0, 0.0784314) 0px 2px 4px;
    list-style: none;
    padding: 6px 0;
    margin: 0;
    border-radius: 6px;
    li {
        height: 30px;
        padding: 0 12px;
        display: flex;
        align-items: center;

        &:hover {
            background: ${props => props.theme.D20};
        }
    }
`;

export default Setup;
