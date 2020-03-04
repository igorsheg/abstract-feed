import { NextApiRequest, NextApiResponse } from "next";
import { AbstractClient } from "../../utils/abstractClient";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const headers = req.headers.authorization;
    const token = headers?.split("bearer ")[1];
    const api = AbstractClient({ token });

    const { projectId } = JSON.parse(req.body);

    try {
        const data = await api.collections.list({ projectId, branchId: "master" });
        res.status(200).json(data);
    } catch (err) {
        res.status(401).end();
    }
};
