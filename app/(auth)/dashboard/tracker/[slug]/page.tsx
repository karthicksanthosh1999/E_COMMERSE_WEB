import Loading from '@/app/loading';
import ProductDetails from '@/components/product-details';
import { Suspense } from 'react'

interface PageProps {
    params: Promise<{slug: string}>;
}

export function TrackerPage ({ params } : PageProps){
  return (
    <Suspense fallback={<Loading />}>
      <TrackerDetailsWrapper params={params} />
    </Suspense>
  )
}

async function TrackerDetailsWrapper({ params }: PageProps){
    const { slug } = await params;
    return <ProductDetails slug={slug} />
} 