const port = parseInt(process.env.PORT || "3000", 10);
const dev = process.env.NODE_ENV !== "production";
const moduleAlias = require("module-alias");

moduleAlias.addAliases({
    react: "preact/compat",
    "react-dom": "preact/compat"
});

const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");

const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    createServer((req: Request, res: Response) => {
        const parsedUrl = parse(req.url, true);
        handle(req, res, parsedUrl);
    }).listen(port, (err: Error) => {
        if (err) throw err;
        console.log(`> Ready on http://localhost:${port}`);
    });
});

export {};
