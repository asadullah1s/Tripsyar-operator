'use client';
import React, { useState } from 'react';
import { useTheme } from './context/ThemeProvider';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useAuth } from './context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';


// ==============================================
// FormSection Component: Reusable card container for form sections
// Props: title - Section title, children - Form fields
// ==============================================
interface FormSectionProps {
  title: string;
  children: React.ReactNode;
}

const FormSection: React.FC<FormSectionProps> = ({ title, children }) => {
  return (
    // JSX here...
    <Card className="w-full md:w-1/2">
      <CardHeader>
        <CardTitle className="text-primary">{title}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">{children}</CardContent>
    </Card>
  );
};

// ==============================================
// InputField Component: Text input field with validation and navigation
// Features: Auto-focus next field on Enter, error display
// Props: label, type, name, placeholder, value, onChange, error, nextFieldId
// ==============================================
interface InputFieldProps {
  label: string;
  type?: string;
  name: string;
  placeholder?: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement> | string,
    name?: string,
  ) => void;
  error?: string;
  onEnter?: () => void;
  nextFieldId?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  // Props destructuring...
  label,
  type = 'text',
  name,
  placeholder,
  value,
  onChange,
  error,
  nextFieldId,
}) => {
  // Handle Enter key for field navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (nextFieldId) {
        const nextField = document.getElementById(nextFieldId);
        if (nextField) {
          nextField.focus();
        }
      }
    }
  };
  // JSX here...
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Input
        id={`input-${name}`}
        type={type}
        name={name}
        value={value}
        onChange={(e) => onChange(e, name)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};
// ==============================================
// SelectField Component: Dropdown selector with options
// Props: label, name, options, value, onChange
// ==============================================
interface SelectFieldProps {
  label: string;
  name: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string, name?: string) => void;
}

const SelectField: React.FC<SelectFieldProps> = ({
  // Props destructuring...
  label,
  name,
  options,
  value,
  onChange,
}) => {
  // JSX here...
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Select value={value} onValueChange={(value) => onChange(value, name)}>
        <SelectTrigger>
          <SelectValue placeholder={`Select ${label}`} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option, index) => (
            <SelectItem key={index} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

interface FormData {
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
// ==============================================
// Main Form Component: Multi-step registration form
// Handles: Form state, validation, API submission, and popups
// ==============================================
export default function Home() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) router.push('/login');
  }, [isAuthenticated, router]);
  const initialFormState: FormData = 
    {
      // Initial form state setup
    salutation: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    jobTitle: '',
    country: '',
    city: '',
    address: '',
    companyName: '',
    companyAddress: '',
    businessType: '',
    secpStatus: '',
    ptdcStatus: '',
    companyCity: '',
    province: '',
    postalCode: '',
    companyCountry: '',
    companyPhone: '',
    companyPhone2: '',
    companyPhone3: '',
    companyEmail: '',
  };
// Main state management
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormState);
{/* Popup after clicking Submit */}
const [isSuccessPopupOpen, setSuccessPopupOpen] = useState(false);
const [isCompanyExistsPopupOpen, setCompanyExistsPopupOpen] = useState(false);
const [isValidationErrorPopupOpen, setValidationErrorPopupOpen] = useState(false);
const [isEmailExistsPopupOpen, setEmailExistsPopupOpen] = useState(false);
{/* Popup after clicking Submit Ends*/}





{/* Error Handling */}
  const [errors, setErrors] = useState<Record<string, string>>({});
{/* Error Handling Ends*/}


