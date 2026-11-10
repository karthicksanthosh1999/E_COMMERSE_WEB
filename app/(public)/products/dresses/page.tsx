import Breadcrumbs from "@/components/common-breadcrumbs";
import ProductCard from "@/components/product-card";
import { DUMMY_PRODUCTS } from "@/data/products";

export default function DressesPage() {
  return (
    <main className="mx-auto max-w-full px-4 py-8">
      {/* Breadcrumb */}
        <Breadcrumbs />
      <h1 className="mb-6 text-2xl font-bold">
        Our Saree Collection
      </h1>

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
  );
}