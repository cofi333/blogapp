import { TNavigationLink } from '@/lib/types';
import React from 'react';
import Link from 'next/link';

const NavigationLink: React.FC<{ data: TNavigationLink }> = ({ data }) => {
  const { label, url } = data;

  return (
    <Link href={url} className="my-2 block hover:opacity-60">
      {label}
    </Link>
  );
};

export default NavigationLink;
