import ProductList from '@/components/shared/product/product-list';
import {
  getLatestProducts} from '@/lib/actions/product.actions';
import IconBoxes from '@/components/icon-boxes';
import ViewAllProductsButton from '@/components/view-all-products-button';
import DealCountdown from '@/components/deal-countdown';


const Homepage = async () => {
  const latestProducts = await getLatestProducts();

  return (
    <>
    {/* {featuredProducts.length > 0 && (
        <ProductCarousel data={featuredProducts} />
     )}  */}
      <ProductList data={latestProducts} title='Newest Arrivals' limit={4} />
      <ViewAllProductsButton />
      <DealCountdown />
<IconBoxes />
    </>
  );
};

export default Homepage;