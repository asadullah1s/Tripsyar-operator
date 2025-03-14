'use client';

import Link from 'next/link';
import { FaMoon, FaSun, FaSignOutAlt, FaBuilding } from 'react-icons/fa';
import { useTheme } from '@/app/context/ThemeProvider';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';
export default function Navbar() {
  const { toggleDarkMode } = useTheme();
  const { logout } = useAuth();
  const router = useRouter();

  const handleSignout = () => {
    logout();
    localStorage.removeItem('authToken');
    router.push('/login');
  };
  
  return (
    <nav className="p-4 border-b bg-background text-foreground border-border">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Tripsyar
        </Link>

         {/* Add Agencies link here */}
         <div className="flex gap-6">
          <Link href="/agencies" className="flex items-center gap-2 hover:text-primary">
            <FaBuilding className="h-5 w-5" />
            Agencies
          </Link>
        </div>


        <div className="flex items-center gap-4">
          <Button
            onClick={toggleDarkMode}
            variant="ghost"
            size="icon"
            className="rounded-full text-foreground hover:bg-accent/20"
          >
            <FaSun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <FaMoon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>

          <Button
            onClick={handleSignout}
            variant="outline"
            className="gap-2 border-border text-foreground hover:bg-destructive/10 hover:text-destructive"
          >
            <FaSignOutAlt />
            Sign Out
          </Button>
        </div>
      </div>
    </nav>
  );
}