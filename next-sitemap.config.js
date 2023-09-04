/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://www.trickzone.top',
    generateRobotsTxt: true,
    sitemapSize: 7000,
    exclude: ['/admin/category/create','/admin', 'admin/category','admin/posts','/user/update/profile'],
  }