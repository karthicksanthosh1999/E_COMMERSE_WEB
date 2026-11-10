import { productReviews } from '@/types/productTypes';
import { Star } from 'lucide-react';
import Autoplay from "embla-carousel-autoplay"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

interface PageProps {
    productReviews: productReviews[]
}

const CustomerReviewsSlider = ({ productReviews } : PageProps) => {
  return (
      <section className="border-t border-[#eadfc8] bg-white w-full">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">

          <h2 className="font-serif text-2xl font-bold text-[#4b0000]">
            Customer Reviews
          </h2>

          <div className="mt-6 w-full">
            <Carousel
                opts={{
                    align: "start",
                    loop: true,
                }}
                plugins={[
                    Autoplay({ delay: 2000})
                ]}
                className="w-full"
                >
            <CarouselContent className='w-full'>
                {productReviews.map((review) => (
                <CarouselItem key={review.id} className="w-full basis-1/2 pl-1 lg:basis-1/3">
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
                </CarouselItem>
                ))}
            </CarouselContent>
            {
                productReviews.length >= 3 &&
                (
                    <div className='hidden :block'>
                        <CarouselPrevious />
                        <CarouselNext />
                    </div>
                )
            }
            </Carousel>
        </div>
        </div>
      </section>
  )
}

export default CustomerReviewsSlider;
