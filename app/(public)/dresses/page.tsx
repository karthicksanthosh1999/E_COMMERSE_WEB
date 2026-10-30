import ProductCard from "@/components/product-card";
import { DUMMY_PRODUCTS } from "@/data/products";

export default function DressesPage() {
  return (
    <main className="mx-auto max-w-full px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold">
        Our Saree Collection
      </h1>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {DUMMY_PRODUCTS.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onQuickView={product.id}
          />
        ))}
      </div>

    </main>
  );
}