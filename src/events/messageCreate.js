const Logger = require('../logger');
const logger = new Logger('MessageCreate');

module.exports = {
  name: 'messageCreate',
  async execute(message, client) {
    try {
      if (!message.guild || message.author.id === client.user.id) return;

      const prefix = 'eb';
      const lowerContent = message.content.toLowerCase();

      // Handle prefix commands
      if (lowerContent.startsWith(prefix + ' ')) {
        const args = message.content.slice(prefix.length + 1).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();

        const command = client.commands.get(commandName);

        if (command) {
          try {
            await command.execute(message, args, client);
          } catch (error) {
            logger.error(`Error executing command ${commandName}:`, error.message);
            await message.reply('❌ An error occurred while executing this command!');
          }
        }
      }

      // Handle mentions - send sticker
      // CORRECT USER ID: 782630678389981244
      const ownerID = '782630678389981244';
      
      if (message.mentions.has(ownerID)) {
        logger.info(`✅ Owner mentioned by ${message.author.tag}!`);
        
        const stickers = [
          'https://cdn.discordapp.com/emojis/1472947830669967392.webp?size=96',
          'https://cdn.discordapp.com/emojis/1472946773608759457.webp?size=96',
        ];
        
        const randomSticker = stickers[Math.floor(Math.random() * stickers.length)];
        
        await message.reply({
          content: randomSticker,
          allowedMentions: { repliedUser: false },
        });
        
        logger.info(`Sticker sent!`);
        return;
      }

      // Handle coin rain
      if (client.features.coinRain) {
        await client.features.coinRain.handleMessage(message);
      }

      // Handle lootbox summoning
      if (client.features.lootboxSummoning) {
        await client.features.lootboxSummoning.handleMessage(message);
      }
    } catch (error) {
      logger.error('Error:', error.message);
    }
  },
};