/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://trickload.vercel.app/',
    generateRobotsTxt: true,
    sitemapSize: 7000,
    exclude: ['/admin/category/create','/admin', 'admin/category','/post/create','/user/update/profile'],
  }