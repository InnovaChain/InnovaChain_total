import { Midjourney } from "midjourney";

let midjourneyClient: Midjourney | null = null;

const client = new Midjourney({
    ServerId: <string>process.env.SERVER_ID,
    ChannelId: <string>process.env.CHANNEL_ID,
    SalaiToken: <string>process.env.SALAI_TOKEN,
    Debug: true,
    Ws: true, //enable ws is required for remix mode (and custom zoom)
});

export async function getClient() {
    if (!midjourneyClient) {
        await client.init();
        midjourneyClient = client;
    }
    return midjourneyClient;
}

export async function resetClient() {
    async function reset() {
        await client.Connect();
        await client.Reset();
        client.Close();
    }

    await reset();

    midjourneyClient = null;

    return;
}
