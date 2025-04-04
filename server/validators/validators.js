const { z } = require('zod');

// Creating an object schema for the user
const agencySchema = z.object({
  salutation: z.string().nonempty({ message: "Salutation is required" }),

  firstName: z.string().trim()
    .min(2, { message: "First name must be at least 2 characters long" })
    .max(50, { message: "First name must be at most 50 characters long" }),

  lastName: z.string().trim()
    .min(2, { message: "Last name must be at least 2 characters long" })
    .max(50, { message: "Last name must be at most 50 characters long" }),

  email: z.string().trim()
    .email({ message: "Invalid email address" })
    .min(2, { message: "Email must be at least 2 characters long" })
    .max(50, { message: "Email must be at most 50 characters long" }),

    phone: z.string().trim().refine(val => 
      /^(\+92[\s-]?\d{3}[\s-]?\d{7}|0\d{10})$/.test(val), 
  'Invalid format. Use +92XXX XXXXXXX or 0XXXXXXXXXX'
    ),

  jobTitle: z.string().trim()
    .min(2, { message: "Job title must be at least 2 characters long" })
    .max(50, { message: "Job title must be at most 50 characters long" }),

  country: z.string().trim()
    .min(2, { message: "Country must be at least 2 characters long" })
    .max(50, { message: "Country must be at most 50 characters long" }),

  city: z.string().trim()
    .min(2, { message: "City must be at least 2 characters long" })
    .max(50, { message: "City must be at most 50 characters long" }),

  address: z.string().trim()
    .min(2, { message: "Address must be at least 2 characters long" })
    .max(50, { message: "Address must be at most 50 characters long" }),

  companyName: z.string().trim()
    .min(2, { message: "Company name must be at least 2 characters long" })
    .max(50, { message: "Company name must be at most 50 characters long" }),

  companyAddress: z.string().trim()
    .min(2, { message: "Company address must be at least 2 characters long" })
    .max(50, { message: "Company address must be at most 50 characters long" }),

  businessType: z.string().trim()
    .min(2, { message: "Business type must be at least 2 characters long" })
    .max(50, { message: "Business type must be at most 50 characters long" }),

  secpStatus: z.string().trim()
    .min(2, { message: "SECP status must be at least 2 characters long" })
    .max(50, { message: "SECP status must be at most 50 characters long" }),

  ptdcStatus: z.string().trim()
    .min(2, { message: "PTDC status must be at least 2 characters long" })
    .max(50, { message: "PTDC status must be at most 50 characters long" }),

  companyCity: z.string().trim()
    .min(2, { message: "Company city must be at least 2 characters long" })
    .max(50, { message: "Company city must be at most 50 characters long" }),

  province: z.string().trim()
    .min(2, { message: "Province must be at least 2 characters long" })
    .max(50, { message: "Province must be at most 50 characters long" }),

  postalCode: z.string().trim()
    .min(2, { message: "Postal code must be at least 2 characters long" })
    .max(10, { message: "Postal code must be at most 10 characters long" }),

  companyCountry: z.string().trim()
    .min(2, { message: "Company country must be at least 2 characters long" })
    .max(50, { message: "Company country must be at most 50 characters long" }),

  companyPhone: z.string().trim().refine(val => 
    /^(\+92[\s-]?\d{3}[\s-]?\d{7}|0\d{10})$/.test(val), 
  'Invalid format. Use +92XXX XXXXXXX or 0XXXXXXXXXX'),

  companyPhone2: z.string().trim().refine(val => 
    /^(\+92[\s-]?\d{3}[\s-]?\d{7}|0\d{10})$/.test(val), 
  'Invalid format. Use +92XXX XXXXXXX or 0XXXXXXXXXX').optional(),

  companyPhone3: z.string().trim().refine(val => 
    /^(\+92[\s-]?\d{3}[\s-]?\d{7}|0\d{10})$/.test(val), 
  'Invalid format. Use +92XXX XXXXXXX or 0XXXXXXXXXX').optional(),

  companyEmail: z.string().trim()
    .email({ message: "Invalid company email address" })
    .min(2, { message: "Company email must be at least 2 characters long" })
    .max(50, { message: "Company email must be at most 50 characters long" }),

  socialMediaDetails: z.array(z.object({
    platform: z.string().trim()
      .min(2, { message: "Platform must be at least 2 characters long" })
      .max(50, { message: "Platform must be at most 50 characters long" }),

    url: z.string().trim()
      .min(2, { message: "URL must be at least 2 characters long" })
      .max(100, { message: "URL must be at most 100 characters long" }),

    rating: z.number()
      .min(0, { message: "Rating must be at least 0" })
      .max(5, { message: "Rating must be at most 5" }),

    likes: z.number()
      .min(0, { message: "Likes must be at least 0" }),

    followers: z.number()
      .min(0, { message: "Followers must be at least 0" })
  })).optional(),

  tourDetails: z.array(z.object({
    name: z.string().trim()
      .min(2, { message: "Name must be at least 2 characters long" })
      .max(50, { message: "Name must be at most 50 characters long" }),

      source: z.string().trim()
      .min(2, { message: "Source must be at least 2 characters long" })
      .max(50, { message: "Source must be at most 50 characters long" }),

    destination: z.string().trim()
      .min(2, { message: "Destination must be at least 2 characters long" })
      .max(50, { message: "Destination must be at most 50 characters long" }),

    price: z.number()
      .min(0, { message: "Price must be at least 0" })
      .max(10000, { message: "Price must be at most 10000" })
  })).optional()
});

const registerSchema = z.object({
  name: z.string().min(2),
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6)
});


// Add login schema at the bottom
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});



module.exports = { agencySchema, loginSchema, registerSchema };