const tmi = require("tmi.js");
const dotenv = require("dotenv");

dotenv.config();

const { WATCHED_CHANNEL, BOT_USERNAME, BOT_USER_ACCESS_TOKEN } = process.env;

if (!WATCHED_CHANNEL) throw new Error("WATCHED_CHANNEL required");
if (!BOT_USERNAME) throw new Error("BOT_USERNAME required");
if (!BOT_USER_ACCESS_TOKEN) throw new Error("BOT_USER_ACCESS_TOKEN required");

const client = new tmi.client({
  channels: [WATCHED_CHANNEL],
  identity: {
    username: BOT_USERNAME,
    password: `oauth:${BOT_USER_ACCESS_TOKEN}`,
  },
});

// const substances = [
//   { substance: "Beer", plural: false },
//   { substance: "Pee", plural: false },
//   { substance: "Bubblegum", plural: false },
//   { substance: "Poop", plural: false },
//   { substance: "Shit", plural: false },
//   { substance: "Peepee", plural: false },
//   { substance: "Weed", plural: false },
//   { substance: "Blood", plural: false },
//   { substance: "Liquor", plural: false },
//   { substance: "Dirt", plural: false },
//   { substance: "Redbulls", plural: true },
//   { substance: "Giggle gas", plural: false },
//   { substance: "Laughter lotion", plural: false },
//   { substance: "Chuckle chocolate", plural: false },
//   { substance: "Snicker syrup", plural: false },
//   { substance: "Jolly jelly", plural: false },
//   { substance: "Mirth mist", plural: false },
//   { substance: "Giggle glue", plural: false },
//   { substance: "Smirk sprinkles", plural: true },
//   { substance: "Titty tonic", plural: false },
//   { substance: "Joy juice", plural: false },
//   { substance: "Belly bubbles", plural: true },
//   { substance: "Cackle cream", plural: false },
//   { substance: "Whipped cream", plural: false },
//   { substance: "Skittles", plural: true },
//   { substance: "Farts", plural: true },
//   { substance: "Sneezes", plural: true },
//   { substance: "Coughs", plural: true },
// ]

// const bodypart = [
//   "peepee",
//   "peen",
//   "weiner",
//   "weenie",
//   "peenie",
//   "winkey",
//   "giney",
//   "jay-jay",
//   "penis",
//   "balls",
//   "ballsack",
//   "nuts",
//   "nutsack",
//   "butthole",
//   "vagina",
//   "booba",
//   "boobs",
//   "tiddies",
//   "tits",
//   "sloppers",
//   "gonads",
//   "butthole",
//   "dong",
//   "hog",
//   "earlobe",
//   "ding-a-ling",
//   "chungus",
//   "gunt",
//   "fupa",
//   "mouth",
//   "nostril",
//   "noodle",
//   "knob",
//   "twig",
//   "berries",
//   "funbags",
//   "bum",
//   "bumhole",
//   "wang",
//   "hoo-ha",
//   "ta-tas",
//   "hooters",
//   "jugs",
//   "cheeks",
// ]

client.connect();

client.on("message", (channel, tags, message, isSelf) => {
  if (!isSelf && message === "!cat") {
    fetch("https://catfact.ninja/fact")
      .then((response) => response.json())
      .then((data) => client.say(channel, `${data.fact}`));
  }

  // if (!isSelf && message === "!stored") {
  //   const randomSubstanceIndex = Math.floor(Math.random() * substances.length)
  //   const randomBodypartIndex = Math.floor(Math.random() * bodypart.length)

  //   client.say(
  //     channel,
  //     `${substances[randomSubstanceIndex].substance} ${substances[randomSubstanceIndex].plural ? "are" : "is"} stored in the ${bodypart[randomBodypartIndex]}.`)
  // }
});
