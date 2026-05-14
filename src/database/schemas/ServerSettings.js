const mongoose = require('mongoose');

const serverSettingsSchema = new mongoose.Schema({
  serverId: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  serverName: {
    type: String,
    default: 'Unknown',
  },
  coinRainRoleId: {
    type: String,
    default: null,
  },
  lootboxRoleId: {
    type: String,
    default: null,
  },
  prefix: {
    type: String,
    default: 'eb ',
  },
  features: {
    coinRainEnabled: { type: Boolean, default: true },
    lootboxEnabled: { type: Boolean, default: true },
    actionsEnabled: { type: Boolean, default: true },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('ServerSettings', serverSettingsSchema);