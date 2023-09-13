
export default function robots() {
  return (
    <p>
      User-Agent: * 
      <br/>
      Allow: /
      <br/>
      Disallow: /private/
      <br/>
      Sitemap: {process.env.NEXT_PUBLIC_SITE_URL}/sitemap.xml
    </p>
      

    )
}
