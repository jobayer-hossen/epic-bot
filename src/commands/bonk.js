const { EmbedBuilder } = require("discord.js");
const Logger = require("../logger");

const logger = new Logger("BonkCommand");

module.exports = {
  name: "bonk",
  description: "Bonk someone with a bat!",

  async execute(message, args, client) {
    try {
      const user = message.mentions.users.first();

      if (!user) {
        return await message.reply(
          "❌ Please mention someone! Usage: `eb bonk @user`",
        );
      }

      if (user.id === message.author.id) {
        return await message.reply("🔨 You bonked yourself! Go to horny jail!");
      }

      const bonkMessages = [
        `🔨 BONK! ${user.username} has been sent to horny jail!`,
        `⚾ *BONK* ${message.author.username} bonks ${user.username}!`,
        `🔨 ${user.username} got bonked hard!`,
        `⚾ Go to horny jail! *BONK* ${user.username}!`,
        `🔨 ${message.author.username} swings the bonk bat at ${user.username}!`,
        `💢 *BONK* ${user.username} got launched into the shadow realm!`,
        `🔨 CRITICAL BONK on ${user.username}!`,
        `⚾ The legendary bonk strikes ${user.username}!`,
      ];

      const bonkGifs = [
        "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZm5reDFidmZrZGg5ZGF6MWZpenAybXU5cW51bjc1MTlqNmUzNTI0aCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/schUjA2QKXd3NE59Yo/giphy.gif",
        "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZm5reDFidmZrZGg5ZGF6MWZpenAybXU5cW51bjc1MTlqNmUzNTI0aCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/qgVnduXSn5Hy7DbW3r/giphy.gif",
        "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZm5reDFidmZrZGg5ZGF6MWZpenAybXU5cW51bjc1MTlqNmUzNTI0aCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/GcTTNIyN9PZsBJxKRI/giphy.gif",
        "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZm5reDFidmZrZGg5ZGF6MWZpenAybXU5cW51bjc1MTlqNmUzNTI0aCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/dCqz0HYyau1lPIjZi1/giphy.gif",
        "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3amFycHowdmpjbjYzazN4Y2g4cWZjbWduZ3FsbmQwbjFsc29wNnQyYiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/bkNa5EdzSUHvlttGEh/giphy.gif",
        "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3MDUydjJlbWtqbW1wM3J3eHk3aW9vOTBqZzFmYnZ6eWUycmQ1d3F3MyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/wxPamaDYtKo52qsTOF/giphy.gif",
        "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3MDUydjJlbWtqbW1wM3J3eHk3aW9vOTBqZzFmYnZ6eWUycmQ1d3F3MyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/ihA4UppRKGiIQp69Si/giphy.gif",
      ];

      const randomMessage =
        bonkMessages[Math.floor(Math.random() * bonkMessages.length)];

      const randomGif = bonkGifs[Math.floor(Math.random() * bonkGifs.length)];

      const embed = new EmbedBuilder()
        .setColor("#8B4513")
        .setTitle("🔨 BONK!")
        .setDescription(randomMessage)
        .setImage(randomGif)
        .setTimestamp()
        .setFooter({
          text: "To horny jail you go! 🔨",
          iconURL: client.user.avatarURL(),
        });

      await message.reply({ embeds: [embed] });

      await message.react("🔨");
      await message.react("⚾");

      logger.info(`${message.author.tag} bonked ${user.tag}`);
    } catch (error) {
      logger.error("Error in bonk command:", error.message);

      await message.reply("❌ An error occurred!");
    }
  },
};
