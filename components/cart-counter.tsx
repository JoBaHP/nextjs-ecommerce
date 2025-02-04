import { getMyCart } from '@/lib/actions/cart.actions';

const CartCounter = async () => {
  const cart = await getMyCart();
  const cartCount = cart?.items?.reduce((acc, item) => acc + item.qty, 0) || 0;

  return (
    <>
      {cartCount > 0 && (
        <span className=' -right-1 bg-red-500 text-white text-xs rounded-full px-2 py-1'>
          {cartCount}
        </span>
      )}
    </>
  );
};

export default CartCounter;