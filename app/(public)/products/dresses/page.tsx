import ProductCard from "@/components/product-card";
import { DUMMY_PRODUCTS } from "@/data/products";
import SareeCollectionFilter from "./_components/saree-filter";

export default function DressesPage() {
  return (
    <>
    <SareeCollectionFilter />
    <main className="mx-auto max-w-full px-4 py-8">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {DUMMY_PRODUCTS.map((product) => (
          <ProductCard
          key={product.id}
          product={product}
          onQuickView={`/products/dresses/${product.id}`}
          />
        ))}
      </div>
    </main>
    </>
  );
}