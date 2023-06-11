import { Client } from "whatsapp-web.js";

export default function terminate(client: Client) {
  process.on("SIGINT", async () => {
    console.log("(SIGINT) Shutting down...");
    await client.destroy();
    process.exit(0);
  });
}
