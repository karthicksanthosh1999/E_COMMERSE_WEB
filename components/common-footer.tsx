"use client";

import Link from "next/link";
import {
  MapPin,
  MessageCircle,
  ShieldCheck,
  Award,
} from "lucide-react";

const heritageLinks = [
  "Pure Kanjeevaram Pattu",
  "Banarasi Katan Silk",
  "Patan Double Ikat Patola",
  "Chanderi Zari Tissue",
  "Bhagalpur Wild Tussar",
  "Kalamkari Handblock Cottons",
];

const conciergeLinks = [
  "WhatsApp Live Stylist",
  "Book Video Draping Call",
  "Custom Blouse Tailoring",
  "Worldwide Express Dispatch",
  "Saree Care & Muslin Storage",
  "Silk Mark Purity Verification",
];

const heritageServices = [
  "Weaver Alliance Charter",
  "Fair Pay Loom Pledge",
  "Natural Vegetable Dyes",
  "GI Tag Certification",
  "Bridal Trousseau Planning",
];

export default function Footer() {
  return (
    <footer className="border-t border-[#9a6c00] bg-[#350000] text-[#f9e8cf]">
      <div className="mx-auto max-w-full px-5 sm:px-8">

        {/* =====================================================
            NEWSLETTER
        ====================================================== */}
        <section className="pt-14 pb-12">
          <div className="rounded-[24px] border border-[#a77809] bg-[#520000] px-7 py-8 sm:px-8 lg:px-8">
            <div className="flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">

              {/* Text */}
              <div>
                <h2 className="font-serif text-2xl font-bold text-[#fff4d2] sm:text-[27px]">
                  Subscribe to Sri Gowri Royal Weekly
                </h2>

                <p className="mt-1 max-w-150 text-sm leading-5 text-[#f0d9aa]">
                  Receive private preview alerts of rare heirloom weaves,
                  seasonal bridal showcases,
                  <br className="hidden sm:block" />
                  and VIP festival privilege promo codes.
                </p>
              </div>

              {/* Form */}
              <form
                onSubmit={(e) => e.preventDefault()}
                className="flex w-full max-w-86.25 items-center gap-2"
              >
                <input
                  type="email"
                  placeholder="Enter your email address..."
                  aria-label="Email address"
                  className="
                    h-12
                    min-w-0
                    flex-1
                    rounded-full
                    border
                    border-[#b88915]
                    bg-transparent
                    px-5
                    text-sm
                    text-[#fff4d2]
                    outline-none
                    placeholder:text-[#c18d4b]
                    focus:border-[#f6c72b]
                  "
                />

                <button
                  type="submit"
                  className="
                    h-12
                    rounded-full
                    bg-[#f7c324]
                    px-7
                    text-sm
                    font-bold
                    text-[#350000]
                    transition-all
                    hover:bg-[#ffd94c]
                    hover:scale-[1.02]
                  "
                >
                  Join
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* =====================================================
            MAIN FOOTER
        ====================================================== */}
        <section className="pb-12">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.25fr_1.15fr_1.25fr_1fr_1.15fr] lg:gap-8">

            {/* =================================================
                BRAND
            ================================================== */}
            <div>
              <Link
                href="/"
                className="inline-flex items-center gap-3"
              >
                {/* Logo */}
                <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#e2b51e]">
                  <div className="absolute inset-0.75 rounded-full border border-[#e2b51e]" />

                  <span className="font-serif text-sm font-bold text-[#f7c928]">
                    SG
                  </span>
                </div>

                <div>
                  <h3 className="font-serif text-lg font-bold tracking-wide text-[#fff3d0]">
                    SRI GOWRI
                  </h3>

                  <p className="text-[8px] font-bold tracking-[0.22em] text-[#d9a91a]">
                    CK ROYAL TEXTILES
                  </p>
                </div>
              </Link>

              <p className="mt-5 max-w-61.25 text-[13px] leading-4.75 text-[#d9aa72]">
                Celebrating four decades of authentic handloom silk artistry.
                Curating certified Kanjeevaram, Banarasi, and designer sarees
                directly from generational master looms.
              </p>

              {/* Address */}
              <div className="mt-5 flex items-start gap-2 text-[12px] font-medium leading-4.25 text-[#f1bd20]">
                <MapPin
                  size={17}
                  className="mt-0.5 shrink-0"
                  strokeWidth={1.8}
                />

                <span>
                  Flagship Boutique: Raja Street,
                  <br />
                  Coimbatore & Kanchipuram
                </span>
              </div>
            </div>

            {/* =================================================
                HERITAGE WEAVES
            ================================================== */}
            <FooterColumn
              title="HERITAGE WEAVES"
              links={heritageLinks}
            />

            {/* =================================================
                CONCIERGE SERVICE
            ================================================== */}
            <FooterColumn
              title="CONCIERGE SERVICE"
              links={conciergeLinks}
              iconFirst
            />

            {/* =================================================
                OUR HERITAGE
            ================================================== */}
            <FooterColumn
              title="OUR HERITAGE"
              links={heritageServices}
            />

            {/* =================================================
                TRUST & AUTHENTICITY
            ================================================== */}
            <div>
              <h3 className="font-serif text-[15px] font-bold tracking-wide text-[#f5c324]">
                TRUST & AUTHENTICITY
              </h3>

              {/* 100% Silk */}
              <div className="mt-5 flex gap-3">
                <Award
                  size={18}
                  className="mt-0.5 shrink-0 text-[#f5c324]"
                  strokeWidth={1.6}
                />

                <div>
                  <p className="text-[12px] font-bold text-[#fff0c7]">
                    100% Silk Mark
                  </p>

                  <p className="text-[10px] text-[#bd8c58]">
                    Government certified purity
                  </p>
                </div>
              </div>

              {/* Direct from loom */}
              <div className="mt-5 flex gap-3">
                <ShieldCheck
                  size={18}
                  className="mt-0.5 shrink-0 text-[#f5c324]"
                  strokeWidth={1.6}
                />

                <div>
                  <p className="text-[12px] font-bold text-[#fff0c7]">
                    Direct From Loom
                  </p>

                  <p className="text-[10px] text-[#bd8c58]">
                    Zero intermediary markup
                  </p>
                </div>
              </div>

              {/* WhatsApp Card */}
              <div className="mt-5 rounded-xl border border-[#a77809] bg-[#4a0000] px-3 py-3">
                <p className="text-[11px] font-bold text-[#f5c324]">
                  WhatsApp Concierge Desk
                </p>

                <p className="mt-1 text-[9px] leading-4 text-[#efd8a8]">
                  Mon - Sun: 9:00 AM - 9:00 PM IST
                </p>

                <p className="text-[9px] font-medium text-[#f5c324]">
                  +91 98450 12345
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            BOTTOM BAR
        ====================================================== */}
        <section className="border-t border-[#704a05] py-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

            {/* Payments */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="mr-1 text-[11px] font-bold text-[#dcae1b]">
                ACCEPTED PAYMENTS:
              </span>

              <PaymentBadge text="UPI / GPay" />
              <PaymentBadge text="VISA" />
              <PaymentBadge text="Mastercard" />
              <PaymentBadge text="Apple Pay" />
              <PaymentBadge text="Bank Transfer" />
            </div>

            {/* Copyright */}
            <p className="text-[10px] leading-5 text-[#a97646] lg:text-right">
              © 2026 Sri Gowri - CK Royal Textiles • Fashion. All rights
              reserved. Cultivating royal elegance, honoring handloom
              traditions.
            </p>
          </div>
        </section>
      </div>
    </footer>
  );
}

/* =============================================================
   FOOTER COLUMN
============================================================= */

interface FooterColumnProps {
  title: string;
  links: string[];
  iconFirst?: boolean;
}

function FooterColumn({
  title,
  links,
  iconFirst = false,
}: FooterColumnProps) {
  return (
    <div>
      <h3 className="font-serif text-[15px] font-bold tracking-wide text-[#f5c324]">
        {title}
      </h3>

      <ul className="mt-4 space-y-2">
        {links.map((link) => (
          <li key={link}>
            <Link
              href="#"
              className="
                flex
                items-center
                gap-2
                text-[12px]
                leading-4.5
                text-[#e5c995]
                transition-colors
                hover:text-[#f5c324]
              "
            >
              {iconFirst && link === "WhatsApp Live Stylist" && (
                <MessageCircle
                  size={14}
                  className="text-[#20c967]"
                  strokeWidth={1.7}
                />
              )}

              {link}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* =============================================================
   PAYMENT BADGE
============================================================= */

function PaymentBadge({ text }: { text: string }) {
  return (
    <span
      className="
        rounded-lg
        bg-[#fff1c9]
        px-2
        py-0.75
        text-[9px]
        font-bold
        leading-none
        text-[#350000]
      "
    >
      {text}
    </span>
  );
}