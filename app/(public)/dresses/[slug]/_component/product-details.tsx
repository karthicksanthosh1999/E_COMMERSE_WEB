"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Heart,
  ShoppingBag,
  MessageCircle,
  Star,
  ShieldCheck,
  Truck,
  RotateCcw,
  Minus,
  Plus,
  Check,
  ChevronRight,
  Package
} from "lucide-react";

import type { Product, ProductImage } from "@/types/productTypes";
import Link from "next/link";
import { DUMMY_PRODUCTS } from "@/data/products"

const getAttribute = (
  attributes: Record<string, unknown> | undefined,
  key: string
): string => {
  const value = attributes?.[key];

  if (value === undefined || value === null) {
    return "";
  }

  return String(value);
};

const formatPrice = (price: number): string =>
  `₹${price.toLocaleString("en-IN")}`;

const ProductDetails = ({ slug } : { slug: string} ) => {

 const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariantId, setSelectedVariantId] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [addedSuccess, setAddedSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const variants = useMemo(
    () => product?.variants.filter((variant) => variant.isActive) ?? [],
    [product]
  );

useEffect(() => {
  const fetchProduct = async () => {
    try {
      setLoading(true);
      setError(null);
        console.log('product', slug)
      const productData = DUMMY_PRODUCTS.find(
        (item) => item.slug === slug
      );

      if (!productData) {
        throw new Error("Product not found");
      }

      setProduct(productData);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong"
      );
      setProduct(null);
    } finally {
      setLoading(false);
    }
  };

  if (slug) {
    fetchProduct();
  }
}, [slug]);

  const selectedVariant = variants.find(
    (variant) => variant.id === selectedVariantId
  ) ?? variants[0];

  const gallery: ProductImage[] = useMemo(() => {
    if (!product) return [];

    const variantImages = product.images.filter(
      (image) =>
        image.variantId === selectedVariant?.id
    );

    const images =
      variantImages.length > 0
        ? variantImages
        : product.images;

    return images.filter(
      (image, index, array) =>
        array.findIndex((item) => item.url === image.url) === index
    );
  }, [product, selectedVariant?.id]);

  useEffect(() => {
    setSelectedVariantId(
      product?.variants.find((variant) => variant.isActive)?.id ?? ""
    );

    setSelectedImage("");
    setQuantity(1);
    setAddedSuccess(false);
  }, [product]);

  useEffect(() => {
    setSelectedImage(gallery[0]?.url ?? "");
  }, [gallery]);

  useEffect(() => {
    if (!addedSuccess) return;

    const timer = window.setTimeout(() => {
      setAddedSuccess(false);
    }, 1500);

    return () => window.clearTimeout(timer);
  }, [addedSuccess]);

  if (!product) {
    return (
      <div className="flex min-h-[400px] items-center justify-center bg-white">
        <p className="text-sm text-gray-500">
          Product not found.
        </p>
      </div>
    );
  }

  const price = selectedVariant?.price ?? 0;
  const mrp = selectedVariant?.mrp ?? price;

  const discountPercent =
    mrp > price
      ? Math.round(((mrp - price) / mrp) * 100)
      : 0;

  const averageRating =
    product.reviews.length > 0
      ? product.reviews.reduce(
          (total, review) => total + review.rating,
          0
        ) / product.reviews.length
      : 0;

  const fabric = getAttribute(product.attributes, "fabric");
  const weave = getAttribute(product.attributes, "weave");
  const occasion = getAttribute(product.attributes, "occasion");

  const selectedColor = getAttribute(
    selectedVariant?.attributes,
    "color"
  );

  const selectedZariColor = getAttribute(
    selectedVariant?.attributes,
    "zariColor"
  );

  const handleAddToCart = () => {
    if (!selectedVariant) {
      alert("This product is currently unavailable.");
      return;
    }

    // Call the parent cart handler with the selected variant.
    // Quantity can be included in your cart payload if required.
    onAddToCart(product, selectedVariant);
    setAddedSuccess(true);
  };

  const handleWhatsApp = () => {
    if (!selectedVariant) return;

    const message = encodeURIComponent(
      [
        "Hello Sri Gowri Royal Textiles!",
        "",
        `I am interested in ${product.title}.`,
        `SKU: ${selectedVariant.sku}`,
        `Color: ${selectedColor || "Default"}`,
        `Price: ${formatPrice(price)}`,
        `Quantity: ${quantity}`,
        "",
        "Please share more product photos and delivery details.",
      ].join("\n")
    );

    window.open(
      `https://wa.me/919845012345?text=${message}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <main className="min-h-screen bg-white text-gray-900">
      <div className="mx-auto max-w-[1440px] px-4 py-5 sm:px-6 lg:px-10 lg:py-8">

        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-2 overflow-hidden text-xs text-gray-500">
          <Link href="/" className="shrink-0 hover:text-[#500206]">
            Home
          </Link>

          <ChevronRight className="h-3.5 w-3.5 shrink-0" />

          <span className="shrink-0">
            Sarees
          </span>

          <ChevronRight className="h-3.5 w-3.5 shrink-0" />

          <span className="truncate font-medium text-gray-800">
            {product.title}
          </span>
        </nav>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">

          {/* LEFT: Product Gallery */}
          <section className="min-w-0">
            <div className="grid grid-cols-[64px_minmax(0,1fr)] gap-3 sm:grid-cols-[80px_minmax(0,1fr)] sm:gap-4">

              {/* Thumbnails */}
              <div className="flex flex-col gap-3">
                {gallery.map((image) => (
                  <button
                    key={image.id}
                    type="button"
                    onClick={() => setSelectedImage(image.url)}
                    aria-label={`View ${image.altText || product.title}`}
                    aria-pressed={selectedImage === image.url}
                    className={`aspect-[3/4] overflow-hidden rounded-lg border-2 bg-[#faf6ea] transition ${
                      selectedImage === image.url
                        ? "border-[#500206]"
                        : "border-gray-200 hover:border-gray-400"
                    }`}
                  >
                    <img
                      src={image.url}
                      alt={image.altText || product.title}
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}

                {gallery.length === 0 && (
                  <div className="flex aspect-[3/4] items-center justify-center rounded-lg bg-gray-100 text-xs text-gray-400">
                    No image
                  </div>
                )}
              </div>

              {/* Main Image */}
              <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-[#faf6ea]">
                {selectedImage ? (
                  <img
                    src={selectedImage}
                    alt={product.title}
                    className="h-full w-full object-cover object-top"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <Package className="h-12 w-12 text-gray-300" />
                  </div>
                )}

                {discountPercent > 0 && (
                  <span className="absolute left-3 top-3 rounded bg-[#500206] px-3 py-1.5 text-xs font-bold text-white sm:left-4 sm:top-4">
                    {discountPercent}% OFF
                  </span>
                )}

                <button
                  type="button"
                  onClick={() => onToggleWishlist(product)}
                  aria-label={
                    isWishlisted
                      ? "Remove from wishlist"
                      : "Add to wishlist"
                  }
                  aria-pressed={isWishlisted}
                  className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md transition hover:scale-105 sm:right-4 sm:top-4"
                >
                  <Heart
                    className={`h-5 w-5 ${
                      isWishlisted
                        ? "fill-[#500206] text-[#500206]"
                        : "text-gray-700"
                    }`}
                  />
                </button>

                <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-md border border-[#d9ac48]/50 bg-white/95 px-2.5 py-1.5 text-[10px] font-semibold text-[#500206] sm:bottom-4 sm:left-4 sm:text-xs">
                  <ShieldCheck className="h-4 w-4" />
                  Authentic Craftsmanship
                </div>
              </div>
            </div>

            {/* Trust Features */}
            <div className="mt-6 grid grid-cols-3 gap-3 border-y border-gray-100 py-5">
              <div className="flex flex-col items-center gap-2 text-center">
                <ShieldCheck className="h-5 w-5 text-[#94570e]" />
                <span className="text-[10px] font-medium text-gray-600 sm:text-xs">
                  Quality Assured
                </span>
              </div>

              <div className="flex flex-col items-center gap-2 text-center">
                <Truck className="h-5 w-5 text-[#94570e]" />
                <span className="text-[10px] font-medium text-gray-600 sm:text-xs">
                  Delivery Available
                </span>
              </div>

              <div className="flex flex-col items-center gap-2 text-center">
                <RotateCcw className="h-5 w-5 text-[#94570e]" />
                <span className="text-[10px] font-medium text-gray-600 sm:text-xs">
                  Easy Support
                </span>
              </div>
            </div>
          </section>

          {/* RIGHT: Product Details */}
          <section className="flex min-w-0 flex-col">

            {/* Brand */}
            <div className="mb-3 flex items-center justify-between gap-3">
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#94570e]">
                Sri Gowri Royal Textiles
              </span>

              <span
                className={`rounded-full px-3 py-1 text-[10px] font-semibold ${
                  product.status === "ACTIVE"
                    ? "bg-green-50 text-green-700"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {product.status === "ACTIVE"
                  ? "Available"
                  : product.status}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-2xl font-bold leading-snug text-[#300302] sm:text-3xl">
              {product.title}
            </h1>

            {/* Rating */}
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <Star
                    key={rating}
                    className={`h-4 w-4 ${
                      rating <= Math.round(averageRating)
                        ? "fill-amber-400 text-amber-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>

              <span className="text-sm font-semibold text-gray-800">
                {product.reviews.length > 0
                  ? averageRating.toFixed(1)
                  : "No ratings"}
              </span>

              <span className="text-xs text-gray-500">
                ({product.reviews.length} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="mt-5 border-b border-gray-100 pb-5">
              <div className="flex flex-wrap items-baseline gap-3">
                <span className="text-3xl font-bold text-[#300302]">
                  {formatPrice(price)}
                </span>

                {mrp > price && (
                  <>
                    <span className="text-base text-gray-400 line-through">
                      {formatPrice(mrp)}
                    </span>

                    <span className="text-sm font-semibold text-green-700">
                      {discountPercent}% off
                    </span>
                  </>
                )}
              </div>

              {mrp > price && (
                <p className="mt-1 text-xs text-gray-500">
                  You save {formatPrice(mrp - price)}
                </p>
              )}

              <p className="mt-2 text-xs text-gray-500">
                Inclusive of applicable taxes
              </p>
            </div>

            {/* Color / Variant Selection */}
            {variants.length > 0 && (
              <div className="mt-5">
                <div className="flex flex-wrap items-center gap-2 text-sm">
                  <span className="font-semibold text-gray-900">
                    Select variant:
                  </span>

                  <span className="text-gray-600">
                    {selectedColor || selectedVariant?.sku}
                  </span>
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  {variants.map((variant) => {
                    const color = getAttribute(
                      variant.attributes,
                      "color"
                    );

                    const selected =
                      selectedVariant?.id === variant.id;

                    return (
                      <button
                        key={variant.id}
                        type="button"
                        onClick={() => {
                          setSelectedVariantId(variant.id);
                          setAddedSuccess(false);
                        }}
                        aria-pressed={selected}
                        className={`rounded-lg border px-4 py-2.5 text-left transition ${
                          selected
                            ? "border-[#500206] bg-[#faf6ea] ring-1 ring-[#500206]"
                            : "border-gray-200 hover:border-gray-400"
                        }`}
                      >
                        <span className="block text-sm font-semibold text-gray-800">
                          {color || variant.sku}
                        </span>

                        <span className="mt-1 block text-xs text-gray-500">
                          {formatPrice(variant.price)}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {selectedZariColor && (
                  <p className="mt-3 text-xs text-gray-600">
                    Zari color:{" "}
                    <span className="font-medium text-gray-900">
                      {selectedZariColor}
                    </span>
                  </p>
                )}
              </div>
            )}

            {/* Description */}
            <div className="mt-6">
              <h2 className="text-sm font-bold text-gray-900">
                Product Description
              </h2>

              <p className="mt-2 text-sm leading-7 text-gray-600">
                {product.description}
              </p>
            </div>

            {/* Product Specifications */}
            <div className="mt-6">
              <h2 className="text-sm font-bold text-gray-900">
                Product Details
              </h2>

              <div className="mt-3 divide-y divide-gray-100 rounded-xl border border-gray-200">
                {[
                  ["Product Code", selectedVariant?.sku],
                  ["Fabric", fabric],
                  ["Weave", weave],
                  ["Occasion", occasion],
                  ["Unit", selectedVariant?.unitOfMeasure],
                  ["Color", selectedColor],
                  ["Zari Color", selectedZariColor],
                ]
                  .filter(([, value]) => Boolean(value))
                  .map(([label, value]) => (
                    <div
                      key={label}
                      className="grid grid-cols-[120px_1fr] gap-3 px-4 py-3 text-xs sm:grid-cols-[150px_1fr] sm:text-sm"
                    >
                      <span className="text-gray-500">
                        {label}
                      </span>

                      <span className="font-medium text-gray-900">
                        {value}
                      </span>
                    </div>
                  ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mt-6">
              <label
                htmlFor="product-quantity"
                className="text-sm font-semibold text-gray-900"
              >
                Quantity
              </label>

              <div className="mt-2 flex w-fit items-center overflow-hidden rounded-lg border border-gray-200">
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  disabled={quantity <= 1}
                  onClick={() =>
                    setQuantity((current) =>
                      Math.max(1, current - 1)
                    )
                  }
                  className="flex h-10 w-10 items-center justify-center text-gray-600 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <Minus className="h-4 w-4" />
                </button>

                <span
                  id="product-quantity"
                  className="min-w-10 text-center text-sm font-semibold"
                >
                  {quantity}
                </span>

                <button
                  type="button"
                  aria-label="Increase quantity"
                  onClick={() =>
                    setQuantity((current) =>
                      Math.min(10, current + 1)
                    )
                  }
                  disabled={quantity >= 10}
                  className="flex h-10 w-10 items-center justify-center text-gray-600 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Total */}
            <div className="mt-4 flex items-center justify-between rounded-lg bg-[#faf6ea] px-4 py-3">
              <span className="text-sm text-gray-600">
                Total price
              </span>

              <span className="text-lg font-bold text-[#300302]">
                {formatPrice(price * quantity)}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <button
                type="button"
                disabled={!selectedVariant}
                onClick={handleAddToCart}
                className={`flex min-h-12 items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-bold transition active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 ${
                  addedSuccess
                    ? "bg-green-700 text-white"
                    : "bg-[#500206] text-white hover:bg-[#300302]"
                }`}
              >
                {addedSuccess ? (
                  <>
                    <Check className="h-5 w-5" />
                    Added to Cart
                  </>
                ) : (
                  <>
                    <ShoppingBag className="h-5 w-5" />
                    Add to Cart
                  </>
                )}
              </button>

              <button
                type="button"
                disabled={!selectedVariant}
                onClick={handleWhatsApp}
                className="flex min-h-12 items-center justify-center gap-2 rounded-lg border border-green-600 px-4 py-3 text-sm font-bold text-green-700 transition hover:bg-green-50 disabled:opacity-50"
              >
                <MessageCircle className="h-5 w-5" />
                Order on WhatsApp
              </button>
            </div>

            {/* Delivery Information */}
            <div className="mt-6 rounded-xl border border-gray-200 p-4">
              <div className="flex items-start gap-3">
                <Truck className="mt-0.5 h-5 w-5 shrink-0 text-[#94570e]" />

                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    Delivery Information
                  </p>

                  <p className="mt-1 text-xs leading-5 text-gray-500">
                    Delivery availability and estimated arrival dates
                    can be confirmed during checkout.
                  </p>
                </div>
              </div>
            </div>

            {/* Customer Reviews */}
            <section className="mt-8 border-t border-gray-200 pt-6">
              <h2 className="text-lg font-bold text-gray-900">
                Customer Reviews
              </h2>

              {product.reviews.length === 0 ? (
                <p className="mt-3 text-sm text-gray-500">
                  No reviews yet. Be the first to review this product.
                </p>
              ) : (
                <div className="mt-4 space-y-4">
                  {product.reviews.map((review) => (
                    <article
                      key={review.id}
                      className="border-b border-gray-100 pb-4 last:border-b-0"
                    >
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((rating) => (
                          <Star
                            key={rating}
                            className={`h-3.5 w-3.5 ${
                              rating <= review.rating
                                ? "fill-amber-400 text-amber-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}

                        <span className="ml-2 text-xs font-semibold text-gray-700">
                          {review.rating}/5
                        </span>
                      </div>

                      <p className="mt-2 text-sm leading-6 text-gray-600">
                        {review.comment || "No written review."}
                      </p>
                    </article>
                  ))}
                </div>
              )}
            </section>

          </section>
        </div>
      </div>
    </main>
  );
};

export default ProductDetails;