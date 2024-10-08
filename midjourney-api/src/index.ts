import { Hono } from "hono";
import { cors } from "hono/cors";
import { getClient, resetClient } from "./midjourney";
import { MJDescribe } from "midjourney";
import updatePrompt from "./sync";
import axios from "axios";

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

app.post("/reroll", async (c) => {
    try {
        const body = await c.req.json<{
            msgId: string;
            hash: string;
            content?: string;
            flags: number;
        }>();

        const { msgId, hash, content, flags } = body;

        const client = await getClient();

        const reroll = await client
            .Reroll({
                msgId,
                hash,
                content,
                flags,
            })
            .catch((e) => {
                return c.json({ message: e }, 500);
            });

        if (!reroll) {
            return c.json({ message: "No reroll message" }, 500);
        }

        return c.json(reroll, 200);
    } catch {
        return c.json({ message: "Some thing went wrong" }, 400);
    }
});

app.post("/reset", async (c) => {
    try {
        await resetClient();
        return c.json({ message: "Reset successful" }, 200);
    } catch {
        return c.json({ message: "Some thing went wrong" }, 400);
    }
});

app.get('/proxy-fetch', async (c) => {
    const imageUrl = c.req.query('url');
  
    if (!imageUrl) {
      return c.json({ error: 'Image URL is required' }, 400);
    }
  
    try {
      // Fetch the image from the URL
      const response = await fetch(imageUrl);
  
      // Check if the request was successful
      if (!response.ok) {
        return c.json({ error: 'Failed to fetch image' }, 500);
      }
  
      // Get the image buffer and its content type
      const contentType = response.headers.get('content-type') || 'application/octet-stream';
      const imageBuffer = await response.arrayBuffer();
  
      // Return the image as a response
      return new Response(imageBuffer, {
        headers: {
          'Content-Type': contentType,
          'Cache-Control': 'no-store',  // Optional: control caching
        },
      });
    } catch (error) {
      return c.json({ error: 'Error fetching image' }, 500);
    }
  });

export default {
    port: 8080,
    fetch: app.fetch,
};
