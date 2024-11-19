const tmi = require("tmi.js");
const dotenv = require("dotenv");
const { Configuration, OpenAIApi } = require("openai");

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

const client = new tmi.client({
  channels: [WATCHED_CHANNEL],
  identity: {
    username: BOT_USERNAME,
    password: `oauth:${BOT_USER_ACCESS_TOKEN}`,
  },
});

const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const substances = [
  { substance: "Beer", plural: false },
  { substance: "Pee", plural: false },
  { substance: "Bubblegum", plural: false },
  { substance: "Poop", plural: false },
  { substance: "Shit", plural: false },
  { substance: "Peepee", plural: false },
  { substance: "Weed", plural: false },
  { substance: "Blood", plural: false },
  { substance: "Liquor", plural: false },
  { substance: "Dirt", plural: false },
  { substance: "Redbulls", plural: true },
  { substance: "Giggle gas", plural: false },
  { substance: "Laughter lotion", plural: false },
  { substance: "Chuckle chocolate", plural: false },
  { substance: "Snicker syrup", plural: false },
  { substance: "Jolly jelly", plural: false },
  { substance: "Mirth mist", plural: false },
  { substance: "Giggle glue", plural: false },
  { substance: "Smirk sprinkles", plural: true },
  { substance: "Titty tonic", plural: false },
  { substance: "Joy juice", plural: false },
  { substance: "Belly bubbles", plural: true },
  { substance: "Cackle cream", plural: false },
  { substance: "Whipped cream", plural: false },
  { substance: "Skittles", plural: true },
  { substance: "Farts", plural: true },
  { substance: "Sneezes", plural: true },
  { substance: "Coughs", plural: true },
  { substance: "Maple syrup", plural: false },
  { substance: "Hummus", plural: false },
  { substance: "Texas tea", plural: false },
  { substance: "Urine", plural: false },
  { substance: "Feces", plural: false },
  { substance: "Farts", plural: true },
  { substance: "Bungjuice", plural: false },
  { substance: "Milk", plural: false },
  { substance: "Boogers", plural: true },
  { substance: "Drool", plural: false },
  { substance: "Slobber", plural: false },
  { substance: "Foot fungus", plural: false },
];

const bodypart = [
  "peepee",
  "peen",
  "weiner",
  "weenie",
  "peenie",
  "winkey",
  "giney",
  "jay-jay",
  "penis",
  "balls",
  "ballsack",
  "nuts",
  "nutsack",
  "butthole",
  "vagina",
  "booba",
  "boobs",
  "tiddies",
  "tits",
  "sloppers",
  "gonads",
  "butthole",
  "dong",
  "hog",
  "earlobe",
  "ding-a-ling",
  "chungus",
  "gunt",
  "fupa",
  "mouth",
  "nostril",
  "noodle",
  "knob",
  "twig",
  "berries",
  "funbags",
  "bum",
  "bumhole",
  "wang",
  "hoo-ha",
  "ta-tas",
  "hooters",
  "jugs",
  "cheeks",
  "schneeps",
  "glumps",
  "groopus",
  "gloopus",
  "schvance",
  "grumbus",
  "snapper",
  "chonch",
  "glumbus",
  "snooper",
  "head",
  "glambus",
  "gleeb",
  "bleeb",
  "muffin",
  "elbow",
  "knee",
  "ankle",
  "shoulder",
  "wrist",
  "forehead",
  "chin",
  "toes",
  "belly button",
  "thighs",
  "back",
  "neck",
  "hip",
  "palm",
  "finger",
  "starfruit",
  "noobular",
  "funny bone",
  "silly willy",
  "silly goose",
  "funny bone",
  "wiggly worm",
  "jigglypuff",
  "snickerdoodle",
  "wobble wobble",
  "sneeze factory",
  "giggle gland",
  "chuckle muscle",
  "snort button",
  "tootie patootie",
  "booger buster",
  "fluffy muffin",
  "squishy squash",
  "wobble wobbler",
  "giggly bits",
  "silly willy",
  "jelly belly",
  "bouncy castle",
  "fuzzy wuzzy",
  "squirmy worm",
  "doodle dandy",
  "wacky whacker",
  "silly sausage",
  "giggly goo",
  "snicker snout",
  "chuckle cheeks",
  "wobble wobbles",
  "silly string bean",
  "jumpy jiggler",
];

client.connect();

client.on("message", async (channel, tags, message, isSelf) => {
  console.log("Server started...");

  try {
    if (!isSelf && message === "!cat") {
      fetch("https://catfact.ninja/fact")
        .then((response) => response.json())
        .then((data) => client.say(channel, `${data.fact}`));
    }

    if (!isSelf && message === "!stored") {
      const randomSubstanceIndex = Math.floor(
        Math.random() * substances.length
      );
      const randomBodypartIndex = Math.floor(Math.random() * bodypart.length);

      client.say(
        channel,
        `${substances[randomSubstanceIndex].substance} ${
          substances[randomSubstanceIndex].plural ? "are" : "is"
        } stored in the ${bodypart[randomBodypartIndex]}.`
      );
    }

    if (!isSelf && message === "!joke") {
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

      const openaiResponse = await openai.createChatCompletion({
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
