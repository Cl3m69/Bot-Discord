const Discord = require("discord.js");
require("dotenv").config();

const Config = {
    sleep: async (Mseconde) => {
        return await new Promise((r) => setTimeout(r, Mseconde));
    },

    client: new Discord.Client({
        intents: ["GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGES"],
    }),

    process: false,

    team: ["person1", "person1", "person2", "person3", "person4"],

    teamMail: [
        {
            name: "person1",
            mail: "person1@gmail.com",
        },
        {
            name: "person2",
            mail: "person2@gmail.com",
        },
        {
            name: "person3",
            mail: "person3@gmail.com",
        },
        {
            name: "person4",
            mail: "person4@gmail.com",
        },
    ],

    startBot: () => {
        Config.client.once("ready", () => {
            console.log(`logged in as ${Config.client.user.tag}`);
        });
        Config.client.login(process.env.TOKEN);
    },
};

module.exports = Config;
