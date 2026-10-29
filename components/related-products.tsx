"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/types/productTypes";

interface RelatedProductsProps {
  products: Product[];
}

export default function RelatedProducts({
  products,
}: RelatedProductsProps) {
  return (
    <section className="border-t border-[#eadfc8] bg-[#fffaf2]">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="flex items-end justify-between">

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#b38716]">
              You may also like
            </p>

            <h2 className="mt-2 font-serif text-3xl font-bold text-[#4b0000]">
              Related Sarees
            </h2>
          </div>

          <Link
            href="/sarees"
            className="
              hidden
              text-sm
              font-semibold
              text-[#6a0000]
              underline-offset-4
              hover:underline
              sm:block
            "
          >
            View All
          </Link>
        </div>

        {/* Cards */}
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">

          {products.map((product) => {
            const discount =
              product.mrp > product.price
                ? Math.round(
                    ((product.mrp - product.price) /
                      product.mrp) *
                      100
                  )
                : 0;

            return (
              <article
                key={product.id}
                className="
                  group
                  overflow-hidden
                  rounded-xl
                  border
                  border-[#eadfc8]
                  bg-white
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:shadow-xl
                "
              >
                {/* Image */}
                <div className="relative aspect-[4/5] overflow-hidden bg-[#f8f3e8]">

                  <Link href={`/products/${product.slug}`}>
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="
                        object-cover
                        transition-transform
                        duration-500
                        group-hover:scale-105
                      "
                    />
                  </Link>

                  {/* Discount */}
                  {discount > 0 && (
                    <Badge
                      className="
                        absolute
                        left-3
                        top-3
                        bg-[#5a0000]
                        text-[#f8ca2d]
                        hover:bg-[#5a0000]
                      "
                    >
                      {discount}% OFF
                    </Badge>
                  )}

                  {/* Wishlist */}
                  <button
                    type="button"
                    aria-label={`Add ${product.title} to wishlist`}
                    className="
                      absolute
                      right-3
                      top-3
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-full
                      bg-white/90
                      text-[#5a0000]
                      shadow-sm
                      backdrop-blur
                      transition
                      hover:bg-white
                    "
                  >
                    <Heart size={17} />
                  </button>
                </div>

                {/* Content */}
                <div className="p-4">

                  <Link
                    href={`/products/${product.slug}`}
                    className="
                      line-clamp-2
                      text-sm
                      font-semibold
                      leading-5
                      text-[#4b0000]
                      hover:text-[#9a7111]
                    "
                  >
                    {product.title}
                  </Link>

                  {/* Rating */}
                  <div className="mt-2 flex items-center gap-1.5">

                    <div className="flex">
                      {[1, 2, 3, 4, 5].map(
                        (star) => (
                          <Star
                            key={star}
                            size={12}
                            className={
                              star <=
                              Math.round(product.rating)
                                ? "fill-[#e9b820] text-[#e9b820]"
                                : "text-[#d7c8aa]"
                            }
                          />
                        )
                      )}
                    </div>

                    <span className="text-[10px] text-muted-foreground">
                      ({product.reviews})
                    </span>
                  </div>

                  {/* Price */}
                  <div className="mt-3 flex items-center gap-2">

                    <span className="text-base font-bold text-[#5a0000]">
                      ₹
                      {product.price.toLocaleString(
                        "en-IN"
                      )}
                    </span>

                    {product.mrp > product.price && (
                      <span className="text-xs text-muted-foreground line-through">
                        ₹
                        {product.mrp.toLocaleString(
                          "en-IN"
                        )}
                      </span>
                    )}

                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Mobile View All */}
        <Link
          href="/sarees"
          className="
            mt-7
            block
            text-center
            text-sm
            font-semibold
            text-[#6a0000]
            underline-offset-4
            hover:underline
            sm:hidden
          "
        >
          View All Sarees
        </Link>
      </div>
    </section>
  );
}