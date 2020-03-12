import { NextApiRequest, NextApiResponse } from "next";
import { AbstractClient } from "../../../lib/utils/abstractClient";
import { feedSettings } from "../../../lib/store";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const headers = req.headers.authorization;
    const token = headers?.split("bearer ")[1];
    const api = AbstractClient({ token });

    const { projectId } = JSON.parse(req.body);

    try {
        const data = await api.collections.list({ projectId, branchId: "master" });
        const limitedData = data.collections.slice(0, feedSettings.limits.collections);

        res.status(200).json(limitedData);
    } catch (err) {
        res.status(401).end();
    }
};
