import HeroSection from '@/components/hero';
import WeaverHeritage from '@/components/CTA';
import ProductsPage from './products/page';

const Home = () => {
  return (
    <>
      <HeroSection />
      <ProductsPage />
      <WeaverHeritage />
    </>
  )
}

export default Home