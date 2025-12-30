/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://www.metrosuregroup.co.za',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ['/api/*'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
    ],
    additionalSitemaps: [],
  },
  changefreq: 'weekly',
  priority: 0.7,
  transform: async (config, path) => {
    // Custom priority for important pages
    const priorities = {
      '/': 1.0,
      '/about': 0.9,
      '/contact': 0.9,
      '/quote': 0.9,
      '/careers': 0.85,
      '/insurance/auto': 0.8,
      '/insurance/home': 0.8,
      '/insurance/life': 0.8,
      '/insurance/business': 0.8,
      '/partners': 0.8,
      '/claims': 0.8,
    };

    // Job detail pages get high priority for SEO
    if (path.startsWith('/careers/') && path !== '/careers') {
      return {
        loc: path,
        changefreq: 'weekly',
        priority: 0.8,
        lastmod: new Date().toISOString(),
      };
    }

    return {
      loc: path,
      changefreq: config.changefreq,
      priority: priorities[path] || config.priority,
      lastmod: new Date().toISOString(),
    };
  },
};
