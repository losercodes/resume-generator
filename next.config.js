/** @type {import('next').NextConfig} */
let userConfig = undefined
try {
  // For ES modules, we need to use dynamic import() instead of require()
  const importUserConfig = async () => {
    try {
      return await import('./v0-user-next.config.js');
    } catch (e) {
      // Try .mjs extension if .js fails
      return await import('./v0-user-next.config.mjs');
    }
  };
  
  // We'll set this later in an async context
  userConfig = {};
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

// For ES modules, use export default instead of module.exports
export default mergeConfig(nextConfig, userConfig);
