import ProductDetails from "./_component/product-details";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductDetailsPage({  params }: PageProps) {
  const { slug } = await params;
  return <ProductDetails slug={slug} />;
}