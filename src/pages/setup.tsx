/* eslint-disable @typescript-eslint/ban-ts-ignore */
import React, { useEffect } from "react";
import { NextPage, NextPageContext } from "next";
import { Redirect } from "../../lib/utils/redirect";
import nextCookie from "next-cookies";
import useSWR, { mutate } from "swr";
import { feedSettings } from "../../lib/store";
import Router from "next/router";
import { Organization } from "abstract-sdk";
import useFetch from "../../lib/utils/useFetch";
import Button from "../components/Button";
import styled from "styled-components";
import Input from "../components/Input";
import Loader from "../components/Loader";
import { animated, useSpring } from "react-spring";

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
        const id = sections?.length ? sections[0].id : null;
        const name = sections?.length ? sections[0].name : "No sections";
        mutate("store", { ...settings, section: { id, name } });
    }, [sections]);

    const changeHandler = ({ type, id, name }) => {
        mutate("store", { ...settings, [type]: { id, name } });
    };

    const clickHandler = () => {
        Router.push(`/index?sectionId=${section.id}&organizationId=${organization.id}`, "/");
    };

    const bodyAnim = useSpring({
        from: {
            opacity: 0,
            transform: "translateX(-20px)"
        },
        to: {
            opacity: !orgs ? 0 : 1,
            transform: orgs ? "translateX(0px)" : "translateX(-20px)"
        }
    });

    if (!orgs && !sections) return <Loader centered />;

    const inputChangeHandler = ({ item, type }) => {
        changeHandler({ type: type, id: item.id, name: item.name });
    };

    return (
        <StyledPage style={bodyAnim}>
            <Title>
                <h1>Setup</h1>
                <h3>
                    Select which section from which organization you want to display projects from.
                </h3>
            </Title>

            <Body>
                <Input
                    options={orgs}
                    withArrow
                    value={organization.name}
                    onChange={item => inputChangeHandler({ item, type: "organization" })}
                />
                <Input
                    options={sections}
                    value={section.name}
                    withArrow
                    disabled={section.id ? false : true}
                    onChange={item => inputChangeHandler({ item, type: "section" })}
                />
                <Button tabIndex={0} type="button" onClick={clickHandler}>
                    Go to Feed
                </Button>
            </Body>
        </StyledPage>
    );
};

Setup.getInitialProps = async (ctx: NextPageContext) => {
    const { token } = nextCookie(ctx);
    if (!token) Redirect(ctx, "/token");
    return { token };
};

const StyledPage = styled(animated.div)`
    display: flex;
    width: 720px;
    height: 100vh;
    justify-content: center;
    flex-direction: column;
`;
const Title = styled.div`
    margin: 0 0 3em 0;
    h1 {
        font-size: 3.8em;
    }
    h3 {
        font-size: 1.6em;
        font-weight: 300;
        line-height: 1.6em;
    }
`;

const Body = styled.div`
    display: flex;
    flex-direction: row;

    & div {
        margin: 0 30px 0 0;
        flex: 5;
    }
`;

export default Setup;
