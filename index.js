const dotenv = require("dotenv");
const fs = require("fs");

dotenv.config();
console.log();

const Discord = require("discord.js");
const client = new Discord.Client();
client.login(process.env.TOKEN);

client.once("ready", () => {
  console.log("Ready!");
});

client.on("voiceStateUpdate", (oldMember, newMember) => {
  // On Activity in chanel
  if (process.env.CHANELID == newMember.channelID) {
    //   If the new member is in specified chanel
    const channel = client.channels.cache.get(process.env.CHANELID);
    if (!channel) {
      return console.error("The channel does not exist!");
    }
    channel
      .join()
      .then((connection) => {
        const dispatcher = connection.play("./whispers.mp3");
        dispatcher.on("finish", () => {
          channel.leave();
        });
      })
      .catch((e) => {
        console.error(e);
      });
  }
});
