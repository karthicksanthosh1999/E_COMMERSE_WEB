"use client";

import { useState } from "react";
import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  User,
  X,
  Phone,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

type AuthMode = "signin" | "register";

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AuthModal({
  open,
  onOpenChange,
}: AuthModalProps) {
  const [mode, setMode] = useState<AuthMode>("register");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    whatsapp: "",
    password: "",
  });

  const updateField = (
    field: keyof typeof formData,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log({
      mode,
      ...formData,
      rememberMe,
    });
  };

  const handleDemoLogin = (user: "vip" | "patron") => {
    if (user === "vip") {
      setFormData({
        fullName: "Karthick",
        email: "karthick@example.com",
        whatsapp: "+91 98450 12345",
        password: "password123",
      });
    } else {
      setFormData({
        fullName: "Priyadarshini",
        email: "priyadarshini@example.com",
        whatsapp: "+91 98450 12345",
        password: "password123",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="
          w-[calc(100%-24px)]
          max-w-[420px]
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
                  h-[38px]
                  w-[38px]
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-[#e6b51e]
                "
              >
                <div className="absolute inset-[3px] rounded-full border border-[#e6b51e]" />

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
              onClick={() => onOpenChange(false)}
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
          <div className="mt-5 flex h-[36px] rounded-full border border-[#a87911] bg-[#350000] p-[3px]">

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
                  icon={<User size={16} />}
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
                icon={<Mail size={16} />}
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
                  icon={<Phone size={16} />}
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

            {/* Remember + Encryption */}
            <div className="flex items-center justify-between pt-0.5">

              <label className="flex cursor-pointer items-center gap-2">
                <Checkbox
                  checked={rememberMe}
                  onCheckedChange={(checked) =>
                    setRememberMe(checked === true)
                  }
                  className="
                    h-[15px]
                    w-[15px]
                    rounded-[2px]
                    border-[#8c1a0c]
                    data-[state=checked]:border-[#680000]
                    data-[state=checked]:bg-[#680000]
                  "
                />

                <span className="text-[10px] text-[#a06b35]">
                  Remember on this device
                </span>
              </label>

              <div className="flex items-center gap-1 text-[9px] text-[#328378]">
                <ShieldCheck size={13} />
                256-bit Encrypted
              </div>
            </div>

            {/* CTA */}
            <Button
              type="submit"
              className="
                mt-1
                h-[40px]
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
          <p className="mx-auto mt-5 max-w-[340px] text-center text-[9px] leading-[14px] text-[#a06b35]">
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