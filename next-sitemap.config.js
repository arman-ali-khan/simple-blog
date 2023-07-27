/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.SITE_URL,
    generateRobotsTxt: true,
    sitemapSize: 7000,
    exclude: ['/admin/category/create','/admin', 'admin/category','/post/create','/user/update/profile'],
  }