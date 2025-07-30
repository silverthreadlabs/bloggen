import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import {
  getAuthTypes,
  getViewTypes,
  getDefaultSignInView,
  getRedirectMethod
} from '@/utils/auth-helpers/settings';
import Card from '@/components/authui/Card';
import PasswordSignIn from '@/components/authui/AuthForms/PasswordSignIn';
import EmailSignIn from '@/components/authui/AuthForms/EmailSignIn';
import Separator from '@/components/authui/AuthForms/Separator';
import OauthSignIn from '@/components/authui/AuthForms/OauthSignIn';
import ForgotPassword from '@/components/authui/AuthForms/ForgotPassword';
import UpdatePassword from '@/components/authui/AuthForms/UpdatePassword';
import SignUp from '@/components/authui/AuthForms/Signup';

export default async function SignIn({
  params,
  searchParams
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ disable_button: boolean }>;
}) {
  const { allowOauth, allowEmail, allowPassword } = getAuthTypes();
  const viewTypes = getViewTypes();
  const redirectMethod = getRedirectMethod();
  // Await params to access its properties
  const { id } = await params;
  const { disable_button } = await searchParams;

  // Declare 'viewProp' and initialize with the default value
  let viewProp: string;

  // Assign url id to 'viewProp' if it's a valid string and ViewTypes includes it
  if (typeof id === 'string' && viewTypes.includes(id)) {
    viewProp = id;
  } else {
    const cookieStore = await cookies();
    const preferredSignInView =
      cookieStore.get('preferredSignInView')?.value || null;
    viewProp = getDefaultSignInView(preferredSignInView);

    
    return redirect(`/signin/${viewProp}`);
  }

  // Check if the user is already logged in and redirect to the account page if so
  const supabase = await createClient();

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (user && viewProp !== 'update_password') {
    return redirect('/');
  } else if (!user && viewProp === 'update_password') {
    return redirect('/signin');
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Animated background elements (simplified for theme consistency) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -right-1/2 w-96 h-96 bg-primary-base/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-1/2 -left-1/2 w-96 h-96 bg-secondary-base/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-primary-base/10 rounded-full blur-2xl animate-bounce"></div>
      </div>

      {/* Main content */}
      <div className="flex-grow flex items-center justify-center px-4 py-12 relative z-10">
        <div className="w-auto md:w-[500px] mx-auto bg-canvas-bg/50 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-canvas-border/50 relative">
          {/* Gradient border effect (using theme colors) */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary-base/20 via-primary-bg/20 to-secondary-base/20 rounded-3xl blur-sm -z-10"></div>

          {/* Auth form section */}
          <div className="p-8 relative">
            {/* Glass effect overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>

            <h2 className="text-2xl font-semibold text-canvas-text-contrast mb-8 text-center relative z-10">
              {viewProp === 'forgot_password'
                ? 'Reset Password'
                : viewProp === 'update_password'
                  ? 'Update Password'
                  : viewProp === 'signup'
                    ? 'Sign Up'
                    : 'Login to Your Account'}
            </h2>

            <div className="relative z-10">
              {viewProp === 'password_signin' && (
                <PasswordSignIn
                  allowEmail={allowEmail}
                  redirectMethod={redirectMethod}
                />
              )}
              {viewProp === 'email_signin' && (
                <EmailSignIn
                  allowPassword={true}
                  redirectMethod={redirectMethod}
                  disableButton={disable_button}
                />
              )}
              {viewProp === 'forgot_password' && (
                <ForgotPassword
                  allowEmail={allowEmail}
                  redirectMethod={redirectMethod}
                />
              )}
              {viewProp === 'update_password' && (
                <UpdatePassword
                  redirectMethod={redirectMethod}
                />
              )}
              {viewProp === 'signup' && (
                <SignUp allowEmail={allowEmail} redirectMethod={redirectMethod} />
              )}
              {viewProp !== 'update_password' &&
                viewProp !== 'signup' &&
                allowOauth && (
                  <>
                    <div className="my-8">
                      <Separator text="or continue with" />
                    </div>
                    <OauthSignIn />
                  </>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}