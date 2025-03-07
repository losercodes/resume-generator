/** @type {import('next').NextConfig} */
let userConfig = undefined

try {
  userConfig = require('./v0-user-next.config')
} catch (e) {
  // ignore error
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    webpackBuildWorker: true,
    parallelServerBuildTraces: true,
    parallelServerCompiles: true,
  },
  env: {
    GROQ_API_KEY: process.env.GROQ_API_KEY,
  },
}

function mergeConfig(config, userConfig) {
  if (!userConfig) {
    return config
  }

  for (const key in userConfig) {
    if (
      typeof config[key] === 'object' &&
      !Array.isArray(config[key])
    ) {
      config[key] = {
        ...config[key],
        ...userConfig[key],
      }
    } else {
      config[key] = userConfig[key]
    }
  }
  
  return config
}

module.exports = mergeConfig(nextConfig, userConfig)