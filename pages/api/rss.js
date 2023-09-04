const generateRssXml = (items) => {
    const channelTitle = 'My RSS Feed';
    const channelDescription = 'This is a sample RSS feed generated with Next.js';
    const siteUrl = 'https://www.trickzone.top';
  
    const itemXml = items
      .map(item => `
        <item>
          <title>${escapeXml(item.title)}</title>
          <link>${siteUrl}${escapeXml(`${item.link}/${item.title.split(/[\s?=/"':,]+/).join('-').toLowerCase()}`)}</link>
          <description>${escapeXml(item.description.split(' ').slice(0,50).join(' '))}</description>
          <pubDate>${new Date(item.date).toUTCString()}</pubDate>
        </item>
      `)
      .join('');
  
    return `
      <rss version="2.0">
        <channel>
          <title>${escapeXml(channelTitle)}</title>
          <description>${escapeXml(channelDescription)}</description>
          <link>${siteUrl}</link>
          ${itemXml}
        </channel>
      </rss>
    `;
  };
  
  const escapeXml = (unsafe) => {
    return unsafe.replace(/[<>&'"]/g, char => {
      switch (char) {
        case '<': return '&lt;';
        case '>': return '&gt;';
        case '&': return '&amp;';
        case '\'': return '&apos;';
        case '"': return '&quot;';
        default: return char;
      }
    });
  };
  
  export default async function handler(req, res) {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_PRO}/api/rss`); // Replace with your API endpoint
      const data = await response.json();
  
      const items = data.map(item => ({
        title: item.title,
        link: `/blog/${item.id}`,
        description: item.description,
        date: item.createdAt,
      }));
  
      const rssXml = generateRssXml(items);
  
      res.setHeader('Content-Type', 'text/xml');
      res.send(rssXml);
    } catch (error) {
      console.error('Error fetching or processing data:', error);
      res.status(500).end();
    }
  }
  