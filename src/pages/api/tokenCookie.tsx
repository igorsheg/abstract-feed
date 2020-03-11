import { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";

export default (req: NextApiRequest, res: NextApiResponse) => {
    const headers = req.headers.authorization;
    const token = headers?.split("bearer ")[1];

    const exp = new Date();
    exp.setDate(exp.getDate() + 7 * 2);

    const options = {
        path: "/",
        expires: exp,
        httpOnly: false,
        secure: false
    };
    res.setHeader("Set-Cookie", serialize("token", token as string, options));
    res.status(200).json({ ok: true });
};
