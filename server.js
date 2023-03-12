const next = require("next");
const express = require("express");
const { Client, GatewayIntentBits } = require("discord.js");
const { Configuration, OpenAIApi } = require("openai");

const dev = process.env.NODE_ENV !== "production";
const port = process.env.PORT || 3000;

const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.get("*", (req, res) => {
    return handle(req, res);
  });

  server.post("*", (req, res) => {
    return handle(req, res);
  });

  const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
    ],
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log("runn ,,,,");

    const openai = new OpenAIApi(
      new Configuration({
        apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
      })
    );

    client.on("messageCreate", async function (message) {
      if (message.author.bot) return;

      try {
        const response = await openai.createChatCompletion({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: "You are a helpful assistant who responds succinctly",
            },
            { role: "user", content: message.content },
          ],
        });

        const content = response.data.choices[0].message;
        return message.reply(content);
      } catch (err) {
        return message.reply(`As an AI robot, I errored out.`);
      }
    });

    client.login(process.env.NEXT_PUBLIC_BOT_TOKEN);
    console.log(`🚀 Ready on http://localhost:${port}`);
  });
});
