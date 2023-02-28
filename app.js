const { EmbedBuilder } = require("discord.js");
const Config = require("./Config");
const messageHandler = require("./bot-mail/messageHandler");

var client = Config.client;

Config.startBot();

client.on("messageCreate", async (msg) => {
    if (msg.author.bot) return;
    if (msg.mentions.has(client.user)) {
        return msg.reply("Thanks for mentioning me! So, write `!sendmail`. See you later !");
    }
    if (msg.content[0] != "!") return;

    const args = msg.content.slice("!".length).trim().split(" ");
    const command = args.shift().toLowerCase();

    console.log(args);
    console.log(command);

    if (command === "sendmail" && Config.process == false) {
        messageHandler.sendMail(msg, args);
    }
});
