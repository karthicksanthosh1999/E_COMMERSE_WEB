
'use client';

import { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import Autoplay from 'embla-carousel-autoplay';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

interface PageProps {
  title: string;
  link: string;
  children: ReactNode;
  productCount: number;
}

const ProductSection = ({
  children,
  title,
  link,
  productCount,
}: PageProps) => {
  const router = useRouter();

  return (
    <section className="mx-auto container w-full px-4 py-2">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">
          {title}
        </h2>

        <Button
          type="button"
          variant="link"
          onClick={() => router.push(link)}
          className="cursor-pointer text-brand-brown underline hover:text-brand-tan"
        >
          View Collection
        </Button>
      </div>

      {/* Carousel */}
      <Carousel
        opts={{
          align: 'start',
          loop: productCount > 3,
        }}
        plugins={[
          Autoplay({
            delay: 3000,
            stopOnInteraction: true,
          }),
        ]}
        className=""
      >
        <CarouselContent className="-ml-2">
          {children}
        </CarouselContent>
        {productCount > 3 && (
          <>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </>
        )}

      </Carousel>
    </section>
  );
};

export default ProductSection;
