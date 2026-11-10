
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  Heart,
  Eye,
  MessageCircle,
  Star,
  Loader2,
} from "lucide-react";
import { Product, Variant } from "@/types/productTypes";
import { useRouter } from "next/navigation";
import AuthModal from "./auth-model";
import { useSession } from "@/providers/AuthProviders";
import { formatCurrency } from "@/lib/format-currency";
import { Button } from "./ui/button";

interface ProductCardProps {
  product: Product;
  onAddToBag?: (product: Product, variant: Variant) => void;
  onQuickView: string;
}

const COLOR_MAP: Record<string, string> = {
  "royal blue": "#173B73",
  blue: "#244B82",
  gold: "#C9A23F",
  red: "#8B1717",
  maroon: "#500D0D",
  green: "#28613B",
  pink: "#E8A9B5",
  beige: "#B99A76",
  cream: "#F3E7C8",
  black: "#171717",
  white: "#FFFFFF",
  brown: "#89552E",
};

const ProductCard = ({
  product,
  onQuickView,
}: ProductCardProps) => {
  const navigate = useRouter();
  const { isAuthenticated, loading } = useSession()

  const [isWishlisted, setIsWishlisted] = useState(false);
  const [openAuthModel, setOpenAuthModel] = useState(false)

  // Get active variant
  const activeVariant =
    product.variants.find((variant) => variant.isActive) ??
    product.variants[0];

  // Get image matching the selected variant
  const currentImage =
    product.images.find(
      (image) => image.variantId === activeVariant?.id
    ) ?? product.images[0];

  // Calculate discount
  const discount =
    activeVariant && activeVariant.mrp > activeVariant.price
      ? Math.round(
          ((activeVariant.mrp - activeVariant.price) /
            activeVariant.mrp) *
            100
        )
      : 0;

  // Calculate average rating
  const reviewCount = product.reviews.length;

  const averageRating =
    reviewCount > 0
      ? product.reviews.reduce(
          (total, review) => total + review.rating,
          0
        ) / reviewCount
      : 0;

  // Get variant color
  const color =
    typeof activeVariant?.attributes.color === "string"
      ? activeVariant.attributes.color
      : undefined;

  const colorHex = color
    ? COLOR_MAP[color.toLowerCase()] ?? "#B99A76"
    : undefined;

  const whatsappMessage = () => {    
    // 1. Get your product image URL
    const imageUrl = product?.images?.[0].url || 'https://yourwebsite.com';

    // 2. Build the message with the image link at the bottom
    const message = encodeURIComponent(
      `Hello Sri Gowri Royal Textiles!\n` +
      `I am interested in buying:\n` +
      `*${product?.title}* (${product?.description})\n` +
      `Price: ₹${100}\n\n` +
      `Quantity: 1 \n\n`+
      `Product Image: ${imageUrl}\n\n` + // <-- WhatsApp will generate a preview here
      `Could you please share more high-res photos/video drape and estimated delivery date?`
    );
    
    window.open(`https://wa.me/${process.env.NEXT_PUBLIC_CLIENT_MOBILE_NO}?text=${message}`, '_blank');
  }

  return (
    <div className="group overflow-hidden h-auto w-75 md:w-87.5 z-0 rounded-2xl border border-[#e9d9a9] bg-[#fffefa] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* Product Image */}
      <div className="relative aspect-3/4 overflow-hidden bg-[#f5f0e7]">
        {currentImage?.url && (
          <Image
            src={currentImage.url}
            alt={currentImage.altText ?? "N/A"}
            fill
            sizes="
            (max-width: 640px) 100vw,
            (max-width: 1024px) 50vw,
            40vw
          "
          className="
            object-cover
            transition-transform
            duration-500
            ease-in-out
            sm:group-hover:scale-105
          "
          />
        )}

        {/* Image Overlay */}
        <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/15" />

        {/* Wishlist */}
        <button
          type="button"
          onClick={() => setIsWishlisted((prev) => !prev)}
          aria-label="Toggle wishlist"
          className="absolute right-3 top-3 z-10 flex size-9 items-center justify-center rounded-full bg-white shadow-md"
        >
          <Heart
            size={18}
            className={
              isWishlisted
                ? "fill-red-500 text-red-500"
                : "text-[#4b1711]"
            }
          />
        </button>

        {/* Discount */}
        {discount > 0 && (
          <div className="absolute left-3 top-3 rounded-md bg-[#480906] px-3 py-1 text-[10px] font-bold text-[#ffe34b]">
            {discount}% OFF
          </div>
        )}

        {/* Quick View */}
        <button
          type="button"
          onClick={() => navigate.push(onQuickView)}
          className="absolute left-1/2 top-1/2 flex cursor-pointer -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs font-semibold text-[#4b1711] opacity-0 shadow-lg transition-all duration-300 hover:bg-[#4b1711] hover:text-white group-hover:opacity-100"
        >
          <Eye size={15} />
          Quick View
        </button>
      </div>

      {/* Product Information */}
      <div className="p-3.5">

        {/* SKU and Rating */}
        <div className="mb-2 flex items-center justify-between gap-2">

          <span className="text-[10px] font-semibold tracking-widest text-[#7d3b18]">
            {activeVariant?.sku ?? "N/A"}
          </span>

          <div className="flex items-center gap-1 whitespace-nowrap">
            <Star
              size={14}
              className="fill-[#f6c32c] text-[#f6c32c]"
            />

            <span className="text-xs font-bold text-[#24120e]">
              {averageRating.toFixed(2)}
            </span>

            <span className="text-[9px] text-gray-500">
              ({reviewCount})
            </span>
          </div>
        </div>

        {/* Title */}
        <Link href={`/dresses/${product.slug}`}>
          <h3 className="truncate text-sm font-bold text-[#400d09] hover:text-[#9b5c20]">
            {product.title}
          </h3>
        </Link>

        {/* Description */}
        <p className="mt-1 line-clamp-1 text-[11px] text-[#936e4c]">
          {product.description}
        </p>

        {/* Color */}
        <div className="mt-3 flex items-center gap-2">
          {colorHex && (
            <>
              <span
                title={color}
                className="size-3.5 rounded-full border border-black/10"
                style={{ backgroundColor: colorHex }}
              />

              <span className="text-[10px] text-[#ad875c]">
                {color}
              </span>
            </>
          )}
        </div>

        <div className="my-3 border-t border-[#eee3ce]" />

        {/* Price */}
        <div className="flex items-center gap-2">
          {activeVariant && (
            <>
              <span className="text-lg font-extrabold text-[#400d09]">
                {formatCurrency(activeVariant.price)}
              </span>

              {activeVariant.mrp > activeVariant.price && (
                <span className="text-xs text-gray-400 line-through">
                  {formatCurrency(activeVariant.mrp)}
                </span>
              )}
            </>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-4 grid gap-2">
          {
            isAuthenticated ? (
          <Button
            onClick={whatsappMessage}
            variant={'default'}
            className="flex items-center justify-center gap-1.5 rounded-xl border border-brand-gold bg-emerald-50 py-2 text-[11px] font-semibold text-emerald-800 transition hover:bg-emerald-100 cursor-pointer"
          >
            <MessageCircle size={14} />
            WhatsApp
          </Button>
            ) : (  <button
            type="button"
            disabled={!activeVariant}
            className="flex items-center justify-center gap-1.5 rounded-xl bg-[#490c08] py-2 text-[11px] font-semibold text-brand-gold transition hover:bg-[#701810] disabled:opacity-50 cursor-pointer"
          >
            {loading ? <span className="flex items-center gap-1"><Loader2 className="animate-spin"/>Loading...</span> : "Login First"}
          </button>)
          }
          <AuthModal onOpenChange={setOpenAuthModel} open={openAuthModel} />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