// ============================================
// handleInputChange: Universal input handler
// Features: Updates form state, validates emails/phones
// Handles both string (Select) and event (Input) changes
// ============================================
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement> | string,
    name?: string,
  ) => {
    // Input processing logic...
// Validation checks for email/phone formats...
    let fieldName: string;
    let value: string;

    if (typeof e === 'string' && name) {
      fieldName = name;
      value = e;
      setFormData((prev) => ({ ...prev, [fieldName]: value }));
    } else if (typeof e !== 'string') {
      const { name: inputName, value: inputValue } = e.target;
      fieldName = inputName;
      value = inputValue;
      setFormData((prev) => ({ ...prev, [fieldName]: inputValue }));
    } else {
      return;
    }

    // Validation
    let errorMessage = '';
    if (fieldName.includes('email')) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        errorMessage = 'Invalid email address';
      }
    } else if (fieldName.includes('phone')) {
      const phoneRegex = /^(\+92\d{10}|0\d{10})$/;
      if (!phoneRegex.test(value)) {
        errorMessage =
          'Invalid phone number format. Must be +92 followed by 10 digits or 0 followed by 10 digits.';
      }
    }

    setErrors((prev) => ({
      ...prev,
      [fieldName]: errorMessage,
    }));
  };

 // Tour Package Management =====================================
  const [tourDetails, setTourDetails] = useState<any[]>([]);
  const [tourForm, setTourForm] = useState({
    name: '',
    source: '',
    destination: '',
    price: '',
  });

  // Tour handlers: Add/Edit/Delete=====================================
  const handleAddTour = () => {
    if (tourEditIndex !== null) {
      const updatedTours = [...tourDetails];
      updatedTours[tourEditIndex] = tourForm;
      setTourDetails(updatedTours);
      setTourEditIndex(null);
    } else {
      setTourDetails((prev) => [...prev, tourForm]);
    }
    setTourForm({ name: '', source: '', destination: '', price: '' });
    setTourPopupOpen(false);
  };

  const handleEditTour = (index: number) => {
    setTourForm(tourDetails[index]);
    setTourEditIndex(index);
    setTourPopupOpen(true);
  };
  const handleDeleteTour = (index: number) => {
    setTourDetails(tourDetails.filter((_, i) => i !== index));
  };
  
    // state for tour popups=====================================
    const [isTourPopupOpen, setTourPopupOpen] = useState(false);

    // tour edit indices=====================================
  const [tourEditIndex, setTourEditIndex] = useState<number | null>(null);

  const handleTourFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTourForm((prev) => ({ ...prev, [name]: value }));
  };

 // Social Media Management ===============================================
  const [socialMediaDetails, setSocialMediaDetails] = useState<any[]>([]);
  const [socialMediaForm, setSocialMediaForm] = useState({
    platform: '',
    url: '',
    rating: '',
    followers: '',
    likes: '',
  });

  
  // state for social media popups===============================================
  const [isSocialMediaPopupOpen, setSocialMediaPopupOpen] = useState(false);

  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [isPopupOpen, setPopupOpen] = useState(false);

  // social edit indices===============================================
  const [socialEditIndex, setSocialEditIndex] = useState<number | null>(null);

  
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSocialMediaForm((prev) => ({ ...prev, [name]: value }));
  };

  // Social media handlers: Add/Edit/Delete===============================================
  const handleAddSocialMedia = () => {
    if (socialEditIndex !== null) {
      const updatedDetails = [...socialMediaDetails];
      updatedDetails[socialEditIndex] = socialMediaForm;
      setSocialMediaDetails(updatedDetails);
      setSocialEditIndex(null);
    } else {
      setSocialMediaDetails((prev) => [...prev, socialMediaForm]);
    }
    setSocialMediaForm({
      platform: '',
      url: '',
      rating: '',
      followers: '',
      likes: '',
    });
    setSocialMediaPopupOpen(false);
  };

  const handleEditSocialMedia = (index: number) => {
    setSocialMediaForm(socialMediaDetails[index]);
    setSocialEditIndex(index);
    setSocialMediaPopupOpen(true);
  };
  const handleDeleteSocialMedia = (index: number) => {
    setSocialMediaDetails(socialMediaDetails.filter((_, i) => i !== index));
  };
  

