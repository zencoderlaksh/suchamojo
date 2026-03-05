import { z } from "zod";

// Password validation rules
const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(
    /[^A-Za-z0-9]/,
    "Password must contain at least one special character",
  );

// Login Schema
export const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters"),
  rememberMe: z.boolean().default(false).optional(),
});

// Signup Schema
export const signupSchema = z
  .object({
    fullName: z
      .string()
      .min(2, "Full name must be at least 2 characters")
      .max(50, "Full name must not exceed 50 characters")
      .regex(/^[a-zA-Z\s]+$/, "Full name can only contain letters and spaces"),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Invalid email address"),
    username: z
      .string()
      .min(3, "Username must be at least 3 characters")
      .max(20, "Username must not exceed 20 characters")
      .regex(
        /^[a-zA-Z0-9_-]+$/,
        "Username can only contain letters, numbers, underscores, and hyphens",
      )
      .optional()
      .or(z.literal("")),
    password: passwordSchema,
    confirmPassword: z.string().min(1, "Please confirm your password"),
    phone: z
      .string()
      .regex(/^\+?[\d\s-()]{0,}$/, "Invalid phone number format")
      .optional()
      .or(z.literal("")),
    serviceInterest: z.string().min(1, "Please select a service interest"),
    termsAccepted: z
      .boolean()
      .refine(
        (val) => val === true,
        "You must accept the terms and conditions",
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const serviceInterests = [
  { value: "consulting", label: "1:1 Consulting" },
  { value: "team-training", label: "Team Training" },
  { value: "cohort", label: "Cohort" },
  { value: "mfd-branding", label: "MFD Branding" },
];
