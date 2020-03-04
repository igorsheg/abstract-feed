import { AbstractClient } from "../../utils/abstractClient";
import { encode } from "base64-arraybuffer";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const headers = req.headers.authorization;
    const token = headers?.split("bearer ")[1];

    const { projectId, branchId, fileId, layerId, sha } = JSON.parse(req.body);

    const api = AbstractClient({ token });

    const arrayBuffer = api.previews.raw(
        {
            projectId,
            branchId,
            fileId,
            layerId,
            sha
        },
        { disableWrite: true }
    );

    try {
        res.json({ webUrl: encode(await arrayBuffer) });
    } catch {
        res.status(500);
        res.end();
    }
};
