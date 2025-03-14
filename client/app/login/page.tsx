'use client';
import { useTheme } from '../context/ThemeProvider';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FormEvent, useState } from 'react';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3001/api/auth/sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await res.json(); // Always parse response first
      if (!res.ok) throw new Error(data.message || 'Login failed');
  
      const { token } = data;
      login(token);
      router.push('/');
    } catch (err) {
      setError(
        err instanceof Error 
          ? err.message 
          : 'Invalid credentials'
      );
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
      <div className="bg-card text-card-foreground p-8 rounded-lg shadow-md w-96 border">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Email</Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-background border-border"
            />
          </div>
          <div className="space-y-2">
            <Label>Password</Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-background border-border"
            />
          </div>
          {error && <p className="text-destructive text-sm">{error}</p>}
          <Button type="submit" className="w-full">
            Login
          </Button>
          <div className="text-center text-sm text-muted-foreground mt-4">
            Don't have an account?{' '}
            <Link href="/register" className="text-accent-foreground hover:text-accent font-medium">
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}