import Pricing from '@/components/authui/Pricing/Pricing';
import { createClient } from '@/utils/supabase/server';
import {
  getProducts,
  getSubscription,
  getUser
} from '@/utils/supabase/queries';

export default async function PricingPage() {
  const supabase = await  createClient();
  const [user, products, subscription] = await Promise.all([
    getUser(supabase),
    getProducts(supabase),
    getSubscription(supabase)
  ]);

  console.log('Products from server:', products);

  return (
    <>
      <Pricing
        user={user}
        products={products ?? []}
        subscription={subscription}
      />
    </>
  );
} 