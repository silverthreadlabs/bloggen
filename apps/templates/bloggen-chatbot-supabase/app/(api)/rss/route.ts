import { getBlogPosts } from '@/lib/blog';
import { siteConfig } from '@/lib/config/site';

export async function GET() {
    // Skip RSS generation during build time
    if (process.env.NODE_ENV === 'production' && !process.env.NEXT_PUBLIC_SUPABASE_URL) {
        return new Response('RSS not configured', { status: 400 });
    }

    const allBlogs = await getBlogPosts();

    const itemsXml = allBlogs
        .sort((a, b) => {
            if (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)) {
                return -1;
            }
            
return 1;
        })
        .map(
            (post) =>
                `<item>
          <title>${post.metadata.title}</title>
          <link>${siteConfig.baseUrl}/blog/${post.slug}</link>
          <description>${post.metadata.summary || ''}</description>
          <pubDate>${new Date(post.metadata.publishedAt).toUTCString()}</pubDate>
        </item>`
        )
        .join('\n');

    const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0">
    <channel>
        <title>Blogs</title>
        <link>${siteConfig.baseUrl}</link>
        <description>Latest Blogs</description>
        ${itemsXml}
    </channel>
  </rss>`;

    return new Response(rssFeed, {
        headers: {
            'Content-Type': 'text/xml'
        }
    });
}
