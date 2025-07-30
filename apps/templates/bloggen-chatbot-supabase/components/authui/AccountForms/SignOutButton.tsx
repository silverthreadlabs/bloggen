"use client";

import { handleRequest } from '@/utils/auth-helpers/client';
import { SignOut } from '@/utils/auth-helpers/server';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function SignOutButton() {
  const router = useRouter();

  return (
    <motion.form
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.3 }}
      className="mt-4 flex justify-end"
      onSubmit={(e) => handleRequest(e, SignOut, router)}
    >
      <input type="hidden" name="pathName" value="/account" />
      <motion.button
        type="submit"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="relative cursor-pointer px-6 py-3 bg-gradient-to-r from-primary-solid to-primary-solid/80 text-primary-on-primary font-semibold rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-primary-solid/20 backdrop-blur-sm"
      >
        Sign Out
      </motion.button>
    </motion.form>
  );
}