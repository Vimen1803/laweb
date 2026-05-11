/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      { source: '/bot-stats/werewolf/doc', destination: '/bot-stats/werewolf/doc/index.html' },
      { source: '/bot-stats/werewolf/doc/index', destination: '/bot-stats/werewolf/doc/index.html' },
      { source: '/bot-stats/wordle/doc', destination: '/bot-stats/wordle/doc/index.html' },
      { source: '/bot-stats/wordle/doc/index', destination: '/bot-stats/wordle/doc/index.html' },
    ];
  },
};

export default nextConfig;
