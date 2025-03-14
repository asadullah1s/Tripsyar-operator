// app/agencies/page.tsx
'use client';
import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import Link from 'next/link';

interface Agency {
  _id: string;
  salutation: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  jobTitle: string;
  country: string;
  city: string;
  address: string;
  companyName: string;
  companyAddress: string;
  businessType: string;
  secpStatus: string;
  ptdcStatus: string;
  companyCity: string;
  province: string;
  postalCode: string;
  companyCountry: string;
  companyPhone: string;
  companyPhone2: string;
  companyPhone3: string;
  companyEmail: string;
}

export default function AgenciesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [agencies, setAgencies] = useState<Agency[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAgencies = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/agencies');
        const data = await response.json();
        if (response.ok) {
          setAgencies(data.agencies);
        } else {
          setError('Failed to fetch agencies');
        }
      } catch (err) {
        setError('Error connecting to server');
      } finally {
        setLoading(false);
      }
    };
    fetchAgencies();
  }, []);

  const filteredAgencies = agencies.filter(agency =>
    agency.companyName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="text-center p-8">Loading...</div>;
  if (error) return <div className="text-center p-8 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <Input
          placeholder="Search agencies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAgencies.map((agency) => (
          <Link key={agency._id} href={`/agencies/${agency._id}`}>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>{agency.companyName}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{agency.companyEmail}</p>
                <p className="mt-2">{agency.city}, {agency.country}</p>
                <p className="text-sm mt-2">{agency.businessType}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}