import React, { useState, useEffect } from "react";
import {
    AbstractClient,
    listOrganizations,
    listProjects
} from "../utils/abstractApi";
import { NextPage } from "next";

const Index: NextPage = () => {
    const client = AbstractClient({
        token:
            "5058f075e45a73307688f62ed7a002456ce00d899301ac8fe2c48eedb3e58c97"
    });

    useEffect(() => {
        listOrganizations({ client }).then(x => {
            console.log(x);

            const orgID = x[0].id;
            listProjects({ client, organizationId: orgID }).then(y =>
                console.log(y)
            );
        });
    }, []);

    return <div>Hello World. </div>;
};

export default Index;
