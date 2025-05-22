const isGithubPages = process.env.GITHUB_PAGES === 'true';
const isCustomDomain = process.env.CUSTOM_DOMAIN === 'true';

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
  output: 'export',
  assetPrefix: isGithubPages ? '/website/' : '',
  basePath: isGithubPages ? '/website' : '',
}

export default nextConfig
