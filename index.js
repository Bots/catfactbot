const tmi = require("tmi.js");
const dotenv = require("dotenv");
const fetch = require("node-fetch");
import OpenAI from "openai";

dotenv.config();

const {
  WATCHED_CHANNEL,
  BOT_USERNAME,
  BOT_USER_ACCESS_TOKEN,
  API_NINJAS_API_KEY,
  OPENAI_API_KEY,
} = process.env;

if (!WATCHED_CHANNEL) throw new Error("WATCHED_CHANNEL required");
if (!BOT_USERNAME) throw new Error("BOT_USERNAME required");
if (!BOT_USER_ACCESS_TOKEN) throw new Error("BOT_USER_ACCESS_TOKEN required");
if (!API_NINJAS_API_KEY) throw new Error("API_NINJAS_API_KEY required");
if (!OPENAI_API_KEY) throw new Error("OPENAI_API_KEY required");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // This is also the default, can be omitted
});

const client = new tmi.client({
  channels: [WATCHED_CHANNEL],
  identity: {
    username: BOT_USERNAME,
    password: `oauth:${BOT_USER_ACCESS_TOKEN}`,
  },
});

client.connect();

client.on("message", async (channel, tags, message, isSelf) => {
  console.log("Server started...");

  if (isSelf) return;

  try {
    if (message === "!cat") {
      fetch("https://catfact.ninja/fact")
        .then((response) => response.json())
        .then((data) => client.say(channel, `${data.fact}`));
    }

    if (message === "!stored") {
      // Existing code for !stored command...
    }

    if (message === "!joke") {
      fetch("https://api.api-ninjas.com/v1/jokes", {
        headers: {
          "X-Api-Key": API_NINJAS_API_KEY,
        },
      })
        .then((response) => response.json())
        .then((data) => client.say(channel, `${data[0].joke}`));
    }

    if (message.startsWith("!poem")) {
      const prompt = message.replace("!poem", "").trim() || "a general topic";

      const openaiResponse = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "You are a creative poet that writes short poems.",
          },
          {
            role: "user",
            content: `Write a short poem about ${prompt}.`,
          },
        ],
        max_tokens: 100,
      });

      let poem = openaiResponse.data.choices[0].message.content;

      // Ensure the poem does not exceed Twitch's message length limit
      const maxLength = 500;
      if (poem.length > maxLength) {
        poem = poem.substring(0, maxLength - 3) + "...";
      }

      client.say(channel, poem);
    }
  } catch (error) {
    console.error(error);
  }
});
