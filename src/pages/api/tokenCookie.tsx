import { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";

const isDev = process.env.NODE_ENV !== "production";

export default (req: NextApiRequest, res: NextApiResponse) => {
    const headers = req.headers.authorization;
    const token = headers?.split("bearer ")[1];

    const options = {
        path: "/",
        // expires: new Date(tokens.expiry_date),
        httpOnly: !isDev,
        secure: !isDev
    };
    res.setHeader("Set-Cookie", serialize("token", token as string, options));
    res.statusCode = 200;
    res.end();
};
