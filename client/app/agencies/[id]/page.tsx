// app/agencies/[id]/page.tsx
'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface AgencyDetails {
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
  socialMediaDetails: Array<{
    platform: string;
    url: string;
    rating: number;
    followers: number;
    likes: number;
  }>;
  tourDetails: Array<{
    name: string;
    source: string;
    destination: string;
    price: number;
  }>;
}

export default function AgencyDetailPage() {
  const { id } = useParams();
  const [agency, setAgency] = useState<AgencyDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAgency = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/agencies/${id}`,
        );
        const data = await response.json();
        if (response.ok) {
          setAgency(data.agency);
        } else {
          setError('Agency not found');
        }
      } catch (err) {
        setError('Error fetching agency details');
      } finally {
        setLoading(false);
      }
    };
    fetchAgency();
  }, [id]);

  if (loading) return <div className="text-center p-8">Loading...</div>;
  if (error) return <div className="text-center p-8 text-red-500">{error}</div>;
  if (!agency) return null;

  return (
    <div className="p-8">
      <div className="flex justify-center mb-8">
        <h1 className="text-primary text-4xl font-bold">
          {agency.companyName}
        </h1>
      </div>
      <div className=" grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardContent className="space-y-2">
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <p>
              <strong>Salutation:</strong> {agency.salutation}
            </p>
            <p>
              <strong>First Name:</strong> {agency.firstName}
            </p>
            <p>
              <strong>Last Name:</strong> {agency.lastName}
            </p>
            <p>
              <strong>Email:</strong> {agency.email}
            </p>
            <p>
              <strong>Phone:</strong> {agency.phone}
            </p>
            <p>
              <strong>Job Title:</strong> {agency.jobTitle}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="space-y-2">
            <CardHeader>
              <CardTitle>Address Information</CardTitle>
            </CardHeader>
            <p>
              <strong>Country:</strong> {agency.country}
            </p>
            <p>
              <strong>City:</strong> {agency.city}
            </p>
            <p>
              <strong>Address:</strong> {agency.address}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="space-y-2">
            <CardHeader>
              <CardTitle>Company Details</CardTitle>
            </CardHeader>
            <p>
              <strong>Company Name:</strong> {agency.companyName}
            </p>
            <p>
              <strong>Company Address:</strong> {agency.companyAddress}
            </p>
            <p>
              <strong>Business Type:</strong> {agency.businessType}
            </p>
            <p>
              <strong>SECP Status:</strong> {agency.secpStatus}
            </p>
            <p>
              <strong>PTDC Status:</strong> {agency.ptdcStatus}
            </p>
            <p>
              <strong>Company City:</strong> {agency.companyCity}
            </p>
            <p>
              <strong>Province:</strong> {agency.province}
            </p>
            <p>
              <strong>Postal Code:</strong> {agency.postalCode}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Company Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p>
              <strong>Postal Code:</strong> {agency.postalCode}
            </p>
            <p>
              <strong>Company Country:</strong> {agency.companyCountry}
            </p>
            <p>
              <strong>Company Phone:</strong> {agency.companyPhone}
            </p>
            <p>
              <strong>Company Phone 2:</strong> {agency.companyPhone2}
            </p>
            <p>
              <strong>Company Phone 3:</strong> {agency.companyPhone3}
            </p>
            <p>
              <strong>Company Email:</strong> {agency.companyEmail}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="space-y-2">
            {agency.socialMediaDetails.length > 0 && (
              <div>
                <CardHeader>
                  <CardTitle>Social Media Details</CardTitle>
                </CardHeader>
                {agency.socialMediaDetails.map((social, index) => (
                  <div key={index} className="mb-2">
                    <p>
                      {social.platform}: {social.url}
                    </p>
                    <p>Rating: {social.rating}/5</p>
                    <p>Followers: {social.followers}</p>
                    <p>Likes: {social.likes}</p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="space-y-2">
            {agency.tourDetails.length > 0 && (
              <div>
                <CardHeader>
                  <CardTitle>Tour Pakages</CardTitle>
                </CardHeader>
                {agency.tourDetails.map((tour, index) => (
                  <div key={index} >
                    <p className="font-medium">{tour.name}</p>
                    <p>From: {tour.source}</p>
                    <p>To: {tour.destination}</p>
                    <p>Price: Rs.{tour.price}</p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
