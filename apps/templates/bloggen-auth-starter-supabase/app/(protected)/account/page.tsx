
import EmailForm from '@/components/authui/AccountForms/EmailForm';
import NameForm from '@/components/authui/AccountForms/NameForm';
import SignOutButton from '@/components/authui/AccountForms/SignOutButton';
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import {
  getUserDetails,
  getSubscription,
  getUser
} from '@/utils/supabase/queries';

export default async function Account() {
  const supabase = await createClient();
  const [user, userDetails, subscription] = await Promise.all([
    getUser(supabase),
    getUserDetails(supabase),
    getSubscription(supabase)
  ]);

  if (!user) {
    return redirect('/signin');
  }

  return (
    <section className="min-h-screen w-full bg-gradient-to-br from-canvas-bg via-canvas-bg-subtle to-canvas-bg relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-primary-solid/15 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-primary-solid/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.03),transparent_70%)]"></div>
      </div>

      <div className="relative z-10">
        {/* Header Section */}
        <div className="text-center px-6 sm:px-8 lg:px-12 py-12">
          {/* <div className="inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-primary-solid/10 to-primary-solid/5 border border-primary-solid/20 rounded-full text-primary-solid font-medium text-sm mb-6 backdrop-blur-sm">
            🔧 Account Settings
          </div> */}
          
          <h1 className="text-canvas-text-contrast mb-6 text-4xl leading-tight font-bold tracking-tight md:text-6xl">
            Your <span className="from-primary-solid via-primary-text to-primary-text-contrast bg-gradient-to-r bg-clip-text text-transparent">Account</span>
          </h1>
          
          <p className="max-w-3xl mx-auto text-canvas-text mb-8 text-xl leading-relaxed font-normal tracking-normal md:text-2xl">
            Manage your subscription, update your profile, and control your account settings. 
            We've partnered with Stripe for simplified and secure billing.
          </p>
        </div>

        {/* Account Forms Grid */}
        <div className="px-6 sm:px-8 lg:px-12 pb-20">
          <div className="max-w-7xl mx-auto">

            {/* Profile Section */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-canvas-text-contrast mb-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-primary-solid to-primary-solid/80 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-primary-on-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                Profile Information
              </h2>
              
              {/* Profile Forms Grid - Responsive */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <NameForm userName={userDetails?.full_name ?? ''} />
                <EmailForm userEmail={user.email} />
              </div>
              <SignOutButton />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}