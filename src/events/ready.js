const Logger = require('../logger');

const logger = new Logger('Ready');

module.exports = {
  name: 'clientReady',
  once: true,
  execute(client) {
    logger.info(`✅ Bot logged in as ${client.user.tag}`);
    logger.info(`📊 Serving ${client.guilds.cache.size} guild(s)`);

    // Multiple rotating statuses
    const activities = [
      { name: 'EPIC-BOTS | Vibing 🎮', type: 'PLAYING' },
      { name: 'EPIC-BOTS | Coin Rains 🌧️', type: 'WATCHING' },
      { name: 'EPIC-BOTS | Lootbox Events 🎁', type: 'WATCHING' },
    ];

    let index = 0;

    // Set initial status
    client.user.setActivity(activities[index].name, { type: activities[index].type });

    // Change status every 10 seconds
    setInterval(() => {
      index = (index + 1) % activities.length;
      client.user.setActivity(activities[index].name, { type: activities[index].type });
    }, 10000);

    logger.info('✅ Status rotations started');
  },
};