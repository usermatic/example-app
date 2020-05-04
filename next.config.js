// next.config.js
const webpack = require('webpack')

const { parsed: parsedEnv } = require('dotenv').config()

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({
  webpack (config) {
    config.plugins.push(new webpack.EnvironmentPlugin(parsedEnv))
    return config
  }
})
