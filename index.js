const tmi = require("tmi.js");
const Express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const { WATCHED_CHANNEL, BOT_USERNAME, BOT_USER_ACCESS_TOKEN } = process.env;

if (!WATCHED_CHANNEL) throw new Error("WATCHED_CHANNEL required");
if (!BOT_USERNAME) throw new Error("BOT_USERNAME required");
if (!BOT_USER_ACCESS_TOKEN) throw new Error("BOT_USER_ACCESS_TOKEN required");

const port = process.env.PORT || 4141;

const app = Express();

app.get("/", (req, res) => {
  res.json({ status: "ok" });
});
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});

const client = new tmi.client({
  channels: [WATCHED_CHANNEL],
  identity: {
    username: BOT_USERNAME,
    password: `oauth:${BOT_USER_ACCESS_TOKEN}`,
  },
});

client.connect();

client.on("message", (channel, tags, message, isSelf) => {
  // Logic
  const senderUser = tags["display-name"];

  if (!isSelf && message === "!cat") {
    fetch("https://catfact.ninja/fact")
      .then((response) => response.json())
      .then((data) => client.say(channel, `${data.fact}`));
  }
});
