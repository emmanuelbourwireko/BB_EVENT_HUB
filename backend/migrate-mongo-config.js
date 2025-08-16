// Tell dotenv where to find the environment variables file
require('dotenv').config({ path: './config/config.env' });

const config = {
  mongodb: {
    // This will now correctly load your MONGO_URI
    url: process.env.MONGO_URI,

    databaseName: "bb_event_hub_db", // Optional: specify db name if not in URI

    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  },

  migrationsDir: "migrations",
  changelogCollectionName: "changelog",
  migrationFileExtension: ".js",
  useFileHash: false,
  moduleSystem: 'commonjs',
};

module.exports = config;
