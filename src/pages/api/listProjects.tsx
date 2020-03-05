import { NextApiRequest, NextApiResponse } from "next";
import { AbstractClient } from "../../../lib/utils/abstractClient";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const headers = req.headers.authorization;
    const token = headers?.split("bearer ")[1];
    const api = AbstractClient({ token });

    const { organizationId, sectionId } = JSON.parse(req.body);

    try {
        const data = await api.projects.list({ organizationId }, { filter: "active", sectionId });
        res.status(200).json(data);
    } catch (err) {
        res.status(401).end();
    }
};
