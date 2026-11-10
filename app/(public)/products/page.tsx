
import ProductCard from '@/components/product-card';
import { DUMMY_PRODUCTS } from '@/data/products';
import ProductSection from './_components/product-session';
import { CarouselItem } from '@/components/ui/carousel';

const ProductsPage = () => {
  const products = DUMMY_PRODUCTS.slice(0,5);

  return (
    <div className='container mx-auto w-full px-4 py-2'>
    <ProductSection
      title="Our Saree Collection"
      link="/products/dresses"
      productCount={products.length}
    >
      {products.map((product) => (
        <CarouselItem
          key={product.id}
          className="basis-full pl-2 sm:basis-1/2 lg:basis-1/4"
        >
          <ProductCard
            product={product}
            onQuickView={`/products/dresses/${product.id}`}
          />
        </CarouselItem>
      ))}
    </ProductSection>

    <ProductSection
      title="Our Snacks Collection"
      link="/products/dresses"
      productCount={products.length}
    >
      {products.map((product) => (
        <CarouselItem
          key={product.id}
          className="basis-full pl-2 sm:basis-1/2 lg:basis-1/4"
        >
          <ProductCard
            product={product}
            onQuickView={`/products/dresses/${product.id}`}
          />
        </CarouselItem>
      ))}
    </ProductSection>
    </div>
  );
};

export default ProductsPage;
