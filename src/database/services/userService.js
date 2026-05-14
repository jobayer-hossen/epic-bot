const User = require('../schemas/User');
const Logger = require('../../logger');

const logger = new Logger('UserService');

class UserService {
  /**
   * Get or create user
   */
  async getOrCreateUser(userId, username, isBot = false) {
    try {
      if (isBot) return null;

      let user = await User.findOne({ userId });

      if (!user) {
        user = new User({
          userId,
          username,
        });
        await user.save();
        logger.info(`✅ New user created: ${username} (${userId})`);
      } else {
        if (user.username !== username) {
          user.username = username;
          user.updatedAt = new Date();
          await user.save();
        }
      }

      return user;
    } catch (error) {
      logger.error('Error getting/creating user:', error.message);
      return null;
    }
  }

  /**
   * Add XP to user
   */
  async addXP(userId, xpAmount) {
    try {
      const user = await User.findOne({ userId });
      
      if (!user) {
        return null;
      }

      user.xp += xpAmount;
      user.updatedAt = new Date();
      await user.save();

      return user;
    } catch (error) {
      logger.error('Error adding XP:', error.message);
      return null;
    }
  }

  /**
   * Add coins to user
   */
  async addCoins(userId, coinAmount) {
    try {
      const user = await User.findOne({ userId });
      
      if (!user) {
        return null;
      }

      user.coins += coinAmount;
      user.updatedAt = new Date();
      await user.save();

      return user;
    } catch (error) {
      logger.error('Error adding coins:', error.message);
      return null;
    }
  }

  /**
   * Increment commands used
   */
  async incrementCommandsUsed(userId) {
    try {
      const user = await User.findOne({ userId });
      
      if (!user) {
        return null;
      }

      user.commandsUsed += 1;
      user.updatedAt = new Date();
      await user.save();

      return user;
    } catch (error) {
      logger.error('Error incrementing commands:', error.message);
      return null;
    }
  }

  /**
   * Get user profile
   */
  async getUserProfile(userId) {
    try {
      const user = await User.findOne({ userId });
      return user;
    } catch (error) {
      logger.error('Error getting user profile:', error.message);
      return null;
    }
  }

  /**
   * Get top users (leaderboard)
   */
  async getTopUsers(limit = 10, sortBy = 'coins') {
    try {
      const users = await User.find()
        .sort({ [sortBy]: -1 })
        .limit(limit);

      return users;
    } catch (error) {
      logger.error('Error getting top users:', error.message);
      return [];
    }
  }

  /**
   * Get user rank
   */
  async getUserRank(userId, sortBy = 'coins') {
    try {
      const user = await User.findOne({ userId });
      if (!user) return null;

      const rank = await User.countDocuments({
        [sortBy]: { $gt: user[sortBy] }
      });

      return rank + 1;
    } catch (error) {
      logger.error('Error getting user rank:', error.message);
      return null;
    }
  }
}

module.exports = new UserService();