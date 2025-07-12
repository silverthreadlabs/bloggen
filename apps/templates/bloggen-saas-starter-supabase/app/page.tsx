import { Metadata } from 'next';

import Cta from '@/components/home/cta/cta';
import DesignRift from '@/components/home/designrift/designrift';
import Faq from '@/components/home/faq/faq';
import Features from '@/components/home/features/features';
import Hero from '@/components/home/hero/hero';
import Performance from '@/components/home/perfomance/performance';
import Pricing from '@/components/authui/Pricing/Pricing';
import { createPageMetadata } from '@/lib/seo/metadata/create-page-metadata';
import HomeSchema from '@/lib/seo/schema/home';
import { createClient } from '@/utils/supabase/server';
import { getProducts, getSubscription, getUser } from '@/utils/supabase/queries';
import HomePricingSection from '@/components/home/pricing/pricing-section';

export const metadata: Metadata = createPageMetadata({
    path: ''
});

export default async function Page() {
    const supabase = await createClient();
    const [user, products, subscription] = await Promise.all([
        getUser(supabase),
        getProducts(supabase),
        getSubscription(supabase)
    ]);
    
    return (
        <main className='relative flex w-full flex-col items-center justify-center overflow-hidden'>
            <HomeSchema />
            <Hero />
            <Performance />
            <HomePricingSection user={user} products={products ?? []} subscription={subscription} />
            <DesignRift />
            <Features />
            <Faq />
            <Cta />
        </main>
    );
}
