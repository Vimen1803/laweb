/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    const base = '/bot-stats/werewolf/doc';
    const pages = ['normas', 'roles', 'logros', 'comandos', 'presets', 'cambios', 'index'];
    const routes = pages.map(page => ({
      source: `${base}/${page}`,
      destination: `${base}/${page}.html`,
    }));
    // Root path → index.html
    routes.push({ source: base, destination: `${base}/index.html` });
    return routes;
  },
};

export default nextConfig;
