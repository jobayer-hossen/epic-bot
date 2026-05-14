const mongoose = require('mongoose');
const Logger = require('../logger');

const logger = new Logger('Database');

// Disable deprecation warnings
mongoose.set('strictQuery', false);

class DatabaseConnection {
  async connect() {
    try {
      const mongoUri = process.env.MONGODB_URI;

      console.log('🔍 Checking MONGODB_URI...');
      console.log('MONGODB_URI exists:', !!mongoUri);
      
      if (!mongoUri) {
        logger.error('❌ MONGODB_URI not found in .env');
        return false;
      }

      console.log('🔌 Attempting MongoDB connection...');
      
      await mongoose.connect(mongoUri);

      logger.info('✅ Connected to MongoDB Atlas Successfully!');
      return true;
    } catch (error) {
      logger.error('❌ MongoDB Connection Failed!');
      logger.error('Error Message:', error.message);
      return false;
    }
  }

  async disconnect() {
    try {
      await mongoose.disconnect();
      logger.info('✅ Disconnected from MongoDB');
    } catch (error) {
      logger.error('Error disconnecting:', error.message);
    }
  }
}

module.exports = new DatabaseConnection();