/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://www.metrosuregroup.co.za',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: [
    '/api/*',
    '/playground',
    '/playground/*',
    '/careers/test/*',
    '/under-development',
    '/home-alt',
    '/login',
    '/og-preview',
    // Non-page assets (image generation routes)
    '/apple-icon.png',
    '/opengraph-image',
    '/twitter-image',
    // Middleware-redirected routes (not yet live)
    '/insurance/auto',
    '/insurance/home',
    '/insurance/life',
    '/insurance/business',
    '/legal',
    '/claims',
    '/policies',
    '/tools/coverage-calculator',
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/playground/',
          '/careers/test/',
          '/under-development',
          '/home-alt',
          '/login',
          '/og-preview',
          // Middleware-redirected routes (not yet live)
          '/insurance/auto',
          '/insurance/home',
          '/insurance/life',
          '/insurance/business',
          '/legal',
          '/claims',
          '/policies',
          '/tools/coverage-calculator',
        ],
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
      '/insurance/compare': 0.8,
      '/partners': 0.8,
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
