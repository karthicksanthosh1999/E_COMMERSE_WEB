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

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import api from "@/lib/axios";

type AuthMode = "signin" | "register";

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AuthModal({
  open,
  onOpenChange,
}: AuthModalProps) {
  const [mode, setMode] = useState<AuthMode>("signin");
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    whatsapp: "",
    password: "",
  });

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      setMode("signin");
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

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = await api.post(`/api/user/login`, formData);
    console.log(data)
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

                <span className="font-serif text-[13px] font-bold text-[#f6c82c]">
                  SG
                </span>
              </div>

              <div>
                <h2 className="font-serif text-[18px] font-bold tracking-wide">
                  SRI GOWRI
                </h2>

                <p className="mt-0.5 text-[8px] font-bold tracking-[0.15em] text-[#f4c326]">
                  ROYAL CONNOISSEUR CLUB
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
        </div>

        {/* =====================================================
            BODY
        ====================================================== */}
        <div className="px-6 py-5">
          {/* Divider */}
          <div className="my-5 flex items-center gap-3">
            <div className="h-px flex-1 bg-[#eadfc9]" />

            <span className="whitespace-nowrap text-[9px] font-semibold text-[#bd9567]">
              OR CONTINUE WITH CREDENTIALS
            </span>

            <div className="h-px flex-1 bg-[#eadfc9]" />
          </div>

          {/* =================================================
              FORM
          ================================================== */}
          <form
            onSubmit={handleSubmit}
            className="space-y-3.5"
          >
            {/* Full Name */}
            {mode === "register" && (
              <FormField label="FULL NAME">
                <Input
                  value={formData.fullName}
                  onChange={(e) =>
                    updateField("fullName", e.target.value)
                  }
                  placeholder="e.g. Smt. Gayatri Devi"
                />
              </FormField>
            )}

            {/* Email */}
            <FormField label="EMAIL ADDRESS">
              <Input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  updateField("email", e.target.value)
                }
                placeholder="patron@royaltextiles.com"
              />
            </FormField>

            {/* WhatsApp */}
            {mode === "register" && (
              <FormField label="WHATSAPP CONTACT NUMBER">
                <Input
                  type="tel"
                  value={formData.whatsapp}
                  onChange={(e) =>
                    updateField("whatsapp", e.target.value)
                  }
                  placeholder="+91 98450 12345"
                />
              </FormField>
            )}

            {/* Password */}
            <FormField label="PASSWORD">
              <div className="relative">
                <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#ad7632]">
                  <LockKeyhole size={16} />
                </div>

                <Input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) =>
                    updateField("password", e.target.value)
                  }
                  placeholder="••••••••••••"
                  className="pr-10 pl-9"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword((prev) => !prev)
                  }
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                  className="
                    absolute
                    right-3
                    top-1/2
                    -translate-y-1/2
                    text-[#8f9aa7]
                    hover:text-[#5b1c0e]
                  "
                >
                  {showPassword ? (
                    <EyeOff size={16} />
                  ) : (
                    <Eye size={16} />
                  )}
                </button>
              </div>
            </FormField>

            {/* CTA */}
            <Button
              type="submit"
              className="
                mt-1
                h-10
                w-full
                rounded-full
                bg-[#f7bd20]
                text-[11px]
                font-bold
                tracking-wide
                text-[#4a0000]
                shadow-[0_4px_10px_rgba(150,90,0,0.15)]
                hover:bg-[#ffcc36]
              "
            >
              {mode === "register"
                ? "REGISTER & JOIN VIP CLUB"
                : "SIGN IN TO VIP CLUB"}

              <ArrowRight size={16} />
            </Button>
          </form>

          {/* =================================================
              FOOTNOTE
          ================================================== */}
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