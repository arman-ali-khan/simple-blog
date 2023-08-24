const EXTERNAL_DATA_URL = process.env.NEXT_PUBLIC_API_PRO;
const INTERNAL_DATA_URL = process.env.SITE_URL;

function generateSiteMap(posts) {
  return `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
     <!--We manually set the two URLs we know already-->
     <url>
       <loc>${INTERNAL_DATA_URL}</loc>
     </url>
     <url>
       <loc>${INTERNAL_DATA_URL}/search</loc>
     </url>
     ${posts
       .map((post, { id }) => {
         return `
       <url>
           <loc>${`${INTERNAL_DATA_URL}/blog/${post.id}/${post.title.split(' ').join('-').toLowerCase()}`}</loc> 
           <changefreq>daily</changefreq>
           <lastmod>${post.createdAt}</lastmod>
          <priority>0.7</priority>
       </url>
     `;
       })
       .join("")}
   </urlset>
 `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
  // We make an API call to gather the URLs for our site
  const request = await fetch(
    `${EXTERNAL_DATA_URL}/api/posts?limit=5000page=1`
  );
  const allPosts = await request.json();

  const posts = allPosts.posts;

  // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap(posts);

  res.setHeader("Content-Type", "text/xml");
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;
