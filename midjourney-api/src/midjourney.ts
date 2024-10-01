import { Midjourney } from "midjourney";

const client = new Midjourney({
    ServerId: <string>process.env.SERVER_ID,
    ChannelId: <string>process.env.CHANNEL_ID,
    SalaiToken: <string>process.env.SALAI_TOKEN,
    Debug: true,
    Ws: true, //enable ws is required for remix mode (and custom zoom)
});

export default async function getClient() {
    await client.init();
    return client;
}
