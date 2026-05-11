/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/bot-stats/werewolf/doc',
        destination: '/bot-stats/werewolf/doc/index',
      },
      {
        source: '/bot-stats/werewolf/doc/index',
        destination: '/bot-stats/werewolf/doc/index.html',
      },
    ];
  },
};

export default nextConfig;
