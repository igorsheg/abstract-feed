import { AbstractClient } from "../../utils/abstractClient";
import { encode } from "base64-arraybuffer";
import { NextApiRequest, NextApiResponse } from "next";

export default (req: NextApiRequest, res: NextApiResponse) => {
    // const api = AbstractClient({token: })
    const { token } = JSON.parse(req.body);
    console.log(token);
    // res.setHeader("Set-Cookie", serialize("token", token as string, options));
    // res.statusCode = 200;
    res.end();
};
