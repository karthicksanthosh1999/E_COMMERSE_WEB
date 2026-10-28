"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Heart,
  ShoppingBag,
  Plus,
  Menu,
  X,
  Sparkles,
  MessageCircle,
  Phone,
  Circle,
} from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Home", href: "/home" },
  { label: "Dresses", href: "/dresses"},
  { label: "Fruits & Vegs", href: "/grocery" },
  { label: "Automobiles", href: "/automobiles" },
];

export default function Header() {
  
  const currentPage = usePathname();

  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="w-full">
      {/* ================= TOP BAR ================= */}
      <div className="hidden h-9 bg-[#350000] px-6 text-[13px] font-medium text-[#f7c928] lg:flex items-center justify-between tracking-wide">
        {/* Left */}
        <div className="flex items-center gap-2 whitespace-nowrap">
          <Sparkles size={14} strokeWidth={1.8} />

          <span>
            ESTD. 1982
          </span>

          <span className="opacity-60">•</span>

          <span>
            KANCHIPURAM & VARANASI WEAVER COLLECTIVE
          </span>
        </div>

        {/* Center */}
        <div className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap">
          TRADITION • QUALITY • STYLE&nbsp; | &nbsp;YOUR SAREE, YOUR STYLE
        </div>

        {/* Right */}
        <div className="flex items-center gap-5 whitespace-nowrap">
          <Link
            href="/video-shopping"
            className="flex items-center gap-1 underline underline-offset-2 hover:text-white transition-colors"
          >
            <Phone size={13} />
            Book Live Video Shopping
          </Link>

          <span className="opacity-60">•</span>

          <div className="flex items-center gap-1">
            <MessageCircle size={14} />
            WhatsApp: +91 98450 12345
          </div>
        </div>
      </div>

      {/* ================= MAIN NAV ================= */}
      <div className="relative bg-[#520000] text-[#fff5d6]">
        <div className="mx-auto flex h-20 max-w-[1920px] items-center px-5 sm:px-8 lg:px-9">
          
          {/* LOGO */}
          <Link
            href="/"
            className="flex shrink-0 items-center gap-4"
          >
            {/* SG Circle */}
            <div className="relative flex h-[66px] w-[66px] items-center justify-center rounded-full border border-[#e7b91f]">
              <div className="absolute inset-[4px] rounded-full border border-[#e7b91f]" />

              <span className="font-serif text-[23px] font-bold text-[#f7d35c]">
                SG
              </span>
            </div>

            {/* Brand name */}
            <div className="hidden sm:block">
              <h1 className="font-serif text-[25px] font-bold tracking-wide text-[#fff5d6]">
                SRI GOWRI
              </h1>

              <p className="mt-0.5 text-[10px] font-bold tracking-[0.32em] text-[#e5b928]">
                CK ROYAL TEXTILES
                <span className="mx-2">•</span>
                FASHION
              </p>
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="ml-auto hidden items-center gap-7 lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`group flex items-center gap-1 text-[14px] font-semibold transition-colors ${
                  item.href === currentPage
                    ? "text-[#f5c525]"
                    : "text-[#f9e8cf] hover:text-[#f5c525]"
                }`}
              >
                {item.href === currentPage && (
                  <Circle
                    size={9}
                    fill="currentColor"
                    strokeWidth={0}
                  />
                )}

                {item.label}
              </Link>
            ))}
          </nav>

          {/* ACTIONS */}
          <div className="ml-7 hidden items-center gap-4 lg:flex">
            {/* Wishlist */}
            <button
              type="button"
              aria-label="Wishlist"
              className="transition-transform hover:scale-110"
            >
              <Heart
                size={31}
                strokeWidth={1.6}
                className="text-[#fff1c9]"
              />
            </button>

            {/* Cart */}
            <button
              type="button"
              aria-label="Shopping cart"
              className="flex h-12 items-center gap-2 rounded-full border border-[#cda71d] px-5 text-[#f7c928] transition-colors hover:bg-[#650707]"
            >
              <ShoppingBag size={15} strokeWidth={1.8} />
              <span className="font-bold">₹0</span>
            </button>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="ml-auto flex h-11 w-11 items-center justify-center rounded-full border border-[#e8bd2b] lg:hidden"
          >
            {mobileOpen ? (
              <X size={23} />
            ) : (
              <Menu size={23} />
            )}
          </button>
        </div>

        {/* ================= MOBILE MENU ================= */}
        {mobileOpen && (
          <div className="border-t border-[#711010] bg-[#430000] px-5 py-6 lg:hidden">
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-2 rounded-lg px-4 py-3 text-[16px] font-semibold transition-colors hover:bg-[#5c0909] ${
                    item.href === currentPage
                      ? "text-[#f5c525]"
                      : "text-[#f9e8cf]"
                  }`}
                >
                  {item.href === currentPage && (
                    <Circle
                      size={8}
                      fill="currentColor"
                      strokeWidth={0}
                    />
                  )}

                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Mobile Actions */}
            <div className="mt-5 flex flex-col gap-3 border-t border-[#711010] pt-5">
              <Link
                href="/sarees"
                className="flex h-12 items-center justify-center rounded-full border border-[#e8bd2b] font-bold text-[#fff5d6]"
              >
                Shop Sarees
              </Link>

              <Link
                href="/products/add"
                className="flex h-12 items-center justify-center gap-2 rounded-full bg-[#f7c324] font-bold text-[#3d0000]"
              >
                <Plus size={19} />
                Add Products
              </Link>

              <div className="flex items-center justify-center gap-8 pt-2">
                <button
                  type="button"
                  aria-label="Wishlist"
                  className="flex items-center gap-2 text-[#fff1c9]"
                >
                  <Heart size={24} />
                  Wishlist
                </button>

                <button
                  type="button"
                  aria-label="Shopping cart"
                  className="flex items-center gap-2 text-[#f7c928]"
                >
                  <ShoppingBag size={23} />
                  ₹0
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}