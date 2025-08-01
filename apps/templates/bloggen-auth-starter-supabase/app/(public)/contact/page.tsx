import { siteConfig } from '@/lib/config/site';

const contactSchema = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  'name': 'Contact',
  'description': 'Contact Silverthread Labs for business inquiries or support.',
  'mainEntity': {
    '@type': 'Organization',
    'name': 'Silverthread Labs',
    'url': siteConfig.baseUrl,
    'contactPoint': {
      '@type': 'ContactPoint',
      'email': 'silverthreadlabs@gmail.com',
      'contactType': 'customer support',
      'areaServed': 'Worldwide',
      'availableLanguage': 'English'
    }
  }
};

export default function ContactPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />
      {/* ...your contact form or info... */}
    </main>
  );
} 