// ============================================
// isStepValid: Validates current step's required fields
// Returns: Boolean indicating if step is complete/valid
// ============================================
  const isStepValid = () => {
    // Field validation logic per step...
    const currentFields = [];
    switch (step) {
      case 1:
        currentFields.push(
          'firstName',
          'lastName',
          'email',
          'phone',
          'jobTitle',
          'country',
          'city',
          'address',
        );
        break;
      case 2:
        currentFields.push(
          'companyName',
          'companyAddress',
          'businessType',
          'secpStatus',
          'ptdcStatus',
          'companyCity',
          'province',
          'postalCode',
          'companyCountry',
          'companyPhone',
          'companyEmail',
        );
        break;
      case 3:
        return true;
      case 4:
        return true;
      default:
        return true;
    }

    return currentFields.every((field) => {
      const value = formData[field as keyof FormData]?.trim();
      const error = errors[field];
      return value !== '' && !error;
    });
  };

// ============================================
// handleSubmit: Final form submission handler
// Features: API call, error handling, popup management
// Converts numeric fields before sending to API
// ============================================
const handleSubmit = () => {
  fetch('http://localhost:3001/api/agencies', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify({
      ...formData,
      socialMediaDetails: socialMediaDetails.map(item => ({
        ...item,
        rating: item.rating ? Number(item.rating) : 0,
        followers: item.followers ? Number(item.followers) : 0,
        likes: item.likes ? Number(item.likes) : 0
      })),
      tourDetails: tourDetails.map(tour => ({
        ...tour,
        price: tour.price ? Number(tour.price) : 0
      }))
    }),
  })
    .then(async (response) => {
// Response handling logic...
// Error status handling (409, 422, etc)...
      const data = await response.json();
      if (!response.ok) {
        if (response.status === 422) {
          const step1Fields = ['salutation', 'firstName', 'lastName', 'email', 'phone', 'jobTitle', 'country', 'city', 'address'];
          const step2Fields = ['companyName', 'companyAddress', 'businessType', 'secpStatus', 'ptdcStatus', 'companyCity', 'province', 'postalCode', 'companyCountry', 'companyPhone', 'companyEmail'];
          const errorFields = Object.keys(data.details || {});
          
          let newStep = 1;
          if (errorFields.some(field => step2Fields.includes(field))) {
            newStep = 2;
          }
          
          setStep(newStep);
          setErrors(data.details || {});
          setValidationErrorPopupOpen(true);
        } else if (response.status === 409) {
          if (data.message === "Company already exists") {
            setCompanyExistsPopupOpen(true);
          } else if (data.message === "User already exists") {
            // Handle user exists error (add a new popup if needed)
            console.error("User already exists");
          }
          return;
        }
        throw new Error(data.message || 'Network response was not ok');
      }
      setSuccessPopupOpen(true);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };


  {/* Submit to DataBase end*/}
  

  // Popup Handlers =============================
const handleSuccessOk = () => {
  setSuccessPopupOpen(false);
  setFormData(initialFormState);
  setTourDetails([]);
  setSocialMediaDetails([]);
  setStep(1);
};

const handleCompanyExistsOk = () => {
  setCompanyExistsPopupOpen(false);
  setFormData(initialFormState);
  setTourDetails([]);
  setSocialMediaDetails([]);
  setStep(1);
};

const handleValidationErrorOk = () => {
  setValidationErrorPopupOpen(false);
};
{/*Handlers for buttons End*/}




  return (
    <div
      className="max-w-6xl mx-auto p-6 bg-background text-foreground"
    >
      {/* Step 1: Personal Information */}
      {step === 1 && (
        <div className="flex flex-col md:flex-row gap-6">
          <FormSection title="Personal Information">
            <SelectField
              options={[
                { value: 'Mr', label: 'Mr' },
                { value: 'Mrs', label: 'Mrs' },
                { value: 'Ms', label: 'Ms' },
              ]}
              label="Salutation"
              name="salutation"
              value={formData.salutation}
              onChange={handleInputChange}
            />
            <InputField
              label="First Name"
              name="firstName"
              nextFieldId="input-lastName"
              placeholder="Enter your first name"
              value={formData.firstName}
              onChange={handleInputChange}
            />
            <InputField
              label="Last Name"
              name="lastName"
              nextFieldId="input-email"
              placeholder="Enter your last name"
              value={formData.lastName}
              onChange={handleInputChange}
            />
            <InputField
              label="Email Address"
              name="email"
              nextFieldId="input-phone"
              placeholder="Enter your Email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              error={errors.email}
            />
            <InputField
              label="Phone Number"
              name="phone"
              nextFieldId="input-jobTitle"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleInputChange}
              error={errors.phone}
            />
            <InputField
              label="Job Title"
              name="jobTitle"
              nextFieldId="input-country"
              placeholder="Enter your job title"
              value={formData.jobTitle}
              onChange={handleInputChange}
            />
          </FormSection>

          <FormSection title="Address Information">
            <SelectField
              label="Country"
              name="country"
              options={[{ value: 'Pakistan', label: 'Pakistan' }]}
              value={formData.country}
              onChange={handleInputChange}
            />
            <InputField
              label="City"
              name="city"
              nextFieldId="input-address"
              placeholder="Enter your city"
              value={formData.city}
              onChange={handleInputChange}
            />
            <InputField
              label="Address"
              name="address"
              placeholder="Enter your address"
              value={formData.address}
              onChange={handleInputChange}
            />
          </FormSection>
        </div>
      )}

      {/* Step 2: Company Details */}
      {step === 2 && (
        <div className="flex flex-col md:flex-row gap-6">
          <FormSection title="Company Details">
            <InputField
              label="Company Name"
              name="companyName"
              nextFieldId="input-companyAddress"
              placeholder="Enter company name"
              value={formData.companyName}
              onChange={handleInputChange}
            />
            <InputField
              label="Company Address"
              name="companyAddress"
              nextFieldId="input-secpStatus"
              placeholder="Enter company address"
              value={formData.companyAddress}
              onChange={handleInputChange}
            />
            <SelectField
              label="Business Type"
              name="businessType"
              options={[
                { value: 'SOLE', label: 'SOLE' },
                { value: 'SMC', label: 'SMC' },
                { value: 'PVT', label: 'PVT' },
              ]}
              value={formData.businessType}
              onChange={handleInputChange}
            />
            <InputField
              label="SECP Status"
              name="secpStatus"
              nextFieldId="input-ptdcStatus"
              placeholder="Enter SECP status"
              value={formData.secpStatus}
              onChange={handleInputChange}
            />
            <InputField
              label="PTDC Status"
              name="ptdcStatus"
              nextFieldId="input-companyCity"
              placeholder="Enter PTDC status"
              value={formData.ptdcStatus}
              onChange={handleInputChange}
            />
            <InputField
              label="Company City"
              name="companyCity"
              nextFieldId="input-postalCode"
              placeholder="Enter city"
              value={formData.companyCity}
              onChange={handleInputChange}
            />
            <SelectField
              label="Province"
              name="province"
              options={[
                { value: 'KPK', label: 'KPK' },
                { value: 'Punjab', label: 'Punjab' },
                { value: 'Sindh', label: 'Sindh' },
                { value: 'Balochistan', label: 'Balochistan' },
              ]}
              value={formData.province}
              onChange={handleInputChange}
            />
          </FormSection>

          <FormSection title="Contact Information">
            <InputField
              label="Postal Code"
              name="postalCode"
              nextFieldId="input-companyPhone"
              placeholder="Enter postal code"
              value={formData.postalCode}
              onChange={handleInputChange}
            />
            <SelectField
              label="Company Country"
              name="companyCountry"
              options={[{ value: 'Pakistan', label: 'Pakistan' }]}
              value={formData.companyCountry}
              onChange={handleInputChange}
            />
            <InputField
              label="Company Phone"
              name="companyPhone"
              nextFieldId="input-companyPhone2"
              placeholder="Enter company phone number"
              value={formData.companyPhone}
              onChange={handleInputChange}
              error={errors.companyPhone}
            />
            <InputField
              label="Company Phone 2"
              name="companyPhone2"
              nextFieldId="input-companyPhone3"
              placeholder="Enter company phone number 2"
              value={formData.companyPhone2}
              onChange={handleInputChange}
            />
            <InputField
              label="Company Phone 3"
              name="companyPhone3"
              nextFieldId="input-companyEmail"
              placeholder="Enter company phone number 3"
              value={formData.companyPhone3}
              onChange={handleInputChange}
            />
            <InputField
              label="Company Email"
              name="companyEmail"
              placeholder="Enter company email"
              value={formData.companyEmail}
              onChange={handleInputChange}
              error={errors.companyEmail}
            />
          </FormSection>
        </div>
      )}

      {/* Step 3: Social Media Details */}
      {step === 3 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-primary">Social Media Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {['Website', 'Facebook', 'Instagram', 'Youtube', 'Tiktok'].map(
                (platform) => (
                  <div
                    key={platform}
                    className="flex justify-between items-center"
                  >
                    <Label className="text-lg">{platform} URL:</Label>
                    <Button
                      onClick={() => {
                        setSocialMediaPopupOpen(true);
                        setSocialMediaForm({
                          platform,
                          url: '',
                          rating: '',
                          followers: '',
                          likes: '',
                        });
                      }}
                    >
                      Add
                    </Button>
                  </div>
                ),
              )}
            </div>

            {socialMediaDetails.length > 0 && (
              <Table className="mt-6">
                <TableHeader>
                  <TableRow>
                    <TableHead>Platform</TableHead>
                    <TableHead>URL</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Followers</TableHead>
                    <TableHead>Likes</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {socialMediaDetails.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.platform}</TableCell>
                      <TableCell>{item.url}</TableCell>
                      <TableCell>{item.rating}</TableCell>
                      <TableCell>{item.followers}</TableCell>
                      <TableCell>{item.likes}</TableCell>
                      <TableCell className="flex gap-2">
                        <Button
                          variant="secondary"
                          onClick={() => handleEditSocialMedia(index)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="destructive"
                          onClick={() => handleDeleteSocialMedia(index)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      )}

      {/* Step 4: Tour Details */}
      {step === 4 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-primary">Tour Details</CardTitle>
          </CardHeader>
          <CardContent>
            <Button onClick={() => setTourPopupOpen(true)} className="mb-4">
              Add Tour
            </Button>

            {tourDetails.length > 0 && (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tour Name</TableHead>
                    <TableHead>Source</TableHead>
                    <TableHead>Destination</TableHead>
                    <TableHead>Price (Rs)</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tourDetails.map((tour, index) => (
                    <TableRow key={index}>
                      <TableCell>{tour.name}</TableCell>
                      <TableCell>{tour.source}</TableCell>
                      <TableCell>{tour.destination}</TableCell>
                      <TableCell>{tour.price}</TableCell>
                      <TableCell className="flex gap-2">
                        <Button
                          variant="secondary"
                          onClick={() => handleEditTour(index)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="destructive"
                          onClick={() => handleDeleteTour(index)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      )}

      {/* Step 5: Confirmation */}
      {step === 5 && (
        <div className="p-8">
          <div className="flex justify-center mb-8">
            <h1 className="text-primary text-4xl font-bold">Tripsyar</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card onClick={() => setStep(1)} className="cursor-pointer">
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p>
                  <strong>Salutation:</strong> {formData.salutation}
                </p>
                <p>
                  <strong>First Name:</strong> {formData.firstName}
                </p>
                <p>
                  <strong>Last Name:</strong> {formData.lastName}
                </p>
                <p>
                  <strong>Email:</strong> {formData.email}
                </p>
                <p>
                  <strong>Phone:</strong> {formData.phone}
                </p>
                <p>
                  <strong>Job Title:</strong> {formData.jobTitle}
                </p>
              </CardContent>
            </Card>

            <Card onClick={() => setStep(1)} className="cursor-pointer">
              <CardHeader>
                <CardTitle>Address Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p>
                  <strong>Country:</strong> {formData.country}
                </p>
                <p>
                  <strong>City:</strong> {formData.city}
                </p>
                <p>
                  <strong>Address:</strong> {formData.address}
                </p>
              </CardContent>
            </Card>

            <Card onClick={() => setStep(2)} className="cursor-pointer">
              <CardHeader>
                <CardTitle>Company Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p>
                  <strong>Company Name:</strong> {formData.companyName}
                </p>
                <p>
                  <strong>Company Address:</strong> {formData.companyAddress}
                </p>
                <p>
                  <strong>Business Type:</strong> {formData.businessType}
                </p>
                <p>
                  <strong>SECP Status:</strong> {formData.secpStatus}
                </p>
                <p>
                  <strong>PTDC Status:</strong> {formData.ptdcStatus}
                </p>
                <p>
                  <strong>Company City:</strong> {formData.companyCity}
                </p>
                <p>
                  <strong>Province:</strong> {formData.province}
                </p>
                <p>
                  <strong>Postal Code:</strong> {formData.postalCode}
                </p>
              </CardContent>
            </Card>


            <Card onClick={() => setStep(2)} className="cursor-pointer">
              <CardHeader>
                <CardTitle>Company Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p>
                  <strong>Postal Code:</strong> {formData.postalCode}
                </p>
                <p>
                  <strong>Company Country:</strong> {formData.companyCountry}
                </p>
                <p>
                  <strong>Company Phone:</strong> {formData.companyPhone}
                </p>
                <p>
                  <strong>Company Phone 2:</strong> {formData.companyPhone2}
                </p>
                <p>
                  <strong>Company Phone 3:</strong> {formData.companyPhone3}
                </p>
                <p>
                  <strong>Company Email:</strong> {formData.companyEmail}
                </p>
                
              </CardContent>
            </Card>

            <Card onClick={() => setStep(3)} className="cursor-pointer">
              <CardHeader>
                <CardTitle>Social Media Details</CardTitle>
              </CardHeader>
              <CardContent>
                {socialMediaDetails.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Platform</TableHead>
                        <TableHead>URL</TableHead>
                        <TableHead>Rating</TableHead>
                        <TableHead>Followers</TableHead>
                        <TableHead>Likes</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {socialMediaDetails.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell>{item.platform}</TableCell>
                          <TableCell>{item.url}</TableCell>
                          <TableCell>{item.rating}</TableCell>
                          <TableCell>{item.followers}</TableCell>
                          <TableCell>{item.likes}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <p>No social media details available.</p>
                )}
              </CardContent>
            </Card>

            <Card onClick={() => setStep(4)} className="cursor-pointer">
              <CardHeader>
                <CardTitle>Tour Details</CardTitle>
              </CardHeader>
              <CardContent>
                {tourDetails.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Tour Name</TableHead>
                        <TableHead>Source</TableHead>
                        <TableHead>Destination</TableHead>
                        <TableHead>Price (Rs)</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {tourDetails.map((tour, index) => (
                        <TableRow key={index}>
                          <TableCell>{tour.name}</TableCell>
                          <TableCell>{tour.source}</TableCell>
                          <TableCell>{tour.destination}</TableCell>
                          <TableCell>{tour.price}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <p>No tour details available.</p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Social Media Dialog */}
      <Dialog
        open={isSocialMediaPopupOpen}
        onOpenChange={setSocialMediaPopupOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {socialEditIndex !== null ? 'Edit' : 'Add'}{' '}
              {socialMediaForm.platform} Details
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Input
              name="url"
              placeholder="URL"
              value={socialMediaForm.url}
              onChange={(e) =>
                setSocialMediaForm((prev) => ({ ...prev, url: e.target.value }))
              }
            />
            <Input
              name="rating"
              placeholder="Rating"
              value={socialMediaForm.rating}
              onChange={(e) =>
                setSocialMediaForm((prev) => ({
                  ...prev,
                  rating: e.target.value,
                }))
              }
            />
            <Input
              name="followers"
              placeholder="Followers"
              value={socialMediaForm.followers}
              onChange={(e) =>
                setSocialMediaForm((prev) => ({
                  ...prev,
                  followers: e.target.value,
                }))
              }
            />
            <Input
              name="likes"
              placeholder="Likes"
              value={socialMediaForm.likes}
              onChange={(e) =>
                setSocialMediaForm((prev) => ({
                  ...prev,
                  likes: e.target.value,
                }))
              }
            />
          </div>
          <DialogFooter>
            <Button onClick={handleAddSocialMedia}>
              {socialEditIndex !== null ? 'Update' : 'Add'}
            </Button>
            <Button
              variant="outline"
              onClick={() => setSocialMediaPopupOpen(false)}
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Tour Dialog */}
      <Dialog open={isTourPopupOpen} onOpenChange={setTourPopupOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {tourEditIndex !== null ? 'Edit' : 'Add'} Tour
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Input
              name="name"
              placeholder="Tour Name"
              value={tourForm.name}
              onChange={handleTourFormChange}
            />
            <Input
              name="source"
              placeholder="Source"
              value={tourForm.source}
              onChange={handleTourFormChange}
            />
            <Input
              name="destination"
              placeholder="Destination"
              value={tourForm.destination}
              onChange={handleTourFormChange}
            />
            <Input
              name="price"
              placeholder="Price (Rs)"
              value={tourForm.price}
              onChange={handleTourFormChange}
            />
          </div>
          <DialogFooter>
            <Button onClick={handleAddTour}>
              {tourEditIndex !== null ? 'Update Tour' : 'Add Tour'}
            </Button>
            <Button variant="outline" onClick={() => setTourPopupOpen(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>




      {/* Success Dialog */}
<Dialog open={isSuccessPopupOpen} onOpenChange={setSuccessPopupOpen}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Company Registered</DialogTitle>
    </DialogHeader>
    <div className="p-4">
      <p>Company is Registered successfully.</p>
    </div>
    <DialogFooter>
      <Button onClick={handleSuccessOk}>OK</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>

{/* Company Exists Dialog */}
<Dialog open={isCompanyExistsPopupOpen} onOpenChange={setCompanyExistsPopupOpen}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Company Already Registered</DialogTitle>
    </DialogHeader>
    <div className="p-4">
      <p>Company is already registered.</p>
    </div>
    <DialogFooter>
      <Button onClick={handleCompanyExistsOk}>OK</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>

{/* Email Exists Dialog */}
<Dialog open={isEmailExistsPopupOpen} onOpenChange={setEmailExistsPopupOpen}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Email Already Registered</DialogTitle>
    </DialogHeader>
    <div className="p-4">
      <p>This email is already registered with another company.</p>
    </div>
    <DialogFooter>
      <Button onClick={() => setEmailExistsPopupOpen(false)}>OK</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>

{/* Validation Error Dialog */}
<Dialog open={isValidationErrorPopupOpen} onOpenChange={setValidationErrorPopupOpen}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Validation Error</DialogTitle>
    </DialogHeader>
    <div className="p-4 space-y-2">
      <p className="text-sm font-medium">Please fix these errors:</p>
      <div className="space-y-2">
      {Object.entries(errors).map(([field, message]) => (
  <div key={field} className="flex items-start gap-2">
    <span className="text-red-500">•</span>
    <div>
      <p className="font-medium text-foreground">
        {field.replace(/([A-Z])/g, ' $1').toLowerCase()}:
      </p>
      <p className="text-red-500 text-sm">{message as string}</p>
    </div>
  </div>
))}
      </div>
    </div>
    <DialogFooter>
      <Button onClick={handleValidationErrorOk}>OK</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
      {/* Navigation Controls */}
      <div className="flex justify-between mt-8">
        <Button
          variant="outline"
          onClick={() => setStep((prev) => Math.max(prev - 1, 1))}
          disabled={step === 1}
        >
          Previous
        </Button>
        <Button
          onClick={() =>
            step === 5
              ? handleSubmit()
              : setStep((prev) => Math.min(prev + 1, 5))
          }
          disabled={!isStepValid()}
        >
          {step === 5 ? 'Submit' : 'Next'}
        </Button>
      </div>
    </div>
  );
}
