
import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  Award,
  ShieldCheck,
  MessageCircle,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";

const features = [
  {
    icon: Award,
    title: "Silk Mark Certified",
    description: "100% Pure Mulberry Silk",
  },
  {
    icon: ShieldCheck,
    title: "Direct From Looms",
    description: "Fair Pay to Master Weavers",
  },
  {
    icon: MessageCircle,
    title: "Instant WhatsApp Care",
    description: "Real-Time Video Inspection",
  },
];

export default function HeroSection() {
  const whatsappNumber = "919876543210";

  return (
    <section className="relative isolate overflow-hidden bg-brand-burgundy text-brand-cream">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_70%_40%,rgba(148,87,14,0.22),transparent_45%)]" />

      <div className="pointer-events-none absolute inset-0 -z-10 opacity-20 [background-image:radial-gradient(#d9ac48_1px,transparent_1px)] [background-size:30px_30px]" />

      <div className="mx-auto grid min-h-162.5 max-w-7xl items-center gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 lg:px-12 lg:py-20">

        {/* Left content */}
        <div className="flex flex-col justify-center">
          <div className="mb-6 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-brand-gold" />
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-brand-gold sm:text-sm">
              A Touch of Tradition, A Feel of Royalty
            </p>
          </div>

          <h1 className="max-w-2xl font-serif text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl">
            Find the saree
            <span className="mt-1 block italic text-brand-cream">
              that feels like you.
            </span>
          </h1>

          <p className="mt-7 max-w-xl text-base leading-8 text-brand-cream/90 sm:text-lg">
            Explore elegant sarees for celebrations, everyday moments and
            special occasions. Browse the collection and order directly
            through WhatsApp.
          </p>

          {/* CTA buttons */}
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Button
              size="lg"
              className="h-14 rounded-full bg-brand-gold px-8 text-base font-bold text-brand-burgundy shadow-lg shadow-black/10 hover:bg-brand-gold-dark"
            >
              <Link href="/products/dresses" className="flex items-center">
                Explore Collection
                <ArrowDown className="ml-2 size-5" />
              </Link>
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="h-14 rounded-full border-brand-gold/80 bg-transparent px-7 text-base font-semibold text-brand-cream hover:bg-brand-gold/10 hover:text-brand-gold"
              disabled
              title="Coming Soon"
            >
              <Link href={`https://wa.me/${whatsappNumber}`} className="flex items-center">
                <Sparkles className="mr-2 size-5 text-brand-gold" />
                Ask AI
              </Link>
            </Button>
          </div>

          {/* Divider */}
          <div className="my-7 h-px w-full max-w-2xl bg-brand-gold/20" />

          {/* Features */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <div key={index} className="flex items-center gap-3">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-full border border-brand-gold/40 bg-brand-gold/10">
                    <Icon className="size-5 text-brand-gold" />
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-white">
                      {feature.title}
                    </h3>
                    <p className="mt-1 text-xs text-brand-tan">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right image */}
        <div className="relative mx-auto w-full max-w-115.5">
          {/* Decorative borders */}
          <div className="absolute -inset-3 rounded-t-[230px] rounded-b-[35px] border border-brand-gold/40" />
          <div className="absolute -inset-6 rounded-t-[250px] rounded-b-[45px] border border-brand-gold/20" />

          <div className="relative h-120 overflow-hidden rounded-t-[220px] rounded-b-[30px] border border-brand-gold/80 bg-brand-brown sm:h-154 lg:h-157.5">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBUyzrqL7VUOO3uK9VZcPad4kMwqWq8ObK-ccob8aO71qYi_aP82KQ_aXiUah9p77CPbohaguRRb7meAi6T-ZP2VqpMMlndvqc09wevbrv5XCRl_xbOJ1MdxuIk2nwm3TSA5GIwEYNZwJCaO0vnrtVtjooHeJKw_J6t8yUWBw00f7T0lNCt0mOnwA0DJIVPxif58J0hLABMxfst5ZbVIeahjSuHuev0yzewKI3BeC1R"
              alt="Traditional green Kanchipuram silk saree with gold zari border"
              fill
              priority
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 70vw, 470px"
              className="object-cover object-center"
            />

            {/* Image overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-brand-burgundy/70 via-transparent to-transparent" />

            {/* Product information */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3 rounded-2xl border border-brand-gold/50 bg-brand-burgundy/95 p-3 shadow-xl backdrop-blur-md sm:bottom-5 sm:left-5 sm:right-5 sm:p-4">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-gold text-sm font-bold text-brand-burgundy">
                  GI
                </div>

                <div className="min-w-0">
                  <h3 className="truncate text-xs font-bold uppercase text-brand-cream sm:text-sm">
                    Kanchipuram Pattu
                  </h3>
                  <p className="mt-1 text-[10px] text-brand-gold sm:text-xs">
                    Pure Zari Traditional Weave
                  </p>
                </div>
              </div>

              <span className="shrink-0 rounded-full bg-brand-cream px-3 py-1 text-[10px] font-bold text-brand-burgundy sm:text-xs">
                Heirloom Grade
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating WhatsApp button */}
      <Link
        href={`https://wa.me/${whatsappNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="fixed bottom-6 right-6 z-50 flex size-14 items-center justify-center rounded-full bg-[#00c96b] text-white shadow-xl transition-transform hover:scale-110"
      >
        <MessageCircle className="size-7" />
      </Link>
    </section>
  );
}
