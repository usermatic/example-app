// next.config.js
const webpack = require('webpack')

const { parsed: parsedEnv } = require('dotenv').config()

module.exports = {
  webpack (config) {
    config.plugins.push(new webpack.EnvironmentPlugin(parsedEnv))
    return config
  }
}
