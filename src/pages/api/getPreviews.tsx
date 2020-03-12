import { AbstractClient } from "../../../lib/utils/abstractClient";
import { encode } from "base64-arraybuffer";
import { NextApiRequest, NextApiResponse } from "next";
import { feedSettings } from "../../../lib/store";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const headers = req.headers.authorization;
    const token = headers?.split("bearer ")[1];

    const { projectId, branchId, sha, collection } = JSON.parse(req.body);
    const api = AbstractClient({ token });

    const getArrayBuffer = async props => {
        const { projectId, branchId, fileId, layerId, sha } = props;
        return api.previews.raw(
            {
                projectId,
                branchId,
                fileId,
                layerId,
                sha
            },
            { disableWrite: true }
        );
    };

    const previews = Promise.all(
        collection.layers.slice(0, feedSettings.limits.previews).map(async x => {
            return {
                webUrl: encode(
                    await getArrayBuffer({
                        projectId,
                        branchId,
                        fileId: x.fileId,
                        layerId: x.layerId,
                        sha
                    })
                )
            };
        })
    );

    try {
        res.json(await previews);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};
