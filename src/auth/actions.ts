'use server';

import { signIn, signOut } from '@/auth/auth';

export const login = async () => {
  await signIn('github', { redirectTo: '/home' });
};

export const logout = async () => {
  await signOut();
};
