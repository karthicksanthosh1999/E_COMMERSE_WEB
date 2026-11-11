
import { z } from "zod";

// Login validation
export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Enter a valid email address"),

  password: z
    .string()
    .min(1, "Password is required"),
});

// Registration validation
export const registerSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(3, "Full name must be at least 3 characters")
    .max(100, "Full name is too long"),

  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Enter a valid email address"),

  whatsapp: z
    .string()
    .trim()
    .regex(
      /^\+?[1-9]\d{7,14}$/,
      "Enter a valid WhatsApp number"
    ),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(64, "Password cannot exceed 64 characters")
    .regex(/[A-Z]/, "At least one uppercase letter required")
    .regex(/[a-z]/, "At least one lowercase letter required")
    .regex(/[0-9]/, "At least one number required")
    .regex(
      /[^A-Za-z0-9]/,
      "At least one special character required"
    ),
});

// OTP validation
export const verifyOtpSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Invalid email address"),

  otp: z
    .string()
    .length(6, "OTP must contain 6 digits")
    .regex(/^\d{6}$/, "OTP must contain only numbers"),
});

// Infer TypeScript types
export type LoginDto = z.infer<typeof loginSchema>;
export type RegisterDto = z.infer<typeof registerSchema>;
export type VerifyOtpDto = z.infer<typeof verifyOtpSchema>;
