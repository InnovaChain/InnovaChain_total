import { Hono } from "hono";
import { cors } from "hono/cors";
import getClient from "./midjourney";
import { MJDescribe } from "midjourney";

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

        console.log(describe);

        if (!describe) {
            return c.json({ message: "No describe message" }, 500);
        }

        const firstDescription = (describe as MJDescribe).descriptions[0].slice(2);

        const updatePromptResponse = await updatePrompt(imageId, firstDescription);

        return c.json({ updatePromptResponse, describe }, 200);
    } catch {
        return c.json({ message: "Some thing went wrong" }, 400);
    }
});

export default {
    port: 8080,
    fetch: app.fetch,
};
