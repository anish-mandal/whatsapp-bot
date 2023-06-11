import whatsappwebJS from "whatsapp-web.js";
const { Client, LocalAuth } = whatsappwebJS;
import qrcode from "qrcode-terminal";
import { terminate, alpaca } from "../utils/index.js";

const client = new Client({
  authStrategy: new LocalAuth(),
});

client
  .on("qr", (qr) => {
    console.log("QR Code received");
    qrcode.generate(qr, { small: true });
  })
  .on("ready", () => {
    console.log("Client is ready!");
  })
  .on("message", async (message) => {
    if (message.body.startsWith("!~")) {
      const question = message.body.slice(2).trim();

      const output = await alpaca(question, "");

      message.reply(output);
    }
  });

client.initialize();

terminate(client);
