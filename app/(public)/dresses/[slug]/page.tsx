import ProductDetails from "@/components/product-details";
import { Suspense } from "react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function ProductDetailsPage({ params }: PageProps) {
  return (
    <Suspense fallback={<div>Loading product...</div>}>
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