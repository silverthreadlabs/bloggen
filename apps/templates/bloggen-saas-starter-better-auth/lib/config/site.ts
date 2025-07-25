import { getURL } from '@/lib/utils/url';

export const siteConfig = {
    title: 'Bloggen SaaS Starter Better Auth',
    description:
        'Launch your SaaS site with Bloggen SaaS Starter Better Auth featuring Global Metadata Configuration, MDX products & blog pages, dynamic OG images, JSON-LD and more.',
    baseUrl: getURL(),
    creator: 'Silverthread Labs',
    publisher: 'Silverthread Labs',
    keywords: [
        'bloggen',
        'bloggen seo starter',
        'seo',
        'json-ld',
        'mdx',
        'mdx-content',
        'nextjs',
        'tailwindcss',
        'fumadocs',
        'designrift',
    ],
    alternateNames: [
        'bloggen seo starter',
        'bloggen seo template',
        'bloggen agency starter',
        'bloggen agency template'
    ],
    author: {
        name: 'Silverthread Labs',
        url: 'https://www.silverthreadlabs.com',
        logo: 'https://www.silverthreadlabs.com/favicon/favicon.ico',
        twitterHandle: '@syedsaif_666'
    },
    
    getImageConfig: (title: string) => ({
        url: `${getURL()}/og?title=${encodeURIComponent(title)}`,
        width: 1200,
        height: 630,
        alt: title,
        description: title
    }),
    social: {
        sameAs: ['https://www.bloggen.dev']

    },
    sitemap: {
        staticRoutes: ['', '/support', '/about', '/blog', '/products']
    }
};
