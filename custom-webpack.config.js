const { EnvironmentPlugin } = require('webpack');

require('dotenv').config()

module.exports = {
  plugins: [
    new EnvironmentPlugin([
      'AUTH_KEY',
    ]),
  ],
};
