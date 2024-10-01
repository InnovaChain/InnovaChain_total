import { Hono } from "hono";
import getClient from "./midjourney";

const app = new Hono();

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
        }>();

        const imageUrl = body.imageUrl;

        const client = await getClient();

        const Describe = await client.Describe(imageUrl).catch((e) => {
            return c.json({ message: e }, 500);
        });

        console.log(Describe);

        if (!Describe) {
            return c.json({ message: "No describe message" }, 500);
        }

        return c.json(Describe, 200);
    } catch {
        return c.json({ message: "Some thing went wrong" }, 400);
    }
});

export default app;
