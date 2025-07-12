

import { siteConfig } from '@/lib/config/site';

import type { WebSite, WithContext } from 'schema-dts';

const baseURL = siteConfig.baseUrl;
const silverthreadLabsURL = 'https://www.silverthreadlabs.com';
const SITE_TITLE = 'Bloggen Saas Starter Supabase';

const homeSchema: WithContext<WebSite> = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Bloggen Saas Starter Supabase',
    alternateName: ['bloggen Saas Starter Supabase', 'Bloggen SEO Template', 'Bloggen Agency Starter', 'Bloggen Agency Template'],
    description:
        'Launch your agency site with Bloggen Saas Starter Supabase featuring  Global Metadata Configuration, MDX products & blog pages, dynamic OG images, JSON-LD and more.',
    url: baseURL, // Dynamically uses your base URL
    publisher: {
        '@type': 'Organization',
        name: 'Silverthread Labs',
        url: silverthreadLabsURL,
        logo: {
            '@type': 'ImageObject',
            url: `${silverthreadLabsURL}/favicon/favicon.ico`
        }
    },
    image: {
        '@type': 'ImageObject',
        url: `${baseURL}/og?title=${encodeURIComponent(SITE_TITLE)}`,
        width: '1200',
        height: '630',
        description: SITE_TITLE
    },
    sameAs: [
        // "https://www.silverthreadlabs.com/"
    ],
    keywords: [
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
    ]
};

const HomeSchema: React.FC = () => (
    <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(homeSchema) }} />
);

export default HomeSchema;
