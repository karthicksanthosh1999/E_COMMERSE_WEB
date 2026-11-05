import Loading from "@/app/loading";
import ProductDetails from "@/components/product-details";
import { Suspense } from "react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function ProductDetailsPage({ params }: PageProps) {
  return (
    <Suspense fallback={<Loading />}>
      <ProductDetailsWrapper params={params} />
    </Suspense>
  );
}

async function ProductDetailsWrapper({
  params,
}: PageProps) {
  const { slug } = await params;

  return <ProductDetails slug={slug} />;
}