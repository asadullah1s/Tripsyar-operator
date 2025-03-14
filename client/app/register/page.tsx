'use client';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FormEvent, useState } from 'react';
import Link from 'next/link';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const res = await fetch('http://localhost:3001/api/auth/register', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json' 
         },
        body: JSON.stringify({ name, username, email, password }),
      });
    
      if (!res.ok) {
        const errorData = await res.text();  // First get text
        try {
          const jsonData = JSON.parse(errorData);  // Try parsing as JSON
          throw new Error(jsonData.message || 'Registration failed');
        } catch {
          throw new Error(errorData || 'Registration failed');  // Fallback to raw text
        }
      }
    
      // Auto-login with correct endpoint
      const loginRes = await fetch('http://localhost:3001/api/auth/sessions', {
        method: 'POST',
        headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
    
      if (!loginRes.ok) {
        const loginError = await loginRes.json();
        throw new Error(loginError.message || 'Auto-login failed');
      }
    
      const { token } = await loginRes.json();
      login(token);
      router.push('/');
    } catch (err) {
      setError(
        err instanceof Error 
          ? err.message.replace(/<\/?[^>]+(>|$)/g, "")  // Strip HTML tags
          : 'Registration failed. Please try again.'
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
      <div className="bg-card text-card-foreground p-8 rounded-lg shadow-md w-96 border">
        <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Full Name</Label>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="bg-background border-border"
            />
          </div>
          <div className="space-y-2">
            <Label>Username</Label>
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="bg-background border-border"
            />
          </div>
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
              minLength={6}
              className="bg-background border-border"
            />
          </div>
          <div className="space-y-2">
            <Label>Confirm Password</Label>
            <Input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={6}
              className="bg-background border-border"
            />
          </div>
          {error && <p className="text-destructive text-sm">{error}</p>}
          <Button type="submit" className="w-full">
            Register
          </Button>
          <div className="text-center text-sm text-muted-foreground mt-4">
            Already have an account?{' '}
            <Link href="/login" className="text-accent-foreground hover:text-accent font-medium">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}