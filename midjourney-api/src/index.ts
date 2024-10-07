import { Hono } from "hono";
import { cors } from "hono/cors";
import getClient, { client } from "./midjourney";
import { MJDescribe } from "midjourney";
import updatePrompt from "./sync";

const app = new Hono();

app.use("*", cors());

app.post("/imagine", async (c) => {
    try {
        const body = await c.req.json<{
            prompt: string;
        }>();

        const prompt = body.prompt;

        const client = await getClient();

        const Imagine = await client
            .Imagine(prompt, (uri: string, progress: string) => {
                console.log("loading", uri, "progress", progress);
            })
            .catch((e) => {
                return c.json({ message: e }, 500);
            });

        console.log(Imagine);

        if (!Imagine) {
            return c.json({ message: "No imagine message" }, 500);
        }

        return c.json(Imagine, 200);
    } catch {
        return c.json({ message: "Some thing went wrong" }, 400);
    }
});

app.post("/describe", async (c) => {
    try {
        const body = await c.req.json<{
            imageUrl: string;
            imageId: number;
        }>();

        const imageUrl = body.imageUrl;
        const imageId = body.imageId;

        const client = await getClient();

        const describe = await client.Describe(imageUrl).catch((e) => {
            return c.json({ message: e }, 500);
        });

        if (!describe) {
            return c.json({ message: "No describe message" }, 500);
        }

        const firstDescription = (describe as MJDescribe).descriptions[0].slice(4);

        console.log({ firstDescription });

        const updatePromptResponse = await updatePrompt(imageId, firstDescription);

        return c.json({ updatePromptResponse, describe }, 200);
    } catch {
        return c.json({ message: "Some thing went wrong" }, 400);
    }
});

app.post("/variation", async (c) => {
    try {
        const body = await c.req.json<{
            index: 1 | 2 | 3 | 4;
            msgId: string;
            hash: string;
            content?: string;
            flags: number;
        }>();

        const { index, msgId, hash, content, flags } = body;

        const client = await getClient();

        const Variation = await client.Variation({
            index: index,
            msgId: msgId,
            hash: hash,
            flags: flags,
            content: content,
            loading: (uri: string, progress: string) => {
                console.log("Variation.loading", uri, "progress", progress);
            },
        });

        if (!Variation) {
            return c.json({ message: "No variation message" }, 500);
        }

        return c.json(Variation, 200);
    } catch {
        return c.json({ message: "Some thing went wrong" }, 400);
    }
});

app.post("/upscale", async (c) => {
    try {
        const body = await c.req.json<{
            index: 1 | 2 | 3 | 4;
            msgId: string;
            hash: string;
            content?: string;
            flags: number;
        }>();

        const { index, msgId, hash, content, flags } = body;

        const client = await getClient();

        const upscale = await client
            .Upscale({
                index,
                msgId,
                hash,
                content,
                flags,
            })
            .catch((e) => {
                return c.json({ message: e }, 500);
            });

        if (!upscale) {
            return c.json({ message: "No upscale message" }, 500);
        }

        return c.json(upscale, 200);
    } catch {
        return c.json({ message: "Some thing went wrong" }, 400);
    }
});

app.post("/connect", async (c) => {
    try {
        await client.init();

        client.Connect();

        return c.json({ message: "Connected" }, 200);
    } catch {
        return c.json({ message: "Some thing went wrong" }, 400);
    }
});

app.post("/disconnect", async (c) => {
    try {
        const client = await getClient();

        client.Close();

        return c.json({ message: "Disconnected" }, 200);
    } catch {
        return c.json({ message: "Some thing went wrong" }, 400);
    }
});

export default {
    port: 8080,
    fetch: app.fetch,
};
