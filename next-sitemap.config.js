/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.altaqauae.com',
  generateRobotsTxt: true,
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,
  additionalPaths: async (config) => [
    await config.transform(config, '/energy-calculator'),
  ],
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
    ],
  },
}
