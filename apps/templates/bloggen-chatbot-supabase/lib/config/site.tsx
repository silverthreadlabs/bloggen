import { getURL } from '@/lib/utils/url';

export const siteConfig = {
    title: 'Bloggen chatbot supabase',
    description:
        'Launch your agency site with Bloggen chatbot supabase featuring Global Metadata Configuration, MDX products & blog pages, dynamic OG images, JSON-LD and more.',
    baseUrl: getURL(),
    creator: 'Silverthread Labs',
    publisher: 'Bloggen',
    keywords: [
        'Bloggen chatbot supabase',
        'Bloggen',
        'SEO',
        'MDX',
        'Dynamic OG Images',
        'Open Graph Images',
        'JSON-LD',
        'Schema Markup',
        'High Performance',
        'Lighthouse Score',
        'Web Development'
    ],
    alternateNames: [
        'bloggen chatbot supabase',
        'Bloggen SEO Template',
        'Bloggen Agency Starter',
        'Bloggen Agency Template'
    ],
    author: {
        name: 'Bloggen',
        url: 'https://www.bloggen.dev',
        logo: 'https://www.bloggen.dev/favicon/favicon.ico',
        twitterHandle: '@bloggen'
    },
    getImageConfig: (title: string) => ({
        url: `${getURL()}/og?title=${encodeURIComponent(title)}`,
        width: 1200,
        height: 630,
        alt: title,
        description: title
    }),
    social: {
        sameAs: []
    },
    sitemap: {
        staticRoutes: ['', '/contact', '/about', '/blog']
    }
};
