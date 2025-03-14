'use client';

import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';

const ClientNavbar = () => {
  const pathname = usePathname();
  const Navbar = dynamic(() => import('@/components/Navbar'), { ssr: false });

  if (pathname === '/login' || pathname === '/register') {
    return null;
  }
  
  return <Navbar />;
};

export default ClientNavbar;