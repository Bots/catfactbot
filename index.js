const tmi = require("tmi.js");
const dotenv = require("dotenv");
const fetch = require("node-fetch");
const OpenAI = require("openai");

dotenv.config();

const requiredEnvVars = [
  "WATCHED_CHANNEL",
  "BOT_USERNAME",
  "BOT_USER_ACCESS_TOKEN",
  "API_NINJAS_API_KEY",
  "OPENAI_API_KEY",
];

requiredEnvVars.forEach((varName) => {
  if (!process.env[varName]) {
    console.error(`Environment variable ${varName} is required but not set.`);
    process.exit(1);
  }
});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const substances = [
  { substance: "Beer", plural: false },
  { substance: "Pee", plural: false },
  { substance: "Bubblegum", plural: false },
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
  "creamberry",
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

const client = new tmi.client({
  channels: [process.env.WATCHED_CHANNEL],
  identity: {
    username: process.env.BOT_USERNAME,
    password: `oauth:${process.env.BOT_USER_ACCESS_TOKEN}`,
  },
});

client.connect();
console.log("Server started...");

client.on("message", async (channel, tags, message, isSelf) => {
  // if (isSelf) return;

  try {
    if (message === "!cat") {
      try {
        const response = await fetch("https://catfact.ninja/fact");
        const data = await response.json();
        client.say(channel, `${data.fact}`);
      } catch (error) {
        console.error("Error fetching cat fact:", error);
        client.say(channel, "Sorry, I couldn't fetch a cat fact right now.");
      }
    }

    if (message === "!stored") {
      try {
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
      } catch (error) {
        console.error("Error fetching stored fact:", error);
        client.say(channel, "Sorry, I couldn't fetch a stored fact right now.");
      }
    }

    if (message === "!joke") {
      try {
        const response = await fetch("https://api.api-ninjas.com/v1/jokes", {
          headers: {
            "X-Api-Key": process.env.API_NINJAS_API_KEY,
          },
        });
        const data = await response.json();
        client.say(channel, `${data[0].joke}`);
      } catch (error) {
        console.error("Error fetching joke:", error);
        client.say(channel, "Sorry, I couldn't fetch a joke right now.");
      }
    }

    if (message.startsWith("!gpt")) {
      try {
        const promptMatch = message.match(/!gpt\s+"(.+?)"/);

        if (promptMatch && promptMatch[1]) {
          const prompt = promptMatch[1];

          const openaiResponse = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [
              {
                role: "system",
                content:
                  "You are a helpful assistant that answers questions to the best of your ability. You answer them concisely and in less than 300 characters. Preferably less if possible.",
              },
              {
                role: "user",
                content: `${prompt}`,
              },
            ],
            max_tokens: 200,
          });

          let answer = openaiResponse.choices[0].message.content;

          // Ensure the answer does not exceed Twitch's message length limit
          const maxLength = 500;
          if (answer.length > maxLength) {
            answer = answer.substring(0, maxLength - 3) + "...";
          }

          client.say(channel, answer);
        } else {
          client.say(channel, "Please provide a prompt in quotes after !gpt.");
        }
      } catch (error) {
        console.error("Error with GPT command:", error);
        client.say(
          channel,
          "Sorry, I couldn't process the GPT request right now."
        );
      }
    }

    if (message.startsWith("!horoscope")) {
      try {
        const args = message.split(" ");
        const zodiacSign = args[1]?.toLowerCase();

        if (zodiacSign) {
          // Call OpenAI API to generate a horoscope
          const openaiResponse = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [
              {
                role: "system",
                content:
                  "You are an amusing fake astrologer. Create a short, entertaining fake horoscope that's slightly absurd but fun. Keep it under 300 characters.",
              },
              {
                role: "user",
                content: `Generate a fake horoscope for ${zodiacSign}. Be creative and funny.`,
              },
            ],
            max_tokens: 200,
          });

          let horoscope = openaiResponse.choices[0].message.content;

          // Ensure the horoscope doesn't exceed Twitch's message length limit
          const maxLength = 500;
          if (horoscope.length > maxLength) {
            horoscope = horoscope.substring(0, maxLength - 3) + "...";
          }

          client.say(channel, `${zodiacSign.toUpperCase()} ★ ${horoscope}`);
        } else {
          client.say(
            channel,
            "Please provide a zodiac sign. Example: !horoscope aquarius"
          );
        }
      } catch (error) {
        console.error("Error with horoscope command:", error);
        client.say(
          channel,
          "Sorry, I couldn't generate a horoscope right now."
        );
      }
    }
  } catch (error) {
    console.error("Error fetching poem:", error);
    client.say(channel, "Sorry, I couldn't fetch a poem right now.");
  }
});
