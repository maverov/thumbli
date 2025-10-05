/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: 'https://thumbli.net',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: 'weekly',
  priority: 0.8,
  exclude: ['/404', '/terms-of-service', '/privacy', '/disclaimers'],
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
      { userAgent: '*', disallow: ['/404'] },
    ],
  },
};

module.exports = config;
