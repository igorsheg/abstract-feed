import { NextApiRequest, NextApiResponse } from "next";
import { AbstractClient } from "../../../lib/utils/abstractClient";
import { feedSettings } from "../../../lib/store";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const headers = req.headers.authorization;
    const token = headers?.split("bearer ")[1];
    const api = AbstractClient({ token });

    const { organizationId, sectionId } = JSON.parse(req.body);

    try {
        const data = await api.projects.list({ organizationId }, { filter: "active", sectionId });

        const lastUpdated = data
            .sort(function(a, b) {
                const dateA = +new Date(a.updatedAt),
                    dateB = +new Date(b.updatedAt);
                return dateA - dateB;
            })
            .reverse()
            .slice(0, feedSettings.limits.projects);

        res.status(200).json(lastUpdated);
    } catch (err) {
        res.status(401).end();
    }
};
