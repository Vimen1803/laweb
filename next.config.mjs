/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    const base = '/bot-stats/werewolf/doc';
    const pages = ['normas', 'roles', 'logros', 'comandos', 'presets', 'cambios'];
    return pages.map(page => ({
      source: `${base}/${page}`,
      destination: `${base}/${page}.html`,
    }));
  },
};

export default nextConfig;
