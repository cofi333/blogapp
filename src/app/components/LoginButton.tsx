'use client';
import { GitHubIcon } from '../assets/icons';
import Image from 'next/image';
import { login } from '@/auth/actions';

const LoginButton = () => {
  return (
    <button
      onClick={() => login()}
      className="flex items-center gap-2 rounded-xl bg-black p-3 font-medium text-white transition-all ease-in hover:cursor-pointer hover:opacity-80"
    >
      <Image src={GitHubIcon} alt="Github icon" width={25} height={20} />
      Sign in with GitHub
    </button>
  );
};

export default LoginButton;
