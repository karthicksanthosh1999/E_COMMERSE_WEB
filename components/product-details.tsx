"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Heart,
  Minus,
  Plus,
  ShoppingBag,
  Star,
  Truck,
  ShieldCheck,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Product } from "@/types/productTypes";
import { DUMMY_PRODUCTS } from "@/data/products";
import { useParams } from "next/navigation";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductDetails() {

  const { slug } = useParams();
  const product = DUMMY_PRODUCTS.find((item) => item.id === slug) ?? [];

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const [zoom, setZoom] = useState({
    active: false,
    x: 50,
    y: 50,
  });

  const variant = product.variants.find(
    (item) => item.isActive
  );

  const images = product.images;

  const attributes = product.attributes as {
    fabric?: string;
    weave?: string;
    occasion?: string;
  };

  const variantAttributes = variant?.attributes as {
    color?: string;
    zariColor?: string;
  };

  const reviewCount = product.reviews.length;

  const averageRating =
    reviewCount > 0
      ? product.reviews.reduce(
          (total, review) => total + review.rating,
          0
        ) / reviewCount
      : 0;

  const discount =
    variant && variant.mrp > variant.price
      ? Math.round(
          ((variant.mrp - variant.price) / variant.mrp) * 100
        )
      : 0;

  const currentImage = images[selectedImage];

  const handleMouseMove = (
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    const rect = event.currentTarget.getBoundingClientRect();

    const x =
      ((event.clientX - rect.left) / rect.width) * 100;

    const y =
      ((event.clientY - rect.top) / rect.height) * 100;

    setZoom({
      active: true,
      x,
      y,
    });
  };

  const handleMouseLeave = () => {
    setZoom((prev) => ({
      ...prev,
      active: false,
    }));
  };

  const nextImage = () => {
    if (images.length === 0) return;

    setSelectedImage((current) =>
      current === images.length - 1 ? 0 : current + 1
    );
  };

  const previousImage = () => {
    if (images.length === 0) return;

    setSelectedImage((current) =>
      current === 0 ? images.length - 1 : current - 1
    );
  };

  const increaseQuantity = () => {
    setQuantity((current) => current + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((current) =>
      current > 1 ? current - 1 : 1
    );
  };

  if (!variant) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-20">
        <p className="text-center text-muted-foreground">
          This product is currently unavailable.
        </p>
      </div>
    );
  }

  return (
    <main className="bg-[#fffaf2]">

      {/* =====================================================
          PRODUCT SECTION
      ====================================================== */}

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-14">

        {/* Breadcrumb */}
        <div className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
          <span>Home</span>
          <span>/</span>
          <span>Sarees</span>
          <span>/</span>

          <span className="truncate text-[#5a0000]">
            {product.title}
          </span>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">

          {/* =================================================
              LEFT IMAGE GALLERY
          ================================================== */}

          <div className="flex flex-col-reverse gap-4 sm:flex-row">

            {/* Thumbnails */}
            <div className="flex gap-3 overflow-x-auto sm:w-[85px] sm:flex-col sm:overflow-visible">
              {images.map((image, index) => (
                <button
                  key={image.id}
                  type="button"
                  onClick={() => setSelectedImage(index)}
                  className={`
                    relative
                    h-[75px]
                    w-[65px]
                    shrink-0
                    overflow-hidden
                    rounded-lg
                    border-2
                    bg-white
                    transition-all
                    ${
                      selectedImage === index
                        ? "border-[#c99b19] ring-1 ring-[#c99b19]"
                        : "border-transparent hover:border-[#d9b55a]"
                    }
                  `}
                >
                  <Image
                    src={image.url}
                    alt={image.altText ?? product.title}
                    fill
                    sizes="65px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Main Image */}
            <div className="min-w-0 flex-1">

              <div
                className="
                  group
                  relative
                  aspect-[4/5]
                  overflow-hidden
                  rounded-2xl
                  border
                  border-[#eadfc8]
                  bg-white
                "
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >

                {currentImage ? (
                  <Image
                    src={currentImage.url}
                    alt={
                      currentImage.altText ??
                      product.title
                    }
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className={`
                      object-cover
                      transition-transform
                      duration-200
                      ease-out
                      ${
                        zoom.active
                          ? "scale-[2]"
                          : "scale-100"
                      }
                    `}
                    style={{
                      transformOrigin: `${zoom.x}% ${zoom.y}%`,
                    }}
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-muted-foreground">
                    No image available
                  </div>
                )}

                {/* Zoom Indicator */}
                <div
                  className="
                    pointer-events-none
                    absolute
                    bottom-4
                    right-4
                    flex
                    items-center
                    gap-2
                    rounded-full
                    bg-white/90
                    px-3
                    py-2
                    text-xs
                    font-medium
                    text-[#5a0000]
                    shadow-sm
                    backdrop-blur
                  "
                >
                  <ZoomIn size={15} />
                  Hover to zoom
                </div>

                {/* Navigation */}
                {images.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={previousImage}
                      aria-label="Previous image"
                      className="
                        absolute
                        left-4
                        top-1/2
                        flex
                        h-10
                        w-10
                        -translate-y-1/2
                        items-center
                        justify-center
                        rounded-full
                        bg-white/90
                        text-[#5a0000]
                        shadow-md
                        transition
                        hover:bg-white
                      "
                    >
                      <ChevronLeft size={20} />
                    </button>

                    <button
                      type="button"
                      onClick={nextImage}
                      aria-label="Next image"
                      className="
                        absolute
                        right-4
                        top-1/2
                        flex
                        h-10
                        w-10
                        -translate-y-1/2
                        items-center
                        justify-center
                        rounded-full
                        bg-white/90
                        text-[#5a0000]
                        shadow-md
                        transition
                        hover:bg-white
                      "
                    >
                      <ChevronRight size={20} />
                    </button>
                  </>
                )}
              </div>

              {/* Mobile Image Count */}
              <div className="mt-3 text-center text-xs text-muted-foreground sm:hidden">
                {selectedImage + 1} / {images.length}
              </div>
            </div>
          </div>

          {/* =================================================
              RIGHT PRODUCT DETAILS
          ================================================== */}

          <div className="flex flex-col">

            {/* Brand */}
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#b38716]">
              Sri Gowri Royal Textiles
            </p>

            {/* Title */}
            <h1 className="mt-2 font-serif text-3xl font-bold leading-tight text-[#4b0000] sm:text-4xl">
              {product.title}
            </h1>

            {/* Rating */}
            <div className="mt-4 flex flex-wrap items-center gap-3">

              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={17}
                    className={
                      star <= Math.round(averageRating)
                        ? "fill-[#e9b820] text-[#e9b820]"
                        : "text-[#d7c8aa]"
                    }
                  />
                ))}
              </div>

              <span className="text-sm font-semibold text-[#4b0000]">
                {averageRating.toFixed(1)}
              </span>

              <span className="text-sm text-muted-foreground">
                ({reviewCount}{" "}
                {reviewCount === 1
                  ? "Review"
                  : "Reviews"})
              </span>
            </div>

            <Separator className="my-6" />

            {/* Description */}
            <p className="text-[15px] leading-7 text-[#66594d]">
              {product.description}
            </p>

            {/* Product Attributes */}
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">

              <InfoBox
                label="Fabric"
                value={attributes.fabric}
              />

              <InfoBox
                label="Weave"
                value={attributes.weave}
              />

              <InfoBox
                label="Occasion"
                value={attributes.occasion}
              />

            </div>

            {/* Color */}
            {variantAttributes.color && (
              <div className="mt-6">
                <p className="text-sm font-semibold text-[#4b0000]">
                  Color
                </p>

                <div className="mt-2 flex items-center gap-2">
                  <span className="text-sm text-[#66594d]">
                    {variantAttributes.color}
                  </span>

                  {variantAttributes.zariColor && (
                    <>
                      <span className="text-[#c9bba2]">
                        •
                      </span>

                      <span className="text-sm text-[#66594d]">
                        {variantAttributes.zariColor} Zari
                      </span>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Price */}
            <div className="mt-7 rounded-xl bg-[#fff5dc] p-5">

              <div className="flex flex-wrap items-center gap-3">

                <span className="text-3xl font-bold text-[#5a0000]">
                  ₹{variant.price.toLocaleString("en-IN")}
                </span>

                <span className="text-base text-muted-foreground line-through">
                  ₹{variant.mrp.toLocaleString("en-IN")}
                </span>

                {discount > 0 && (
                  <Badge className="bg-[#5a0000] text-[#f9cf47] hover:bg-[#5a0000]">
                    {discount}% OFF
                  </Badge>
                )}
              </div>

              <p className="mt-1 text-xs text-[#9b7955]">
                Inclusive of all taxes
              </p>
            </div>

            {/* SKU */}
            <div className="mt-5 text-xs text-muted-foreground">
              SKU:{" "}
              <span className="font-medium text-[#5a0000]">
                {variant.sku}
              </span>
            </div>

            {/* Quantity */}
            <div className="mt-6 flex items-center gap-4">

              <span className="text-sm font-semibold text-[#4b0000]">
                Quantity
              </span>

              <div className="flex h-10 items-center rounded-full border border-[#d9c8a5] bg-white">

                <button
                  type="button"
                  onClick={decreaseQuantity}
                  className="flex h-full w-10 items-center justify-center text-[#5a0000] hover:bg-[#fff5dc]"
                >
                  <Minus size={15} />
                </button>

                <span className="w-8 text-center text-sm font-semibold">
                  {quantity}
                </span>

                <button
                  type="button"
                  onClick={increaseQuantity}
                  className="flex h-full w-10 items-center justify-center text-[#5a0000] hover:bg-[#fff5dc]"
                >
                  <Plus size={15} />
                </button>

              </div>
            </div>

            {/* Actions */}
            <div className="mt-7 flex gap-3">

              <Button
                className="
                  h-12
                  flex-1
                  rounded-full
                  bg-[#5a0000]
                  font-semibold
                  text-[#fff4d5]
                  hover:bg-[#720000]
                "
              >
                <ShoppingBag size={18} />
                Add to Cart
              </Button>

              <Button
                className="
                  h-12
                  flex-1
                  rounded-full
                  bg-[#f5c326]
                  font-semibold
                  text-[#4b0000]
                  hover:bg-[#ffd84c]
                "
              >
                Buy Now
              </Button>

              <button
                type="button"
                onClick={() =>
                  setIsWishlisted((current) => !current)
                }
                aria-label="Add to wishlist"
                className="
                  flex
                  h-12
                  w-12
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-[#d7c397]
                  bg-white
                  transition
                  hover:border-[#b38716]
                "
              >
                <Heart
                  size={20}
                  className={
                    isWishlisted
                      ? "fill-[#8a0000] text-[#8a0000]"
                      : "text-[#5a0000]"
                  }
                />
              </button>

            </div>

            {/* Benefits */}
            <div className="mt-7 grid gap-4 border-t border-[#eadfc8] pt-6 sm:grid-cols-3">

              <Benefit
                icon={<Truck size={18} />}
                title="Fast Delivery"
                description="Worldwide shipping"
              />

              <Benefit
                icon={<ShieldCheck size={18} />}
                title="Authentic Silk"
                description="Certified quality"
              />

              <Benefit
                icon={<RotateCcw size={18} />}
                title="Easy Returns"
                description="7 day returns"
              />

            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          REVIEWS
      ====================================================== */}

      <section className="border-t border-[#eadfc8] bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">

          <h2 className="font-serif text-2xl font-bold text-[#4b0000]">
            Customer Reviews
          </h2>

          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">

            {product.reviews.map((review) => (
              <div
                key={review.id}
                className="rounded-xl border border-[#eadfc8] bg-[#fffaf2] p-5"
              >
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={14}
                      className={
                        star <= review.rating
                          ? "fill-[#e9b820] text-[#e9b820]"
                          : "text-[#d7c8aa]"
                      }
                    />
                  ))}
                </div>

                <p className="mt-3 text-sm leading-6 text-[#66594d]">
                  {review.comment}
                </p>
              </div>
            ))}

          </div>
        </div>
      </section>

    </main>
  );
}

/* =============================================================
   INFO BOX
============================================================= */

function InfoBox({
  label,
  value,
}: {
  label: string;
  value?: string;
}) {
  return (
    <div className="rounded-lg border border-[#eadfc8] bg-white px-4 py-3">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-[#a58c67]">
        {label}
      </p>

      <p className="mt-1 text-sm font-semibold text-[#4b0000]">
        {value ?? "—"}
      </p>
    </div>
  );
}

/* =============================================================
   BENEFIT
============================================================= */

function Benefit({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#fff5dc] text-[#b38716]">
        {icon}
      </div>

      <div>
        <p className="text-xs font-bold text-[#4b0000]">
          {title}
        </p>

        <p className="mt-0.5 text-[11px] text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  );
}