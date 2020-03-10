import { NextApiRequest, NextApiResponse } from "next";
import { AbstractClient } from "../../../lib/utils/abstractClient";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const headers = req.headers.authorization;
    const token = headers?.split("bearer ")[1];
    const api = AbstractClient({ token });

    const { organizationId, sectionId } = JSON.parse(req.body);

    try {
        const data = await api.projects.list({ organizationId }, { filter: "active", sectionId });

        const lastUpdated = data.sort(function(a, b) {
            const dateA = +new Date(a.updatedAt),
                dateB = +new Date(b.updatedAt);
            return dateA - dateB;
        });
        res.status(200).json(lastUpdated.reverse());
    } catch (err) {
        res.status(401).end();
    }
};
