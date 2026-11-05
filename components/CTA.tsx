"use client";

import Image from "next/image";
import Link from "next/link";

import {
  Award,
  ArrowRight,
  QrCode,
  ShieldCheck,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
} from "@/components/ui/card";

const statistics = [
  {
    value: "3,800+",
    label: "ARTISAN WEAVER GUILDS",
  },
  {
    value: "100%",
    label: "LOOM & SILK TRACEABILITY",
  },
  {
    value: "78%",
    label: "DIRECT ARTISAN SHARE",
  },
];

export default function WeaverHeritage() {
  return (
    <section className="bg-[#faf7ed] px-4 py-12 sm:px-6 lg:py-16">
      <div className="mx-auto max-w-[1220px]">

        <div className="
          grid
          overflow-hidden
          rounded-[24px]
          border
          border-[#b88b20]
          bg-gradient-to-br
          from-[#480000]
          via-[#570000]
          to-[#641b0a]
          p-6
          shadow-[0_20px_50px_rgba(50,0,0,0.12)]
          sm:p-8
          lg:grid-cols-[1.55fr_1fr]
          lg:gap-10
          lg:p-[52px]
        ">

          {/* LEFT CONTENT */}
          <div className="flex flex-col justify-center">

            {/* Badge */}
            <Badge className="
              mb-6
              w-fit
              gap-2
              rounded-full
              border
              border-[#d6a719]
              bg-transparent
              px-4
              py-2
              text-[10px]
              font-bold
              tracking-[0.16em]
              text-[#f5c52a]
              hover:bg-transparent
            ">
              <Award size={13} />
              DIRECT FAIR TRADE WEAVER ALLIANCE
            </Badge>

            {/* Heading */}
            <h2 className="
              font-serif
              text-[34px]
              font-bold
              leading-[1.15]
              tracking-tight
              text-[#fffaf0]
              sm:text-[42px]
              lg:text-[46px]
            ">
              Bridging Generational Looms

              <span className="
                mt-1
                block
                font-serif
                text-[34px]
                italic
                text-[#ffc928]
                sm:text-[42px]
                lg:text-[46px]
              ">
                & Royal Handloom Heritage.
              </span>
            </h2>

            {/* Description */}
            <p className="
              mt-5
              max-w-[600px]
              text-[14px]
              leading-[24px]
              text-[#f4dfc2]
              sm:text-[15px]
            ">
              Sri Gowri Royal Textiles bypasses every conventional
              middleman markup. When you order an authentic Banarasi
              or Kanjeevaram saree, 78% of the proceeds flow directly
              back to generational weaver families in Varanasi,
              Kanchipuram, and Patan.
            </p>

            {/* Divider */}
            <div className="my-5 h-px w-full bg-[#986020]/50" />

            {/* Statistics */}
            <div className="grid grid-cols-3 gap-3">

              {statistics.map((item) => (
                <div key={item.label}>
                  <h3 className="
                    font-serif
                    text-[29px]
                    font-bold
                    leading-tight
                    text-[#ffc928]
                    sm:text-[34px]
                  ">
                    {item.value}
                  </h3>

                  <p className="
                    mt-1
                    max-w-[150px]
                    text-[9px]
                    font-bold
                    leading-4
                    tracking-wide
                    text-[#e9b52c]
                    sm:text-[10px]
                  ">
                    {item.label}
                  </p>
                </div>
              ))}

            </div>

            {/* CTA Buttons */}
            <div className="
              mt-7
              flex
              flex-col
              items-start
              gap-4
              sm:flex-row
              sm:items-center
            ">

              <Button
                className="
                  h-11
                  rounded-full
                  bg-[#ffc323]
                  px-6
                  text-[13px]
                  font-bold
                  text-[#390000]
                  shadow-md
                  transition-all
                  hover:-translate-y-0.5
                  hover:bg-[#ffda53]
                "
              >
                <Link href="/loom-passport" className="flex items-center gap-1">
                  <QrCode size={16} />
                  Verify QR Loom Passport
                </Link>
              </Button>

              <Link
                href="/contact?type=bulk-orders"
                className="
                  group
                  inline-flex
                  items-center
                  gap-1
                  text-[13px]
                  font-bold
                  text-[#fff1d0]
                  underline
                  underline-offset-4
                  transition-colors
                  hover:text-[#ffc928]
                "
              >
                Inquire About Bulk & Trousseau Orders

                <ArrowRight
                  size={15}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>

            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="
            relative
            mt-8
            min-h-[350px]
            overflow-hidden
            rounded-[22px]
            border
            border-[#c79a27]
            sm:min-h-[430px]
            lg:mt-0
            lg:min-h-[435px]
          ">

            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDe2e541ZHwrtZS-76w2NOfvg-B3BuSUi3dO_CINfXHOEbemrX35kfz8XG6uGXh37Q2ODMq8T00-qe7GnQlSTnsO-i26w6JDJhRgXWfJNCrRNbPl0nIcDSSTz_rjMNQX_23SHvpNZsvJzFQQD-lKe9QcT1QwIQeSVmywdikWaCkz0ywnxceXCka9He_E0ma3cS4uZG8RtyVBnPdvbKB9YNIFZ-rUsoDbYdw78-PSitB"
              alt="Traditional artisan weaving silk fabric on a handloom"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover transition-transform duration-700 hover:scale-105
              "
            />

            {/* Image gradient */}
            <div className="
              absolute
              inset-0
              bg-linear-to-t
              from-black/40
              via-transparent
              to-transparent
            " />

            {/* Floating QR Card */}
            <Card className="
              absolute
              bottom-4
              left-4
              z-10
              w-[260px]
              max-w-[calc(100%-32px)]
              rounded-2xl
              border-0
              bg-[#fffdf8]
              shadow-xl
              sm:bottom-5
              sm:left-5
            ">
              <CardContent className="flex items-center gap-3 p-4">

                {/* Icon */}
                <div className="
                  flex
                  h-[40px]
                  w-[40px]
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  bg-[#580000]
                  text-[#ffc928]
                  shadow-sm
                ">
                  <ShieldCheck size={20} />
                </div>

                {/* Text */}
                <div>
                  <h3 className="
                    font-serif
                    text-[12px]
                    font-bold
                    text-[#4b0000]
                  ">
                    QR Traceable Packaging
                  </h3>

                  <p className="
                    mt-1
                    text-[9px]
                    leading-5
                    text-[#a16c38]
                  ">
                    Scan to see the weaver name & village loom plot
                  </p>
                </div>

              </CardContent>
            </Card>

          </div>

        </div>
      </div>
    </section>
  );
}