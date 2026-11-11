"use client";

import { useState } from "react";
import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  X,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  loginSchema,
  registerSchema,
  verifyOtpSchema,
} from "@/validation-schemas/auth-validation";


import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import api from "@/lib/axios";
import Image from "next/image";
interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AuthModal({
  open,
  onOpenChange,
}: AuthModalProps) {

  type AuthMode = "signin" | "register";
  type AuthStep = "form" | "verify-otp";

  const [mode, setMode] = useState<AuthMode>("signin");
  const [step, setStep] = useState<AuthStep>("form");

  const [showPassword, setShowPassword] = useState(false);
  const [otp, setOtp] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    passwordHash: "",
  });

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      setMode("signin");
      setStep("form");
      setOtp("");
      setError("");
      setShowPassword(false);
    }

    onOpenChange(nextOpen);
  };

  const updateField = (
    field: keyof typeof formData,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setError("");
    setFieldErrors({});

    const schema =
      mode === "signin" ? loginSchema : registerSchema;

    const validation = schema.safeParse(formData);

    if (!validation.success) {
      const errors: Record<string, string> = {};

      validation.error.issues.forEach((issue) => {
        const field = issue.path[0];

        if (field) {
          errors[String(field)] = issue.message;
        }
      });

      setFieldErrors(errors);
      return;
    }

    setLoading(true);

    try {
      if (mode === "signin") {
        const response = await api.post(
          "/api/auth/login",
          validation.data
        );

        if (response.data?.statusCode === 200) {
          handleOpenChange(false);
          window.location.reload();
        }

        return;
      }

      const response = await api.post(
        "/api/auth/register",
        validation.data
      );

      if (
        response.data?.statusCode === 200 ||
        response.data?.statusCode === 201
      ) {
        setStep("verify-otp");
      }
    } catch (err) {
      console.log(err)
      setError(
        "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setError("");
    setFieldErrors({});

    const validation = verifyOtpSchema.safeParse({
      email: formData.email,
      otp,
    });

    if (!validation.success) {
      setError(validation.error.issues[0].message);
      return;
    }

    setLoading(true);

    try {
      const response = await api.post(
        "/api/auth/verify-otp",
        validation.data
      );

      if (response.data?.statusCode === 200) {
        handleOpenChange(false);
        window.location.reload();
      }
    } catch (err) {
      console.log(err)
      setError(
        "Invalid OTP. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="
          w-[calc(100%-24px)]
          max-w-105
          overflow-hidden
          rounded-[24px]
          border
          border-[#b98116]
          bg-[#fffdf8]
          p-0
          shadow-[0_25px_80px_rgba(0,0,0,0.55)]
        "
      >
        <DialogTitle className="sr-only">
          Sri Gowri Royal Connoisseur Club
        </DialogTitle>

        {/* =====================================================
            HEADER
        ====================================================== */}
        <div className="bg-[#580000] px-6 pb-5 pt-5 text-[#fff4d5]">
          <div className="flex items-start justify-between">

            {/* Logo + Brand */}
            <div className="flex items-center gap-3">
              <div
                className="
                  relative
                  flex
                  h-9.5
                  w-9.5
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-[#e6b51e]
                "
              >
                <div className="absolute inset-0.75 rounded-full border border-[#e6b51e]" />

                <Image src={'/Code_Generated_Image.png'} alt="logo" width={100} height={100} />
              </div>

              <div>
                <h2 className="font-serif text-[18px] font-bold tracking-wide">
                  SRI GOWRI
                </h2>

                <p className="mt-0.5 text-[8px] font-bold tracking-[0.15em] text-[#f4c326]">
                  CK ROYAL ENTERPRISE
                </p>
              </div>
            </div>

            {/* Close */}
            <button
              type="button"
              onClick={() => handleOpenChange(false)}
              aria-label="Close"
              className="
                mt-1
                text-[#f7e4b8]
                transition-colors
                hover:text-white
              "
            >
              <X size={18} strokeWidth={1.8} />
            </button>
          </div>

          {/* =================================================
              AUTH TABS
          ================================================== */}
          {step === "form" && (
          <div className="mt-5 flex h-9 rounded-full border border-[#a87911] bg-[#350000] p-0.75">

            <button
              type="button"
              onClick={() => setMode("signin")}
              className={`
                flex-1
                rounded-full
                text-[11px]
                font-bold
                transition-all
                ${
                  mode === "signin"
                    ? "bg-[#f7c324] text-[#350000]"
                    : "text-[#fff0ca]"
                }
              `}
            >
              Sign In
            </button>

            <button
              type="button"
              onClick={() => setMode("register")}
              className={`
                flex-1
                rounded-full
                text-[11px]
                font-bold
                transition-all
                ${
                  mode === "register"
                    ? "bg-[#f7c324] text-[#350000]"
                    : "text-[#fff0ca]"
                }
              `}
            >
              Create Account
            </button>
           </div>
          )}

        </div>

        {/* =====================================================
            BODY
        ====================================================== */}
  <div className="px-6 py-5">

    {step === "form" ? (
      <form
        onSubmit={handleSubmit}
        className="space-y-3.5"
      >
        {mode === "register" && (
          <FormField label="FULL NAME">
            <Input
              required
              value={formData.name}
              onChange={(e) =>
                updateField("name", e.target.value)
              }
              placeholder="e.g. Jhon Duo"
            />
          </FormField>
        )}

        <FormField label="EMAIL ADDRESS">
          <Input
            required
            type="email"
            value={formData.email}
            onChange={(e) => {
              updateField("email", e.target.value);
              setFieldErrors((prev) => ({
                ...prev,
                email: "",
              }));
            }}
            placeholder="jhonduo@gmail.com"
          />
          {fieldErrors.email && (
            <p className="mt-1 text-xs text-red-600">
              {fieldErrors.email}
            </p>
          )}
        </FormField>

        {mode === "register" && (
          <FormField label="WHATSAPP CONTACT NUMBER">
            <Input
              required
              type="tel"
              value={formData.phone}
              onChange={(e) =>
                updateField("phone", e.target.value)
              }
              placeholder="+91 12345 67890"
            />
          </FormField>
        )}

        <FormField label="PASSWORD">
          <div className="relative">
            <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#ad7632]">
              <LockKeyhole size={16} />
            </div>

            <Input
              required
              type={showPassword ? "text" : "password"}
              value={formData.passwordHash}
              onChange={(e) =>
                updateField("passwordHash", e.target.value)
              }
              placeholder="••••••••••••"
              className="pr-10 pl-9"
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword((prev) => !prev)
              }
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              {showPassword ? (
                <EyeOff size={16} />
              ) : (
                <Eye size={16} />
              )}
            </button>
          </div>
        </FormField>

        {error && (
          <p className="text-xs text-red-600">
            {error}
          </p>
        )}

        <Button
          type="submit"
          disabled={loading}
          className="mt-1 h-10 w-full rounded-full bg-[#f7bd20] text-[11px] font-bold tracking-wide text-[#4a0000] hover:bg-[#ffcc36]"
        >
          {loading
            ? "PLEASE WAIT..."
            : mode === "register"
              ? "REGISTER & JOIN VIP CLUB"
              : "SIGN IN TO VIP CLUB"}

          {!loading && <ArrowRight size={16} />}
        </Button>
      </form>
    ) : (
      /* OTP VERIFICATION */
      <form
        onSubmit={handleVerifyOtp}
        className="space-y-5"
      >
        <div className="text-center">
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-[#fff2cf]">
            <LockKeyhole
              size={25}
              className="text-[#8f590e]"
            />
          </div>

          <h3 className="font-serif text-xl font-bold text-[#580000]">
            Verify Your Email
          </h3>

          <p className="mt-2 text-xs text-[#a06b35]">
            We have sent a verification OTP to
          </p>

          <p className="mt-1 text-sm font-semibold text-[#580000]">
            {formData.email}
          </p>
        </div>

        <FormField label="ENTER OTP">
          <Input
            required
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={6}
            value={otp}
            onChange={(e) =>
              setOtp(e.target.value.replace(/\D/g, ""))
            }
            placeholder="Enter 6-digit OTP"
            className="h-12 text-center text-xl font-bold tracking-[0.5em]"
          />
        </FormField>

        {error && (
          <p className="text-center text-xs text-red-600">
            {error}
          </p>
        )}

        <Button
          type="submit"
          disabled={loading || otp.length !== 6}
          className="h-10 w-full rounded-full bg-[#f7bd20] text-[11px] font-bold text-[#4a0000] hover:bg-[#ffcc36]"
        >
          {loading ? "VERIFYING..." : "VERIFY OTP & JOIN"}
          {!loading && <ArrowRight size={16} />}
        </Button>

        <button
          type="button"
          onClick={() => {
            setStep("form");
            setOtp("");
            setError("");
          }}
          className="w-full text-center text-xs font-semibold text-[#8f590e] hover:underline"
        >
          Back to Registration
        </button>
      </form>
    )}

    <p className="mx-auto mt-5 max-w-85 text-center text-[9px] leading-3.5 text-[#a06b35]">
      By signing in, you unlock Silk Mark certificates,
      order tracking, and complimentary blouse tailoring
      privileges.
    </p>
  </div>
      </DialogContent>
    </Dialog>
  );
}

/* =============================================================
   FORM FIELD
============================================================= */

interface FormFieldProps {
  label: string;
  children: React.ReactNode;
}

function FormField({
  label,
  children,
}: FormFieldProps) {
  return (
    <div>
      <label className="mb-1.5 block text-[10px] font-bold tracking-wide text-[#4b2118]">
        {label}
      </label>
      {children}
    </div>
  );
}