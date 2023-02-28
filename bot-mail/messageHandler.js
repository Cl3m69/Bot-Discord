const Discord = require("discord.js");
const { MessageAttachment, MessageEmbed } = require("discord.js");
const Config = require("../Config");
const nodemailer = require("nodemailer");

const messageHandler = {
    sleep: async (Mseconde) => {
        return await new Promise((r) => setTimeout(r, Mseconde));
    },

    writeEmbedMessage: () => {
        const file = new MessageAttachment("./memojiME.png");
        const exampleEmbed = new MessageEmbed()
            .setColor(0x0099ff)
            .setTitle("Envoyer un mail au serveur")
            .setAuthor({
                name: "Le BOT de GUICHARD",
                iconURL: "attachment://memojiME.png",
            })
            .setDescription(
                "- L'utilisation de ce bot permetras d'envoyer un mail à n'importe quel membre du serveur.\n\n- Vous avez la possibilité de le programmer en suivant les instructions."
            )
            .setThumbnail("attachment://memojiME.png")
            .addFields(
                {
                    name: "Les personnes selectionnée =>",
                    value: "`person1`, `person2`, `person3`, `person4`",
                },
                {
                    name: "Pour déselectionner une personne utilisé la commande =>",
                    value: "`!removePerson [NAME]`\nExemple: / `!removePerson person1`",
                },
                { name: "\u200B", value: "\u200B" },
                { name: "Inline field title", value: "Some value here", inline: true },
                { name: "Inline field title", value: "Some value here", inline: true }
            )
            .addFields({
                name: "Inline field title",
                value: "Some value here",
                inline: true,
            })
            .setTimestamp()
            .setFooter({
                text: "Le BOT de GUICHARD",
                iconURL: "attachment://memojiME.png",
            });

        return { embeds: [exampleEmbed], files: [file] };
    },

    step4SendMail: async (msg, person, object, text) => {
        console.log("step 4 !!");
        let mailTransporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "bot@gmail.com",
                pass: "password",
            },
        });

        let details = {
            from: "bot@gmail.com",
            to: "person1@gmail.com",
            subject: object,
            text: text,
        };

        mailTransporter.sendMail(details, (err) => {
            if (err) {
                console.log("error", err);
            } else console.log("email has sent ");
        });

        var cont = false;
        const file = new MessageAttachment("./memojiME.png");
        const exampleEmbed = new MessageEmbed()
            .setColor(0x0099ff)
            .setTitle("Send a mail to the server")
            .setAuthor({
                name: "Etape 4/4",
                iconURL: "attachment://memojiME.png",
            })

            .setThumbnail("attachment://memojiME.png")
            .addFields(
                { name: "\u200B", value: "\u200B" },
                {
                    name: "Les personnes selectionnée =>",
                    value: `\`${person}\``,
                },
                {
                    name: "Object du mail =>",
                    value: `\`${object}\``,
                },
                {
                    name: "Le corps du mail =>",
                    value: `\`${text}\``,
                },
                {
                    name: "Si tout est bon utilisé la commande =>",
                    value: "`ENVOYER`",
                },
                {
                    name: "Si vous voulez annuler utilisé la commande =>",
                    value: "`STOP`",
                },
                { name: "\u200B", value: "\u200B" }
            )
            .setTimestamp()
            .setFooter({
                text: "Le BOT de GUICHARD",
                iconURL: "attachment://memojiME.png",
            });
        msg.channel.send({ embeds: [exampleEmbed], files: [file] });
    },

    step3WhatMail: async (msg, person) => {
        var cont = false;
        const file = new MessageAttachment("./memojiME.png");
        const exampleEmbed = new MessageEmbed()
            .setColor(0x0099ff)
            .setTitle("Send a mail to the server")
            .setAuthor({
                name: "Etape 3/4",
                iconURL: "attachment://memojiME.png",
            })

            .setThumbnail("attachment://memojiME.png")
            .addFields(
                { name: "\u200B", value: "\u200B" },
                {
                    name: "Les personnes selectionnée =>",
                    value: `\`${person}\``,
                },
                {
                    name: "Pour ajouter un objet au mail =>",
                    value: '`object "..."`\nExemple: `object "[TEST] Réunion vendredi 15 septembre 10h00"`',
                },
                {
                    name: "Pour ajouter le corps du mail => ",
                    value: '`text "..."`\nExemple: `text "Réunion le vendredi 15 septembre à 10h00. Au programme ...."`',
                },
                {
                    name: "Si tout est bon utilisé la commande =>",
                    value: "`OK`",
                },
                {
                    name: "Si vous voulez annuler utilisé la commande =>",
                    value: "`STOP`",
                },
                { name: "\u200B", value: "\u200B" }
            )
            .setTimestamp()
            .setFooter({
                text: "Le BOT de GUICHARD",
                iconURL: "attachment://memojiME.png",
            });
        msg.channel.send({ embeds: [exampleEmbed], files: [file] });

        var text = "";
        var object = "";
        while (1) {
            let collected = await msg.channel.awaitMessages({
                filter: (m) => m.author.id === msg.author.id,
                max: 1,
                time: 30000,
            });

            const args = collected?.first()?.content?.trim()?.split(" ");
            const command = args?.shift()?.toLowerCase();

            console.log(args);
            console.log(command);

            console.log(command == "object");

            if (command == "object") {
                if (
                    args.length < 1 ||
                    args[0][0] != '"' ||
                    args[args.length - 1][args[args.length - 1].length - 1] != '"'
                )
                    msg.reply(
                        'Please write only one argument for object someone.\nExemple: `object "[TEST] Réunion vendredi 15 septembre 10h00"`'
                    );
                else {
                    object = "";
                    for (var i = 0; i < args.length; i++) {
                        object += args[i];
                        object += " ";
                    }
                    object = object.substring(1);
                    object = object.substring(0, object.length - 1);
                    msg.reply(object);
                }
            } else if (command == "text") {
                if (
                    args.length < 1 ||
                    args[0][0] != '"' ||
                    args[args.length - 1][args[args.length - 1].length - 1] != '"'
                )
                    msg.reply(
                        'Please write an argument for add someone.\nExemple: `text "Réunion le vendredi 15 septembre à 10h00. Au programme ...."`'
                    );
                else {
                    text = "";
                    for (var i = 0; i < args.length; i++) {
                        text += args[i];
                        text += " ";
                    }
                    text = text.substring(1);
                    text = text.substring(0, text.length - 1);
                    msg.reply(object);
                }
            } else if (command == "stop") {
                msg.reply(`OK, i stoped the process. See you later !`);
                Config.process = false;
                break;
            } else if (command == "ok") {
                console.log("je vais envoyer un mail");
                messageHandler.step4SendMail(msg, person, object, text);
            } else if (command == undefined) {
                msg.reply(`OK, i stoped the process. See you later !`);
                Config.process = false;
                break;
            } else {
                msg.reply(`I don't understand your command -> \`${command}\``);
            }
            console.log(person);
        }
    },

    sendNow: async (msg) => {
        var cont = false;
        const file = new MessageAttachment("./memojiME.png");
        const exampleEmbed = new MessageEmbed()
            .setColor(0x0099ff)
            .setTitle("Send a mail to the server")
            .setAuthor({
                name: "Etape 2/4",
                iconURL: "attachment://memojiME.png",
            })

            .setThumbnail("attachment://memojiME.png")
            .addFields(
                { name: "\u200B", value: "\u200B" },
                {
                    name: "Les personnes selectionnée =>",
                    value: "`person1`, `person2`, `person3`, `person4`",
                },
                {
                    name: "Pour déselectionner une personne utilisé la commande =>",
                    value: "`remove [NAME] [...]`\nExemple: / `remove person1 ...`",
                },
                {
                    name: "Pour ajouter une personne utilisé la commande =>",
                    value: "`add [NAME] [...]`\nExemple: / `add person1 ...`",
                },
                {
                    name: "Si tout est bon utilisé la commande =>",
                    value: "`OK`",
                },
                {
                    name: "Si vous voulez annuler utilisé la commande =>",
                    value: "`STOP`",
                },
                { name: "\u200B", value: "\u200B" }
            )
            .setTimestamp()
            .setFooter({
                text: "Le BOT de GUICHARD",
                iconURL: "attachment://memojiME.png",
            });
        msg.channel.send({ embeds: [exampleEmbed], files: [file] });

        var time = null;
        var person = ["person1", "person2", "person3", "person4"];
        while (1) {
            let collected = await msg.channel.awaitMessages({
                filter: (m) => m.author.id === msg.author.id,
                max: 1,
                time: 30000,
            });

            const args = collected?.first()?.content?.trim()?.split(" ");
            const command = args?.shift()?.toLowerCase();

            console.log(args);
            console.log(command);
            var remove = [];
            var notRemove = [];
            var add = [];
            var notAdd = [];

            if (command == "remove") {
                if (args.length < 1)
                    msg.reply(
                        "Please write an argument for remove someone.\nExemple: `remove person1`"
                    );
                else {
                    for (var i = 0; i < args.length; i++) {
                        var found = Config.team.find(function (element) {
                            return element === args[i].toLowerCase();
                        });
                        if (found) remove.push(args[i].toLowerCase());
                        else notRemove.push(args[i].toLowerCase());
                        person = person.filter(function (pers) {
                            return pers !== args[i].toLowerCase();
                        });
                    }
                    msg.reply(
                        `OK, you are remove => \`${remove}\`, but \`${notRemove}\` does not exist.`
                    );
                }
            } else if (command == "add") {
                if (args.length < 1)
                    msg.reply("Please write an argument for add someone.\nExemple: `add person1`");
                else {
                    for (var i = 0; i < args.length; i++) {
                        var found = person.find(function (element) {
                            return element === args[i].toLowerCase();
                        });
                        if (found) add.push(args[i].toLowerCase());
                        else {
                            var tmp = Config.team.find(function (element) {
                                return element == args[i].toLowerCase();
                            });
                            if (tmp) {
                                add.push(args[i].toLowerCase());
                                person.push(args[i].toLowerCase());
                            } else notAdd.push(args[i].toLowerCase());
                        }
                    }
                    msg.reply(
                        `OK, you are remove => \`${add}\`, but \`${notAdd}\` does not exist.`
                    );
                }
            } else if (command == "stop") {
                msg.reply(`OK, i stoped the process. See you later !`);
                Config.process = false;
                break;
            } else if (command == "ok") {
                messageHandler.step3WhatMail(msg, person);
                break;
            } else if (command == undefined) {
                msg.reply(`OK, i stoped the process. See you later !`);
                Config.process = false;
                break;
            } else {
                msg.reply(`I don't understand your command -> \`${command}\``);
            }
            console.log(person);
        }
        if (cont == false) return;
    },

    sendMail: async (msg, args) => {
        const file = new MessageAttachment("./memojiME.png");
        const exampleEmbed = new MessageEmbed()
            .setColor(0x0099ff)
            .setTitle("Send a mail to the server")
            .setAuthor({
                name: "Etape 1/4",
                iconURL: "attachment://memojiME.png",
            })
            .setDescription(
                "- L'utilisation de ce bot permetras d'envoyer un mail à n'importe quel membre du serveur.\n\n- Vous avez la possibilité de le programmer en suivant les instructions."
            )
            .setThumbnail("attachment://memojiME.png")
            .addFields(
                { name: "\u200B", value: "\u200B" },
                {
                    name: "Do you want to send a mail `NOW` or a `SCHEDULED` mail ?",
                    value: "Please write `NOW` or `SCHEDULED` or `STOP`",
                    inline: true,
                },
                { name: "\u200B", value: "\u200B" }
            )

            .setTimestamp()
            .setFooter({
                text: "Le BOT de GUICHARD",
                iconURL: "attachment://memojiME.png",
            });
        msg.channel.send({ embeds: [exampleEmbed], files: [file] });

        Config.process = true;

        var now = null;
        while (1) {
            let collected = await msg.channel.awaitMessages({
                filter: (m) => m.author.id === msg.author.id,
                max: 1,
                time: 30000,
            });

            if (collected?.first()?.content?.toLowerCase() == "stop") {
                msg.reply(`OK, i stoped the process. See you later !`);
                Config.process = false;
                break;
            } else if (collected?.first()?.content?.toLowerCase() == "now") {
                msg.channel.send("OK Now");
                now = true;
                break;
            } else if (collected?.first()?.content?.toLowerCase() == "scheduled") {
                now = false;
                msg.channel.send("OK Scheduled");
                break;
            } else if (collected?.first()?.content?.toLowerCase() == undefined) {
                msg.reply(`OK, i stoped the process. See you later !`);
                Config.process = false;
                break;
            } else if (
                collected?.first()?.content?.toLowerCase() != "scheduled" &&
                collected?.first()?.content?.toLowerCase() != "now"
            )
                msg.channel.send("Veuillez répondre par `NOW` ou `SCHEDULED` ou `STOP` !");
        }
        if (now === null) return null;
        if (now) messageHandler.sendNow(msg);
    },
};

module.exports = messageHandler;
