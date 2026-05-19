const Logger = require("../logger");

const logger = new Logger("CoinRain");

class CoinRainFeature {
  constructor(client) {
    this.client = client;
  }

  /**
   * Extract the LAST number from text (the max reward)
   */
  getLastNumber(text) {
    const numbers = text.match(/\d+(?:,\d{3})*(?:\.\d+)?|\d+(?:\.\d+)?/g);
    if (!numbers || numbers.length === 0) return null;

    // Get the LAST number (usually the max reward)
    const lastNum = numbers[numbers.length - 1];
    const cleaned = lastNum.replace(/,/g, "");
    return parseInt(cleaned, 10);
  }

  /**
   * Format number with commas
   */
  formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  /**
   * Check if coin amount is mentionable (1Q+)
   */
  isMentionworthy(coins) {
    return coins >= 1_000_000_000_000_000;
  }

  /**
   * Get all text from message (content + embeds)
   */
  getAllText(message) {
    let allText = "";

    if (message.content) {
      allText += message.content + " ";
    }

    if (message.embeds && message.embeds.length > 0) {
      message.embeds.forEach((embed) => {
        if (embed.title) allText += embed.title + " ";
        if (embed.description) allText += embed.description + " ";
        if (embed.author && embed.author.name)
          allText += embed.author.name + " ";
        if (embed.footer && embed.footer.text)
          allText += embed.footer.text + " ";
        if (embed.fields) {
          embed.fields.forEach((field) => {
            allText += field.name + " " + field.value + " ";
          });
        }
      });
    }

    return allText;
  }

  /**
   * Handle coin rain message
   */
  async handleMessage(message) {
    try {
      // Only respond to EPIC RPG bot
      if (message.author.id !== "555955826880413696") {
        return;
      }

      const allText = this.getAllText(message);

      // Check for IT'S RAINING COINS
      if (!allText.includes("IT'S RAINING COINS")) {
        return;
      }

      // Get the last number (max reward)
      const maxReward = this.getLastNumber(allText);
      if (!maxReward) {
        return;
      }

      // Only trigger if coins are mentionable (1Q+)
      if (!this.isMentionworthy(maxReward)) {
        logger.info(`⏭️  Coin Rain ignored: ${this.formatNumber(maxReward)} coins (below 1Q)`);
        return;
      }

      await this.triggerCoinRain(message, maxReward);
    } catch (error) {
      logger.error("Error handling coin rain:", error.message);
    }
  }

  /**
   * Trigger coin rain announcement
   */
  async triggerCoinRain(message, maxReward) {
    try {
      const formattedReward = this.formatNumber(maxReward);
      const roleId = "1470272824500555980";

      const coinRainMessage = `<@&${roleId}> You don't need **${formattedReward}** coins… right?`;

      // Send the initial message with mention
      const sentMessage = await message.channel.send({
        content: coinRainMessage,
        allowedMentions: { parse: ["roles"] },
      });

      // Wait 30 seconds then DELETE the entire message
      setTimeout(async () => {
        try {
          await sentMessage.delete();
          logger.info(`✅ Coin Rain message deleted after 30 seconds: ${formattedReward} coins`);
        } catch (error) {
          logger.error("Error deleting coin rain message:", error.message);
        }
      }, 30000); // 30 seconds in milliseconds

      logger.info(`✅ Coin Rain sent: ${formattedReward} coins`);
    } catch (error) {
      logger.error("Error triggering coin rain:", error.message);
    }
  }
}

module.exports = CoinRainFeature;